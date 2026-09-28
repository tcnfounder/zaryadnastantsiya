import { NextResponse } from "next/server";
import { claimPackages, type ClaimPackageId } from "@/data/packages";
import { site } from "@/data/site";

export const runtime = "nodejs";

type ClaimBody = {
  company?: string;
  email?: string;
  city?: string;
  packageId?: string;
  phone?: string;
  message?: string;
  website?: string;
};

const PACKAGE_IDS = new Set(claimPackages.map((item) => item.id));

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(value: unknown, max = 200) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

async function notifyWebhook(payload: Record<string, unknown>) {
  const webhook = process.env.CLAIM_WEBHOOK_URL?.trim();
  if (!webhook) return { ok: false as const, reason: "webhook_not_configured" };

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("[claim-webhook-error]", response.status, detail);
      return { ok: false as const, reason: `webhook_${response.status}` };
    }

    return { ok: true as const };
  } catch (error) {
    console.error("[claim-webhook-error]", error);
    return { ok: false as const, reason: "webhook_exception" };
  }
}

async function sendResendEmail(input: {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
}) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { ok: false as const, reason: "resend_not_configured" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: input.from,
        to: [input.to],
        reply_to: input.replyTo,
        subject: input.subject,
        text: input.text,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("[claim-resend-error]", response.status, detail);
      return { ok: false as const, reason: `resend_${response.status}` };
    }

    return { ok: true as const };
  } catch (error) {
    console.error("[claim-resend-error]", error);
    return { ok: false as const, reason: "resend_exception" };
  }
}

async function notifyOwner(payload: {
  company: string;
  email: string;
  city: string;
  packageId: ClaimPackageId;
  phone: string;
  message: string;
}) {
  const to = process.env.CLAIM_NOTIFY_TO?.trim();
  // Prefer a plain address in Railway. Display-name + <brackets> often breaks env vars.
  const from = process.env.CLAIM_NOTIFY_FROM?.trim() || "onboarding@resend.dev";

  if (!to) {
    return { ok: false as const, reason: "resend_not_configured" };
  }

  const pkg = claimPackages.find((item) => item.id === payload.packageId);

  return sendResendEmail({
    from,
    to,
    replyTo: payload.email,
    subject: `Claim: ${payload.company} · ${pkg?.name ?? payload.packageId}`,
    text: [
      `Компанія: ${payload.company}`,
      `Email: ${payload.email}`,
      `Місто: ${payload.city}`,
      `Телефон: ${payload.phone || "—"}`,
      `Пакет: ${pkg?.name ?? payload.packageId} (${pkg ? pkg.priceUah + " ₴/міс" : "—"})`,
      `Повідомлення: ${payload.message || "—"}`,
      `Час: ${new Date().toISOString()}`,
    ].join("\n"),
  });
}

/** Auto-reply to installer so the money loop does not depend on manual inbox triage. */
async function notifyApplicant(payload: {
  company: string;
  email: string;
  city: string;
  packageId: ClaimPackageId;
}) {
  // Prefer project-domain From for installer-facing mail (never another brand).
  const from =
    process.env.CLAIM_APPLICANT_FROM?.trim() ||
    (process.env.CLAIM_NOTIFY_FROM?.includes("zaryadnastantsiya.com.ua")
      ? process.env.CLAIM_NOTIFY_FROM.trim()
      : site.salesEmail);
  const payUrl = process.env.CLAIM_PAY_URL?.trim();
  const telegram = process.env.CLAIM_TELEGRAM_URL?.trim();
  const pkg = claimPackages.find((item) => item.id === payload.packageId);
  const price = pkg
    ? new Intl.NumberFormat("uk-UA").format(pkg.priceUah) + " ₴/міс"
    : "—";

  return sendResendEmail({
    from,
    to: payload.email,
    replyTo: site.salesEmail,
    subject: `${site.name}: заявка на ${pkg?.name ?? "пакет"} прийнята`,
    text: [
      `Добрий день, ${payload.company}!`,
      "",
      `Заявку на пакет ${pkg?.name ?? payload.packageId} (${price}) для міста ${payload.city} прийнято.`,
      "",
      "Наступні кроки:",
      "1) Підтвердіть корпоративну пошту у відповіді на цей лист (Reply).",
      "2) Отримаєте рахунок / реквізити на обраний пакет.",
      "3) Після оплати профіль з’явиться у добірках протягом 1–2 робочих днів.",
      "",
      payUrl ? `Швидка оплата: ${payUrl}` : null,
      telegram ? `Telegram: ${telegram}` : null,
      `Питання: ${site.salesEmail}`,
      `Сайт: ${site.url}/claim?package=${payload.packageId}`,
      "",
      "З повагою,",
      site.name,
    ]
      .filter(Boolean)
      .join("\n"),
  });
}

export async function POST(request: Request) {
  let body: ClaimBody;

  try {
    body = (await request.json()) as ClaimBody;
  } catch {
    return NextResponse.json({ error: "Невірний JSON." }, { status: 400 });
  }

  // Honeypot for bots
  if (sanitize(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const company = sanitize(body.company, 120);
  const email = sanitize(body.email, 160).toLowerCase();
  const city = sanitize(body.city, 80);
  const phone = sanitize(body.phone, 40);
  const message = sanitize(body.message, 1000);
  const packageId = sanitize(body.packageId, 40) as ClaimPackageId;

  if (!company || !email || !city) {
    return NextResponse.json(
      { error: "Заповніть компанію, email і місто." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Некоректний email." }, { status: 400 });
  }

  if (!PACKAGE_IDS.has(packageId)) {
    return NextResponse.json({ error: "Оберіть пакет розміщення." }, { status: 400 });
  }

  const lead = {
    type: "claim_lead",
    company,
    email,
    city,
    phone,
    message,
    packageId,
    createdAt: new Date().toISOString(),
    source: "zaryadnastantsiya.com.ua/claim",
  };

  const [webhookResult, ownerResult, applicantResult] = await Promise.all([
    notifyWebhook(lead),
    notifyOwner({ company, email, city, packageId, phone, message }),
    notifyApplicant({ company, email, city, packageId }),
  ]);

  console.info(
    "[claim-lead]",
    JSON.stringify({
      ...lead,
      delivered: {
        webhook: webhookResult.ok,
        owner: ownerResult.ok,
        applicant: applicantResult.ok,
        webhookReason: "reason" in webhookResult ? webhookResult.reason : null,
        ownerReason: "reason" in ownerResult ? ownerResult.reason : null,
        applicantReason:
          "reason" in applicantResult ? applicantResult.reason : null,
      },
    }),
  );

  const delivered =
    webhookResult.ok || ownerResult.ok || applicantResult.ok;

  // Always accept a valid lead. Delivery failures stay in Railway logs so the
  // form never dies with a Cloudflare 502 HTML page.
  return NextResponse.json({
    ok: true,
    delivered,
    mode: delivered ? "notified" : "logged",
  });
}
