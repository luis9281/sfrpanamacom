// Worker de Cloudflare: sirve el sitio estático (out/) y atiende POST /api/contacto,
// que valida el captcha (Turnstile) y envía la solicitud a ventas@ con Resend.
//
// Secretos (Cloudflare → Workers → sfrpanamacom → Settings → Variables and Secrets):
//   RESEND_API_KEY        clave de Resend
//   TURNSTILE_SECRET_KEY  clave secreta de Turnstile

import {
  companySizes,
  contactEndpoint,
  contactMethods,
  labelOf,
  requestTypes,
  urgencies,
  validateContact,
  type ContactData,
} from "../src/lib/contact";

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  RESEND_API_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
  CONTACT_LIMITER?: { limit(options: { key: string }): Promise<{ success: boolean }> };
}

const allowedOrigins = [
  "https://www.sfrpanama.com",
  "https://sfrpanama.com",
  "http://localhost:8787",
  "http://localhost:3000",
];

const MAX_BODY = 12_000;
const MIN_FILL_MS = 3_000;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

// Número de solicitud con la fecha de Panamá (UTC-5): SFR-251015-4821
function requestId() {
  const panama = new Date(Date.now() - 5 * 3600_000);
  const date = panama.toISOString().slice(2, 10).replace(/-/g, "");
  const random = crypto.getRandomValues(new Uint16Array(1))[0] % 10_000;
  return `SFR-${date}-${String(random).padStart(4, "0")}`;
}

async function verifyTurnstile(secret: string, token: string, ip: string | null) {
  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form });
  const outcome = (await res.json()) as { success: boolean; "error-codes"?: string[] };
  if (!outcome.success) console.warn("turnstile rechazado", outcome["error-codes"]);
  return outcome.success;
}

function buildEmail(data: ContactData, id: string) {
  const urgent = data.type === "soporte" && data.urgency === "urgente";
  const rows: [string, string][] = [
    ["Solicitud", id],
    ["Tipo", labelOf(requestTypes, data.type)],
    ["Servicio", data.service],
    ...(data.type === "soporte" ? [["Urgencia", labelOf(urgencies, data.urgency)] as [string, string]] : []),
    ["Nombre", data.name],
    ["Empresa", data.company || "—"],
    ["Tamaño", data.size ? labelOf(companySizes, data.size) : "—"],
    ["Correo", data.email],
    ["Teléfono / WhatsApp", data.phone],
    ["Prefiere contacto por", labelOf(contactMethods, data.method)],
  ];

  const subject = `${urgent ? "URGENTE · " : ""}[${labelOf(requestTypes, data.type)}] ${data.subject} — ${data.name} (${id})`;
  const phoneDigits = data.phone.replace(/\D/g, "");
  const waNumber = phoneDigits.length === 8 ? `507${phoneDigits}` : phoneDigits;

  const html = `<!doctype html><html lang="es"><body style="margin:0;background:#f4f6f3;font-family:Arial,Helvetica,sans-serif;color:#171a1b">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e3e8df">
<tr><td style="background:#26292b;padding:20px 28px;border-bottom:4px solid #7cc242">
<div style="color:#7cc242;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase">${urgent ? "⚠ Urgente · " : ""}Nueva solicitud desde sfrpanama.com</div>
<div style="color:#ffffff;font-size:20px;font-weight:bold;margin-top:6px">${escapeHtml(data.subject)}</div></td></tr>
<tr><td style="padding:24px 28px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="padding:7px 0;color:#5f6566;width:42%;vertical-align:top">${k}</td><td style="padding:7px 0;font-weight:bold">${escapeHtml(v)}</td></tr>`,
  )
  .join("\n")}
</table>
<div style="margin-top:18px;padding:16px 18px;background:#f4f9ef;border-left:4px solid #7cc242;border-radius:8px;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(data.message)}</div>
<p style="margin:22px 0 0;font-size:14px">
<a href="mailto:${escapeHtml(data.email)}?subject=${encodeURIComponent(`Re: ${data.subject} (${id})`)}" style="display:inline-block;background:#7cc242;color:#171a1b;font-weight:bold;text-decoration:none;padding:10px 18px;border-radius:999px;margin:0 8px 8px 0">Responder por correo</a>
<a href="https://wa.me/${waNumber}" style="display:inline-block;background:#171a1b;color:#ffffff;font-weight:bold;text-decoration:none;padding:10px 18px;border-radius:999px;margin:0 8px 8px 0">Abrir WhatsApp</a>
</p></td></tr>
<tr><td style="padding:14px 28px;background:#f7f8f6;color:#8a908f;font-size:12px">Responder a este correo le escribe directamente a ${escapeHtml(data.email)}.</td></tr>
</table></td></tr></table></body></html>`;

  const text = [
    `Nueva solicitud desde sfrpanama.com${urgent ? " (URGENTE)" : ""}`,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    `Asunto: ${data.subject}`,
    "",
    data.message,
  ].join("\n");

  return { subject, html, text };
}

async function handleContact(request: Request, env: Env) {
  if (request.method !== "POST") return json({ error: "method" }, 405);

  const origin = request.headers.get("origin");
  if (!origin || !allowedOrigins.includes(origin)) return json({ error: "origin" }, 403);

  const ip = request.headers.get("cf-connecting-ip");
  if (env.CONTACT_LIMITER) {
    const { success } = await env.CONTACT_LIMITER.limit({ key: ip ?? "sin-ip" });
    if (!success) return json({ error: "rate" }, 429);
  }

  const body = await request.text();
  if (body.length > MAX_BODY) return json({ error: "size" }, 413);
  let raw: Record<string, unknown>;
  try {
    raw = JSON.parse(body);
  } catch {
    return json({ error: "json" }, 400);
  }

  // Trampas para robots: campo oculto lleno o envío demasiado rápido.
  // Se responde "ok" para no darles pistas, pero no se envía nada.
  const startedAt = Number(raw.startedAt);
  if (raw.website || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return json({ ok: true, id: requestId() });
  }

  const { data, errors } = validateContact(raw);
  if (Object.keys(errors).length) return json({ error: "validation", errors }, 422);

  if (!env.TURNSTILE_SECRET_KEY || !env.RESEND_API_KEY) {
    console.error("faltan secretos: TURNSTILE_SECRET_KEY o RESEND_API_KEY");
    return json({ error: "config" }, 503);
  }

  const token = String(raw.turnstileToken ?? "");
  if (!token || !(await verifyTurnstile(env.TURNSTILE_SECRET_KEY, token, ip))) {
    return json({ error: "captcha" }, 400);
  }

  const id = requestId();
  const email = buildEmail(data, id);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json",
      "idempotency-key": id,
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM || "Formulario web SFR Panamá <ventas@sfrpanama.com>",
      to: [env.CONTACT_TO || "ventas@sfrpanama.com"],
      reply_to: data.email,
      subject: email.subject,
      html: email.html,
      text: email.text,
      tags: [{ name: "tipo", value: data.type }],
    }),
  });

  if (!res.ok) {
    console.error("resend falló", res.status, await res.text());
    return json({ error: "send" }, 502);
  }
  return json({ ok: true, id });
}

const worker = {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    if (url.pathname === contactEndpoint) {
      try {
        return await handleContact(request, env);
      } catch (error) {
        console.error("error en /api/contacto", error);
        return json({ error: "server" }, 500);
      }
    }
    return env.ASSETS.fetch(request);
  },
};

export default worker;
