// Regression test for the inline GA4 bootstrap (src/lib/ga-init-script.ts).
// Run: node --experimental-strip-types scripts/test-ga-init.mjs
// Renders the exact string Next injects, proves it parses, and simulates a
// browser to check page_view config, internal tagging and affiliate_click.
import assert from "node:assert/strict";
import { buildGaInitScript } from "../src/lib/ga-init-script.ts";

const ID = "G-TEST123";
const code = buildGaInitScript(ID);

// 1) Syntax: this is what broke production on 2026-10-25.
try {
  new Function(code);
} catch (e) {
  console.error("GA init script does not parse:", e.message);
  process.exit(1);
}

function run({ pathname = "/tovary/x", search = "", storage = {} } = {}) {
  const store = { ...storage };
  const sandbox = {
    dataLayer: undefined,
    localStorage: {
      getItem: (k) => (k in store ? store[k] : null),
      setItem: (k, v) => (store[k] = String(v)),
      removeItem: (k) => delete store[k],
    },
    location: { pathname, search },
    listeners: [],
  };
  sandbox.window = sandbox;
  sandbox.document = { addEventListener: (_t, fn) => sandbox.listeners.push(fn) };
  new Function("window", "document", "localStorage", "location",
    `with (window) { ${code} }`)(sandbox, sandbox.document, sandbox.localStorage, sandbox.location);
  const calls = () => sandbox.dataLayer.map((a) => Array.from(a));
  const click = (href, text = " Купити ") =>
    sandbox.listeners.forEach((fn) =>
      fn({ target: { closest: () => (href ? { getAttribute: () => href, textContent: text } : null) } }),
    );
  return { sandbox, calls, click, store };
}

// 2) Normal page: gtag exposed, one config with page_view, no internal flag.
{
  const { sandbox, calls } = run();
  assert.equal(typeof sandbox.gtag, "function", "window.gtag must be defined");
  const cfg = calls().filter((c) => c[0] === "config");
  assert.equal(cfg.length, 1, "exactly one config call");
  assert.equal(cfg[0][1], ID);
  assert.equal(cfg[0][2].send_page_view, true);
  assert.equal(cfg[0][2].traffic_type, undefined);
}

// 3) /go/ and /api/ pages must not send page_view.
for (const p of ["/go/ecoflow-delta-2", "/api/claim"]) {
  const { calls } = run({ pathname: p });
  assert.equal(calls().filter((c) => c[0] === "config").length, 0, `no config on ${p}`);
}

// 4) ?ga_internal=1 tags traffic and persists the flag.
{
  const { calls, store } = run({ search: "?ga_internal=1" });
  assert.equal(calls().find((c) => c[0] === "config")[2].traffic_type, "internal");
  assert.equal(store.zaryadna_ga_internal, "1");
}

// 5) affiliate_click extracts the product id from every link shape we use.
{
  const { calls, click } = run();
  click("/go/ecoflow-delta-2");
  click("/go/bluetti-ac180?utm_source=x");
  click("https://zaryadnastantsiya.com.ua/go/jackery-1000#top");
  click(null); // click outside a /go/ link
  const ev = calls().filter((c) => c[0] === "event" && c[1] === "affiliate_click");
  assert.deepEqual(ev.map((e) => e[2].product_id), ["ecoflow-delta-2", "bluetti-ac180", "jackery-1000"]);
  assert.equal(ev[0][2].link_text, "Купити");
  assert.equal(ev[0][2].page_path, "/tovary/x");
}

console.log("GA init script: OK (parse, config, /go skip, internal flag, affiliate_click)");
