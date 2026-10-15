import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MessageCircle, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ContactForm, { type ServiceGroup } from "@/components/ContactForm";
import { services } from "@/components/Services";
import { solutions } from "@/components/AISolutions";
import { contactPath } from "@/lib/contact";
import { site, whatsappLink } from "@/lib/site";

const title = "Contacto y cotizaciones";
const description =
  "Solicita una cotización, haz una consulta o pide soporte técnico a SFR Panamá. Cuéntanos qué necesitas y te contactamos por WhatsApp, llamada o correo.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: contactPath },
  openGraph: {
    title: `${title} | SFR Panamá`,
    description,
    url: contactPath,
    siteName: site.name,
    locale: "es_PA",
    type: "website",
  },
};

const serviceGroups: ServiceGroup[] = [
  { label: "Servicios TI", options: services.map((s) => s.title) },
  { label: "Soluciones con inteligencia artificial", options: solutions.map((s) => s.title) },
];

const channels = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: site.phoneDisplay,
    href: whatsappLink("Hola, necesito ayuda con un servicio de SFR Panamá."),
    external: true,
  },
  { icon: Phone, label: "Llamada", value: site.phoneDisplay, href: site.phoneHref },
  { icon: Mail, label: "Correo", value: site.email, href: `mailto:${site.email}` },
];

const steps = [
  { title: "Recibimos tu solicitud", text: "Llega directo a nuestro equipo de ventas y soporte, con un número para darle seguimiento." },
  { title: "La revisa un especialista", text: "Analizamos lo que necesitas y, si hace falta, te pedimos más detalles." },
  { title: "Te contactamos", text: "Por el medio que elegiste, con una propuesta o la solución a tu consulta." },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="bg-brand-green-light/30">
        {/* Encabezado */}
        <section className="relative overflow-hidden bg-brand-charcoal">
          <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
          <div aria-hidden="true" className="pointer-events-none absolute -top-24 right-[-10%] h-96 w-96 rounded-full bg-brand-green/20 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-5 pb-36 pt-14 lg:px-8 lg:pb-44 lg:pt-20">
            <nav aria-label="Ruta de navegación" className="text-xs font-semibold text-white/50">
              <Link href="/" className="hover:text-brand-green">Inicio</Link>
              <span className="mx-2">/</span>
              <span className="text-white/80">Contacto</span>
            </nav>
            <h1 className="font-heading mt-6 max-w-3xl text-4xl font-bold leading-tight text-balance text-white sm:text-5xl">
              Cuéntanos qué necesitas y te{" "}
              <span className="text-brand-green">respondemos personalmente</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
              Cotizaciones, consultas y soporte técnico para empresas en Panamá.
              Completa el formulario y un especialista te contacta.
            </p>
          </div>
        </section>

        <div className="relative mx-auto grid max-w-7xl gap-8 px-5 pb-20 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10 lg:px-8 lg:pb-28">
          {/* Formulario */}
          <section
            aria-label="Formulario de contacto"
            className="-mt-24 rounded-3xl border border-black/5 bg-white p-6 shadow-[0_30px_80px_-30px_rgba(23,26,27,0.45)] sm:p-10 lg:-mt-32"
          >
            <ContactForm services={serviceGroups} />
          </section>

          {/* Canales y proceso */}
          <aside className="space-y-6 lg:-mt-32">
            <div className="rounded-3xl border border-white/10 bg-brand-ink p-7 text-white shadow-xl">
              <h2 className="font-heading text-lg font-bold">¿Prefieres hablar ya?</h2>
              <p className="mt-1.5 text-sm text-white/60">Escríbenos o llámanos directamente.</p>
              <ul className="mt-6 space-y-3">
                {channels.map((channel) => (
                  <li key={channel.label}>
                    <a
                      href={channel.href}
                      {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-3.5 transition-colors hover:border-brand-green/50 hover:bg-white/10"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green text-brand-ink">
                        <channel.icon size={20} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-semibold uppercase tracking-wide text-white/50">{channel.label}</span>
                        <span className="block truncate text-sm font-bold group-hover:text-brand-green">{channel.value}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-6 flex items-center gap-2.5 border-t border-white/10 pt-5 text-sm text-white/70">
                <Clock size={17} className="shrink-0 text-brand-green" />
                Soporte técnico disponible 24/7
              </p>
            </div>

            <div className="rounded-3xl border border-black/5 bg-white p-7 shadow-sm">
              <h2 className="font-heading text-lg font-bold text-brand-ink">¿Qué pasa después?</h2>
              <ol className="mt-6 space-y-6">
                {steps.map((step, i) => (
                  <li key={step.title} className="relative flex gap-4">
                    {i < steps.length - 1 && (
                      <span aria-hidden="true" className="absolute left-[15px] top-9 h-[calc(100%-12px)] w-px bg-brand-green/30" />
                    )}
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-green-light text-sm font-bold text-brand-green-dark">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-brand-ink">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-brand-charcoal-light/75">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
