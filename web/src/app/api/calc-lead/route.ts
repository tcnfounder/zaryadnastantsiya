import { NextResponse } from "next/server";
import { saveLeadContact, sendMail } from "@/lib/mail";

const NOINDEX = { "X-Robots-Tag": "noindex, nofollow" };

/** Bots that GET this path should not pollute GA with 405/404 HTML. */
export async function GET() {
  return new NextResponse(null, { status: 204, headers: NOINDEX });
}

type CalcLeadBody = {
  name?: string;
  phone?: string;
  note?: string;
  city?: string;
  housing?: string;
  solution?: string;
  title?: string;
  estimatedWatts?: number;
  estimatedWh?: number;
  needsInstaller?: boolean;
};

async function notifyWebhook(payload: Record<string, unknown>) {
  const url = process.env.CLAIM_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("[calc-lead-webhook-error]", error);
  }
}

function leadEmailText(payload: Record<string, unknown>) {
  return [
    "Нова заявка з калькулятора ZaryadnaStantsiya",
    "",
    `Ім'я: ${payload.name}`,
    `Телефон: ${payload.phone}`,
    `Місто: ${payload.city}`,
    `Житло: ${payload.housing}`,
    `Рішення: ${payload.title} (${payload.solution})`,
    `Орієнтир: ${payload.estimatedWatts} W / ${payload.estimatedWh} Wh`,
    `Монтаж: ${payload.needsInstaller ? "так" : "ні"}`,
    `Нотатка: ${payload.note || "—"}`,
  ].join("\n");
}

export async function POST(request: Request) {
  let body: CalcLeadBody;
  try {
    body = (await request.json()) as CalcLeadBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400, headers: NOINDEX },
    );
  }

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  if (name.length < 2 || phone.length < 7) {
    return NextResponse.json(
      { ok: false, error: "invalid_contact" },
      { status: 400, headers: NOINDEX },
    );
  }

  const lead = {
    type: "calc_lead",
    name,
    phone,
    note: String(body.note ?? "").trim().slice(0, 500),
    city: String(body.city ?? "").trim(),
    housing: String(body.housing ?? ""),
    solution: String(body.solution ?? ""),
    title: String(body.title ?? ""),
    estimatedWatts: Number(body.estimatedWatts) || 0,
    estimatedWh: Number(body.estimatedWh) || 0,
    needsInstaller: Boolean(body.needsInstaller),
    source: "zaryadnastantsiya.com.ua/kalkulyator",
    createdAt: new Date().toISOString(),
  };

  const to = process.env.CLAIM_NOTIFY_TO?.trim();
  const [, mail] = await Promise.all([
    notifyWebhook(lead),
    to
      ? sendMail({
          from: process.env.CLAIM_NOTIFY_FROM?.trim() || "onboarding@resend.dev",
          to,
          subject: `Calc lead: ${lead.city} · ${lead.solution}`,
          text: leadEmailText(lead),
          tag: "calc-lead",
        })
      : Promise.resolve({ ok: false as const, reason: "notify_to_not_configured" }),
    saveLeadContact({ kind: "calc", name: lead.name, phone: lead.phone }),
  ]);
  console.info("[calc-lead]", lead);
  if (!mail.ok) console.error("[calc-lead-UNDELIVERED]", mail.reason, lead.createdAt);

  return NextResponse.json({ ok: true }, { headers: NOINDEX });
}
