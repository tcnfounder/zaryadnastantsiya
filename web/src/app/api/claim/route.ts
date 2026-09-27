import { NextResponse } from "next/server";
import { claimPackages, type ClaimPackageId } from "@/data/packages";

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
  const webhook = process.env.CLAIM_WEBHOOK_URL;
  if (!webhook) return { ok: false as const, reason: "webhook_not_configured" };

  const response = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Webhook failed with ${response.status}`);
  }

  return { ok: true as const };
}

async function notifyResend(payload: {
  company: string;
  email: string;
  city: string;
  packageId: ClaimPackageId;
  phone: string;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CLAIM_NOTIFY_TO;
  const from = process.env.CLAIM_NOTIFY_FROM || "ZaryadnaStantsiya <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return { ok: false as const, reason: "resend_not_configured" };
  }

  const pkg = claimPackages.find((item) => item.id === payload.packageId);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
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
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend failed: ${response.status} ${detail}`);
  }

  return { ok: true as const };
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

  try {
    const [webhookResult, resendResult] = await Promise.all([
      notifyWebhook(lead),
      notifyResend({ company, email, city, packageId, phone, message }),
    ]);

    console.info("[claim-lead]", JSON.stringify({
      ...lead,
      delivered: {
        webhook: webhookResult.ok,
        resend: resendResult.ok,
      },
    }));

    const delivered = webhookResult.ok || resendResult.ok;

    return NextResponse.json({
      ok: true,
      delivered,
      // Still accept the lead when delivery channels are not configured yet —
      // Railway logs keep a copy for manual follow-up.
      mode: delivered ? "notified" : "logged",
    });
  } catch (error) {
    console.error("[claim-lead-error]", error);
    return NextResponse.json(
      { error: "Не вдалося надіслати заявку. Спробуйте ще раз за хвилину." },
      { status: 502 },
    );
  }
}
