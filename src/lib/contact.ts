// Definiciones del formulario de contacto. Las usan el formulario (navegador)
// y el Worker que envía el correo (worker/index.ts), así validan igual en ambos lados.

export const contactPath = "/contacto";
export const contactEndpoint = "/api/contacto";

// Clave pública de Cloudflare Turnstile. La de prueba (1x000…AA) siempre pasa;
// en producción la secreta real no la acepta, así que el envío falla cerrado hasta poner la real.
export const turnstileSiteKey = "1x00000000000000000000AA";

export const requestTypes = [
  { value: "cotizacion", label: "Cotización" },
  { value: "consulta", label: "Consulta" },
  { value: "soporte", label: "Soporte técnico" },
] as const;

export const contactMethods = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "llamada", label: "Llamada" },
  { value: "correo", label: "Correo" },
] as const;

export const urgencies = [
  { value: "normal", label: "Normal" },
  { value: "urgente", label: "Urgente: mi operación está detenida" },
] as const;

export const companySizes = [
  { value: "1-10", label: "1 a 10 colaboradores" },
  { value: "11-50", label: "11 a 50 colaboradores" },
  { value: "51-200", label: "51 a 200 colaboradores" },
  { value: "200+", label: "Más de 200 colaboradores" },
] as const;

export const otherService = "Otro / no estoy seguro";

export const limits = {
  name: 80,
  company: 100,
  email: 120,
  phone: 30,
  service: 80,
  subject: 120,
  messageMin: 10,
  message: 1000,
};

export type ContactData = {
  type: string;
  service: string;
  subject: string;
  message: string;
  urgency: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  size: string;
  method: string;
  consent: boolean;
};

export type ContactErrors = Partial<Record<keyof ContactData, string>>;

export const slugify = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const isOneOf = (list: readonly { value: string }[], value: string) =>
  list.some((item) => item.value === value);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Limpia y valida los datos. Devuelve los errores por campo (vacío si todo está bien). */
export function validateContact(raw: Record<string, unknown>): { data: ContactData; errors: ContactErrors } {
  const text = (key: string, max: number) => String(raw[key] ?? "").trim().slice(0, max);
  const data: ContactData = {
    type: text("type", 20),
    service: text("service", limits.service),
    subject: text("subject", limits.subject),
    message: text("message", limits.message),
    urgency: text("urgency", 20) || "normal",
    name: text("name", limits.name),
    company: text("company", limits.company),
    email: text("email", limits.email).toLowerCase(),
    phone: text("phone", limits.phone),
    size: text("size", 20),
    method: text("method", 20),
    consent: raw.consent === true || raw.consent === "true" || raw.consent === "on",
  };

  const errors: ContactErrors = {};
  if (!isOneOf(requestTypes, data.type)) errors.type = "Elige el tipo de solicitud.";
  if (!data.service) errors.service = "Elige un servicio.";
  if (data.subject.length < 3) errors.subject = "Escribe un asunto.";
  if (data.message.length < limits.messageMin)
    errors.message = `Cuéntanos un poco más (mínimo ${limits.messageMin} caracteres).`;
  if (!isOneOf(urgencies, data.urgency)) errors.urgency = "Elige la urgencia.";
  if (data.name.length < 2) errors.name = "Escribe tu nombre.";
  if (!emailPattern.test(data.email)) errors.email = "Escribe un correo válido.";
  if (data.phone.replace(/\D/g, "").length < 7) errors.phone = "Escribe un teléfono o WhatsApp válido.";
  if (data.size && !isOneOf(companySizes, data.size)) errors.size = "Elige un tamaño válido.";
  if (!isOneOf(contactMethods, data.method)) errors.method = "Elige cómo prefieres que te contactemos.";
  if (!data.consent) errors.consent = "Necesitamos tu autorización para responderte.";
  return { data, errors };
}

export const labelOf = (list: readonly { value: string; label: string }[], value: string) =>
  list.find((item) => item.value === value)?.label ?? value;
