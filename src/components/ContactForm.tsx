"use client";

import Script from "next/script";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  LifeBuoy,
  Loader2,
  Mail,
  MessageCircle,
  MessagesSquare,
  Phone,
  Send,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import {
  companySizes,
  contactEndpoint,
  contactMethods,
  labelOf,
  limits,
  otherService,
  requestTypes,
  slugify,
  turnstileSiteKey,
  urgencies,
  validateContact,
  type ContactData,
  type ContactErrors,
} from "@/lib/contact";
import { whatsappLink } from "@/lib/site";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
  }
}

export type ServiceGroup = { label: string; options: string[] };

type Values = Omit<ContactData, "consent"> & { consent: boolean };
type Status = "idle" | "sending" | "success";

const initialValues: Values = {
  type: "cotizacion",
  service: "",
  subject: "",
  message: "",
  urgency: "normal",
  name: "",
  company: "",
  email: "",
  phone: "",
  size: "",
  method: "whatsapp",
  consent: false,
};

const typeIcons: Record<string, LucideIcon> = {
  cotizacion: FileText,
  consulta: MessagesSquare,
  soporte: LifeBuoy,
};

const methodIcons: Record<string, LucideIcon> = {
  whatsapp: MessageCircle,
  llamada: Phone,
  correo: Mail,
};

// Orden de los campos para llevar el foco al primer error
const fieldOrder: (keyof ContactData)[] = [
  "type", "service", "urgency", "subject", "message", "name", "company", "email", "phone", "size", "method", "consent",
];

const serverMessages: Record<string, string> = {
  captcha: "No pudimos verificar que no eres un robot. Vuelve a marcar la verificación e inténtalo otra vez.",
  rate: "Recibimos varios envíos seguidos desde tu conexión. Espera un minuto e inténtalo de nuevo.",
};
const fallbackMessage =
  "No pudimos enviar tu solicitud en este momento. Inténtalo de nuevo o escríbenos por WhatsApp y te atendemos enseguida.";

const inputClass = (invalid: boolean) =>
  `block w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-brand-ink shadow-sm outline-none transition placeholder:text-brand-charcoal-light/45 focus:ring-4 ${
    invalid
      ? "border-red-500 focus:border-red-500 focus:ring-red-100"
      : "border-black/10 hover:border-black/20 focus:border-brand-green-dark focus:ring-brand-green/20"
  }`;

const choiceClass =
  "relative flex cursor-pointer items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-brand-charcoal shadow-sm transition hover:border-brand-green/50 has-[:checked]:border-brand-green-dark has-[:checked]:bg-brand-green-light has-[:checked]:text-brand-ink has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand-green/25";

function Field({
  id,
  label,
  optional,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-bold text-brand-ink">
          {label}
          {optional && <span className="ml-1.5 font-medium text-brand-charcoal-light/60">(opcional)</span>}
        </label>
        {hint}
      </div>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-red-600">
          <AlertCircle size={15} className="shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

function StepTitle({ n, children }: { n: number; children: ReactNode }) {
  return (
    <h2 className="font-heading flex items-center gap-3 text-lg font-bold text-brand-ink">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-ink text-xs font-bold text-brand-green">
        {n}
      </span>
      {children}
    </h2>
  );
}

export default function ContactForm({ services }: { services: ServiceGroup[] }) {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [requestId, setRequestId] = useState("");
  const [token, setToken] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const startedAt = useRef(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);

  // Prellenar desde los enlaces del sitio: /contacto?tipo=soporte&servicio=servicios-cloud-aws
  useEffect(() => {
    startedAt.current = Date.now();
    const params = new URLSearchParams(window.location.search);
    const type = params.get("tipo");
    const slug = params.get("servicio");
    const service = slug && services.flatMap((g) => g.options).find((option) => slugify(option) === slug);
    if ((type && requestTypes.some((t) => t.value === type)) || service) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- lectura única de la URL al montar
      setValues((v) => ({
        ...v,
        type: type && requestTypes.some((t) => t.value === type) ? type : v.type,
        service: service || v.service,
      }));
    }
  }, [services]);

  const renderCaptcha = () => {
    if (!window.turnstile || !captchaRef.current || widgetId.current) return;
    widgetId.current = window.turnstile.render(captchaRef.current, {
      sitekey: turnstileSiteKey,
      language: "es",
      theme: "light",
      callback: (t: string) => {
        setToken(t);
        setCaptchaError("");
      },
      "expired-callback": () => setToken(""),
      "error-callback": () => setToken(""),
    });
  };

  useEffect(() => () => window.turnstile?.remove(widgetId.current), []);

  const resetCaptcha = () => {
    setToken("");
    window.turnstile?.reset(widgetId.current);
  };

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const focusFirstError = (found: ContactErrors) => {
    const first = fieldOrder.find((key) => found[key]);
    if (first) document.getElementById(`cf-${first}`)?.focus();
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setServerError("");
    const { errors: found } = validateContact(values);
    setErrors(found);
    const missingCaptcha = !token;
    setCaptchaError(missingCaptcha ? "Marca la verificación de seguridad para continuar." : "");
    if (Object.keys(found).length) return focusFirstError(found);
    if (missingCaptcha) return;

    setStatus("sending");
    try {
      const res = await fetch(contactEndpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...values,
          website: honeypot.current?.value ?? "",
          startedAt: startedAt.current,
          turnstileToken: token,
        }),
      });
      const result = (await res.json().catch(() => ({}))) as { ok?: boolean; id?: string; error?: string; errors?: ContactErrors };
      if (res.ok && result.ok) {
        setRequestId(result.id ?? "");
        setStatus("success");
        window.gtag?.("event", "generate_lead", {
          method: "form",
          request_type: values.type,
          service: values.service,
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      setStatus("idle");
      resetCaptcha();
      if (result.error === "validation" && result.errors) {
        setErrors(result.errors);
        focusFirstError(result.errors);
      } else {
        setServerError(serverMessages[result.error ?? ""] ?? fallbackMessage);
      }
    } catch {
      setStatus("idle");
      resetCaptcha();
      setServerError(fallbackMessage);
    }
  };

  const startOver = () => {
    setValues({ ...initialValues, method: values.method, name: values.name, company: values.company, email: values.email, phone: values.phone, size: values.size, consent: values.consent });
    setErrors({});
    setRequestId("");
    setStatus("idle");
    startedAt.current = Date.now();
    // El formulario se vuelve a montar y <Script onReady> dibuja un captcha nuevo.
    window.turnstile?.remove(widgetId.current);
    widgetId.current = undefined;
    setToken("");
  };

  const described = (key: keyof ContactData) => (errors[key] ? `cf-${key}-error` : undefined);

  if (status === "success") {
    const urgent = values.type === "soporte" && values.urgency === "urgente";
    return (
      <div role="status" className="flex flex-col items-center px-2 py-10 text-center sm:py-16">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-green-light text-brand-green-dark ring-8 ring-brand-green-light/50">
          <CheckCircle2 size={40} strokeWidth={2.2} />
        </span>
        <h2 className="font-heading mt-7 text-3xl font-bold text-brand-ink">¡Solicitud recibida!</h2>
        {requestId && (
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-neutral-50 px-4 py-1.5 text-sm font-semibold text-brand-charcoal">
            N.º de solicitud <span className="font-heading font-bold tracking-wide text-brand-ink">{requestId}</span>
          </p>
        )}
        <p className="mt-5 max-w-md text-base leading-relaxed text-brand-charcoal-light/85">
          Gracias, {values.name.split(" ")[0]}. Revisamos tu solicitud y te contactamos por{" "}
          <strong className="text-brand-ink">{labelOf(contactMethods, values.method).toLowerCase()}</strong> lo antes posible.
        </p>
        {urgent && (
          <p className="mt-4 max-w-md rounded-xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900">
            Como tu operación está detenida, escríbenos también por WhatsApp para atenderte de inmediato.
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={whatsappLink(`Hola, acabo de enviar la solicitud ${requestId} desde el sitio web.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand-green px-6 py-3 text-sm font-bold text-brand-ink transition-transform hover:scale-105"
          >
            <MessageCircle size={18} />
            Escribir por WhatsApp
          </a>
          <button
            type="button"
            onClick={startOver}
            className="inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3 text-sm font-bold text-brand-charcoal transition-colors hover:border-brand-ink hover:text-brand-ink"
          >
            Enviar otra solicitud
          </button>
        </div>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-10">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={renderCaptcha}
      />

      {/* 1. La solicitud */}
      <fieldset className="space-y-6 [&>legend+*]:mt-0">
        <legend className="mb-5 w-full">
          <StepTitle n={1}>¿En qué te ayudamos?</StepTitle>
        </legend>

        <div role="radiogroup" aria-label="Tipo de solicitud" className="grid grid-cols-3 gap-2.5 sm:gap-3">
          {requestTypes.map((option, i) => {
            const Icon = typeIcons[option.value];
            return (
              <label key={option.value} className={`${choiceClass} flex-col items-start gap-2 px-3 py-3.5 leading-tight sm:px-4 sm:py-4`}>
                <input
                  type="radio"
                  name="type"
                  id={i === 0 ? "cf-type" : undefined}
                  value={option.value}
                  checked={values.type === option.value}
                  onChange={() => set("type", option.value)}
                  className="sr-only"
                />
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-green-light text-brand-green-dark">
                  <Icon size={19} />
                </span>
                {option.label}
              </label>
            );
          })}
        </div>

        <Field id="cf-service" label="Servicio" error={errors.service}>
          <select
            id="cf-service"
            value={values.service}
            onChange={(e) => set("service", e.target.value)}
            aria-invalid={!!errors.service}
            aria-describedby={described("service")}
            className={`${inputClass(!!errors.service)} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%235a9c2c' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")] bg-[length:20px] bg-[right_14px_center] bg-no-repeat pr-11 ${values.service ? "" : "text-brand-charcoal-light/60"}`}
          >
            <option value="" disabled>
              Elige un servicio
            </option>
            {services.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.options.map((option) => (
                  <option key={option} value={option} className="text-brand-ink">
                    {option}
                  </option>
                ))}
              </optgroup>
            ))}
            <option value={otherService} className="text-brand-ink">
              {otherService}
            </option>
          </select>
        </Field>

        {values.type === "soporte" && (
          <div role="radiogroup" aria-label="Urgencia" className="animate-fade-up">
            <p className="mb-1.5 text-sm font-bold text-brand-ink">Urgencia</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[auto_1fr]">
              {urgencies.map((option, i) => (
                <label
                  key={option.value}
                  className={`${choiceClass} ${option.value === "urgente" ? "has-[:checked]:border-amber-500 has-[:checked]:bg-amber-50" : ""}`}
                >
                  <input
                    type="radio"
                    name="urgency"
                    id={i === 0 ? "cf-urgency" : undefined}
                    value={option.value}
                    checked={values.urgency === option.value}
                    onChange={() => set("urgency", option.value)}
                    className="h-4 w-4 accent-brand-green-dark"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        )}

        <Field id="cf-subject" label="Asunto" error={errors.subject}>
          <input
            id="cf-subject"
            type="text"
            value={values.subject}
            onChange={(e) => set("subject", e.target.value)}
            maxLength={limits.subject}
            placeholder="Ej.: Migrar nuestro servidor a AWS"
            aria-invalid={!!errors.subject}
            aria-describedby={described("subject")}
            className={inputClass(!!errors.subject)}
          />
        </Field>

        <Field
          id="cf-message"
          label="Descripción breve"
          error={errors.message}
          hint={
            <span className={`text-xs tabular-nums ${values.message.length > limits.message - 50 ? "font-bold text-amber-700" : "text-brand-charcoal-light/55"}`}>
              {values.message.length}/{limits.message}
            </span>
          }
        >
          <textarea
            id="cf-message"
            rows={5}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            maxLength={limits.message}
            placeholder="Cuéntanos qué necesitas, cuántos equipos o usuarios involucra y cualquier fecha importante."
            aria-invalid={!!errors.message}
            aria-describedby={described("message")}
            className={`${inputClass(!!errors.message)} resize-y`}
          />
        </Field>
      </fieldset>

      {/* 2. Datos de contacto */}
      <fieldset className="space-y-6 [&>legend+*]:mt-0">
        <legend className="mb-5 w-full">
          <StepTitle n={2}>Tus datos</StepTitle>
        </legend>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Field id="cf-name" label="Nombre y apellido" error={errors.name}>
            <input
              id="cf-name"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={(e) => set("name", e.target.value)}
              maxLength={limits.name}
              aria-invalid={!!errors.name}
              aria-describedby={described("name")}
              className={inputClass(!!errors.name)}
            />
          </Field>
          <Field id="cf-company" label="Empresa" optional error={errors.company}>
            <input
              id="cf-company"
              type="text"
              autoComplete="organization"
              value={values.company}
              onChange={(e) => set("company", e.target.value)}
              maxLength={limits.company}
              className={inputClass(!!errors.company)}
            />
          </Field>
          <Field id="cf-email" label="Correo electrónico" error={errors.email}>
            <input
              id="cf-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={values.email}
              onChange={(e) => set("email", e.target.value)}
              maxLength={limits.email}
              placeholder="nombre@empresa.com"
              aria-invalid={!!errors.email}
              aria-describedby={described("email")}
              className={inputClass(!!errors.email)}
            />
          </Field>
          <Field id="cf-phone" label="Teléfono o WhatsApp" error={errors.phone}>
            <input
              id="cf-phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              value={values.phone}
              onChange={(e) => set("phone", e.target.value)}
              maxLength={limits.phone}
              placeholder="6000-0000"
              aria-invalid={!!errors.phone}
              aria-describedby={described("phone")}
              className={inputClass(!!errors.phone)}
            />
          </Field>
          <Field id="cf-size" label="Tamaño de la empresa" optional error={errors.size}>
            <select
              id="cf-size"
              value={values.size}
              onChange={(e) => set("size", e.target.value)}
              className={`${inputClass(!!errors.size)} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%235a9c2c' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")] bg-[length:20px] bg-[right_14px_center] bg-no-repeat pr-11 ${values.size ? "" : "text-brand-charcoal-light/60"}`}
            >
              <option value="">Selecciona un rango</option>
              {companySizes.map((option) => (
                <option key={option.value} value={option.value} className="text-brand-ink">
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </fieldset>

      {/* 3. Medio de contacto */}
      <fieldset className="space-y-4 [&>legend+*]:mt-0">
        <legend className="mb-5 w-full">
          <StepTitle n={3}>¿Cómo prefieres que te contactemos?</StepTitle>
        </legend>
        <div role="radiogroup" aria-label="Medio de contacto preferido" className="grid grid-cols-3 gap-2.5 sm:gap-3">
          {contactMethods.map((option, i) => {
            const Icon = methodIcons[option.value];
            return (
              <label key={option.value} className={`${choiceClass} flex-col justify-center gap-1.5 px-2 sm:flex-row sm:gap-3 sm:px-4`}>
                <input
                  type="radio"
                  name="method"
                  id={i === 0 ? "cf-method" : undefined}
                  value={option.value}
                  checked={values.method === option.value}
                  onChange={() => set("method", option.value)}
                  className="sr-only"
                />
                <Icon size={18} className="shrink-0 text-brand-green-dark" />
                {option.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Trampa para robots: invisible para personas */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="cf-website">No llenar este campo</label>
        <input ref={honeypot} id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-6 border-t border-black/5 pt-8">
        <div>
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-brand-charcoal">
            <input
              id="cf-consent"
              type="checkbox"
              checked={values.consent}
              onChange={(e) => set("consent", e.target.checked)}
              aria-invalid={!!errors.consent}
              aria-describedby={described("consent")}
              className="mt-0.5 h-5 w-5 shrink-0 rounded accent-brand-green-dark"
            />
            Autorizo a System FR Panamá a usar estos datos únicamente para responder a mi solicitud.
          </label>
          {errors.consent && (
            <p id="cf-consent-error" className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-red-600">
              <AlertCircle size={15} className="shrink-0" />
              {errors.consent}
            </p>
          )}
        </div>

        <div>
          <div ref={captchaRef} className="min-h-[65px]" />
          {captchaError && (
            <p className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-red-600">
              <AlertCircle size={15} className="shrink-0" />
              {captchaError}
            </p>
          )}
        </div>

        <div aria-live="polite">
          {serverError && (
            <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <p>
                {serverError}{" "}
                <a
                  href={whatsappLink("Hola, intenté enviar una solicitud desde el formulario del sitio web.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline underline-offset-2"
                >
                  Abrir WhatsApp
                </a>
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-xs font-medium text-brand-charcoal-light/70">
            <ShieldCheck size={16} className="shrink-0 text-brand-green-dark" />
            Protegido con Cloudflare Turnstile. No compartimos tus datos.
          </p>
          <button
            type="submit"
            disabled={sending}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-ink px-8 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-brand-charcoal-light disabled:cursor-wait disabled:opacity-70 sm:w-auto"
          >
            {sending ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Enviando…
              </>
            ) : (
              <>
                <Send size={18} />
                Enviar solicitud
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
