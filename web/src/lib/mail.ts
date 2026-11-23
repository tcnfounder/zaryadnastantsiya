/**
 * Lead / claim email delivery. Brevo first (BREVO_API_KEY), Resend as fallback
 * (RESEND_API_KEY). Without either, leads only reach the server log — which is
 * easy to miss, so callers log an explicit "UNDELIVERED" line in that case and
 * /api/health reports which channels are configured (booleans only, no values).
 *
 * Env:
 *   BREVO_API_KEY          Brevo API v3 key
 *   BREVO_SENDER_EMAIL     verified Brevo sender (falls back to the caller's `from`)
 *   BREVO_LEADS_LIST_ID    optional: also store each lead as a Brevo contact in this list
 *   RESEND_API_KEY         Resend key (fallback)
 *   CLAIM_NOTIFY_TO        inbox that receives leads
 */

const env = (key: string) => process.env[key]?.trim() || "";

export function mailChannels() {
  return {
    brevo: Boolean(env("BREVO_API_KEY")),
    brevoContacts: Boolean(env("BREVO_API_KEY") && env("BREVO_LEADS_LIST_ID")),
    resend: Boolean(env("RESEND_API_KEY")),
    webhook: Boolean(env("CLAIM_WEBHOOK_URL")),
    notifyTo: Boolean(env("CLAIM_NOTIFY_TO")),
  };
}

export type MailInput = {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
  /** Short tag for Brevo's transactional log, e.g. "calc-lead". */
  tag: string;
};

export type MailResult =
  | { ok: true; via: "brevo" | "resend" }
  | { ok: false; reason: string };

async function viaBrevo(input: MailInput): Promise<MailResult> {
  const apiKey = env("BREVO_API_KEY");
  if (!apiKey) return { ok: false, reason: "brevo_not_configured" };
  const sender = env("BREVO_SENDER_EMAIL") || input.from;
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": apiKey, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        sender: { email: sender, name: "ZaryadnaStantsiya" },
        to: [{ email: input.to }],
        ...(input.replyTo ? { replyTo: { email: input.replyTo } } : {}),
        subject: input.subject,
        textContent: input.text,
        tags: [input.tag],
      }),
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("[mail-brevo-error]", response.status, detail.slice(0, 300));
      return { ok: false, reason: `brevo_${response.status}` };
    }
    return { ok: true, via: "brevo" };
  } catch (error) {
    console.error("[mail-brevo-error]", error);
    return { ok: false, reason: "brevo_exception" };
  }
}

async function viaResend(input: MailInput): Promise<MailResult> {
  const apiKey = env("RESEND_API_KEY");
  if (!apiKey) return { ok: false, reason: "resend_not_configured" };
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: input.from,
        to: [input.to],
        ...(input.replyTo ? { reply_to: input.replyTo } : {}),
        subject: input.subject,
        text: input.text,
      }),
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("[mail-resend-error]", response.status, detail.slice(0, 300));
      return { ok: false, reason: `resend_${response.status}` };
    }
    return { ok: true, via: "resend" };
  } catch (error) {
    console.error("[mail-resend-error]", error);
    return { ok: false, reason: "resend_exception" };
  }
}

/** Brevo first, Resend if Brevo is missing or fails. */
export async function sendMail(input: MailInput): Promise<MailResult> {
  const brevo = await viaBrevo(input);
  if (brevo.ok) return brevo;
  const resend = await viaResend(input);
  if (resend.ok) return resend;
  return { ok: false, reason: `${brevo.reason}+${resend.reason}` };
}

/** "067 123 45 67" / "380671234567" → "+380671234567"; anything else → undefined. */
function uaPhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("380")) return `+${digits}`;
  if (digits.length === 10 && digits.startsWith("0")) return `+38${digits}`;
  return undefined;
}

/**
 * Keep a durable copy of the lead in Brevo Contacts (when BREVO_LEADS_LIST_ID is set),
 * so a lead survives even if the notification email is lost. Never throws.
 */
export async function saveLeadContact(lead: {
  kind: "calc" | "claim";
  name: string;
  email?: string;
  phone?: string;
}) {
  const apiKey = env("BREVO_API_KEY");
  const listId = Number(env("BREVO_LEADS_LIST_ID"));
  if (!apiKey || !Number.isInteger(listId) || listId <= 0) return;

  const sms = lead.phone ? uaPhone(lead.phone) : undefined;
  const base = {
    ...(lead.email ? { email: lead.email } : { ext_id: `${lead.kind}-${Date.now()}` }),
    listIds: [listId],
    updateEnabled: true,
  };
  const post = (attributes: Record<string, string>) =>
    fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: { "api-key": apiKey, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...base, attributes }),
    });

  // The Brevo account is shared with other sites: tag where the lead came from.
  const tags = { SIGNUP_SITE: "zaryadnastantsiya.com.ua", LEAD_CHANNEL: lead.kind };
  try {
    let response = await post({ FIRSTNAME: lead.name, ...tags, ...(sms ? { SMS: sms } : {}) });
    // A rejected attribute (e.g. SMS already used by another contact) must not lose the lead.
    if (!response.ok && response.status === 400) response = await post({ FIRSTNAME: lead.name, ...tags });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("[lead-contact-error]", response.status, detail.slice(0, 300));
    }
  } catch (error) {
    console.error("[lead-contact-error]", error);
  }
}
