#!/usr/bin/env node
/**
 * Post-deploy IndexNow submit (Bing + engines).
 *
 * Usage:
 *   node scripts/submit-indexnow.mjs
 *   node scripts/submit-indexnow.mjs --urls https://zaryadnastantsiya.com.ua/gid/deye-6-kvt
 *
 * Env:
 *   SITE_URL=https://zaryadnastantsiya.com.ua  (default)
 *   INDEXNOW_KEY=...                            (default: committed key)
 */

const SITE_URL = (process.env.SITE_URL || "https://zaryadnastantsiya.com.ua").replace(
  /\/$/,
  "",
);
const KEY =
  process.env.INDEXNOW_KEY || "3b8c52078c06493597e733bef4820a74";
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;
const HOST = new URL(SITE_URL).hostname;

async function main() {
  const args = process.argv.slice(2);
  const urlFlag = args.indexOf("--urls");
  let urlList = [];

  if (urlFlag >= 0) {
    urlList = args.slice(urlFlag + 1).filter((a) => a.startsWith("http"));
  }

  if (urlList.length === 0) {
    // Prefer live sitemap after deploy
    const smRes = await fetch(`${SITE_URL}/sitemap.xml`);
    if (!smRes.ok) {
      throw new Error(`sitemap fetch failed: ${smRes.status}`);
    }
    const xml = await smRes.text();
    urlList = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  }

  // Verify key file is live before notifying engines
  const keyRes = await fetch(KEY_LOCATION);
  const keyBody = (await keyRes.text()).trim();
  if (!keyRes.ok || keyBody !== KEY) {
    throw new Error(
      `Key file not live at ${KEY_LOCATION} (status ${keyRes.status}, body=${JSON.stringify(keyBody)})`,
    );
  }

  console.log(`IndexNow: submitting ${urlList.length} URLs for ${HOST}`);
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    }),
  });
  const text = await res.text();
  console.log(`IndexNow response: ${res.status} ${res.statusText}`);
  if (text) console.log(text);
  // 200 / 202 = accepted
  if (![200, 202].includes(res.status)) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
