import { NextResponse } from "next/server";

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

async function notifyResend(payload: Record<string, unknown>) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CLAIM_NOTIFY_TO;
  const from = process.env.CLAIM_NOTIFY_FROM;
  if (!apiKey || !to || !from) return;

  const text = [
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

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `Calc lead: ${payload.city} · ${payload.solution}`,
        text,
      }),
    });
    if (!response.ok) {
      const detail = await response.text();
      console.error("[calc-lead-resend-error]", response.status, detail);
    }
  } catch (error) {
    console.error("[calc-lead-resend-error]", error);
  }
}

export async function POST(request: Request) {
  let body: CalcLeadBody;
  try {
    body = (await request.json()) as CalcLeadBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  if (name.length < 2 || phone.length < 7) {
    return NextResponse.json({ ok: false, error: "invalid_contact" }, { status: 400 });
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

  await Promise.all([notifyWebhook(lead), notifyResend(lead)]);
  console.info("[calc-lead]", lead);

  return NextResponse.json({ ok: true });
}
