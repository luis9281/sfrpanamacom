import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Home, LayoutTemplate, Laptop, MessageCircle, Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { contactPath } from "@/lib/contact";
import { remoteSupportPath, webDesignPath, whatsappLink } from "@/lib/site";

// Sin esto hereda "index, follow" del layout.
export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

const shortcuts = [
  { icon: Home, label: "Inicio", text: "Servicios TI, cloud e IA para empresas", href: "/" },
  { icon: Laptop, label: "Soporte técnico remoto", text: "Resolvemos fallas en minutos", href: remoteSupportPath },
  { icon: LayoutTemplate, label: "Diseño de páginas web", text: "Portafolio y planes", href: webDesignPath },
  { icon: Send, label: "Contacto", text: "Cotizaciones y consultas", href: contactPath },
];

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative flex-1 overflow-hidden bg-brand-charcoal">
        <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 right-[-10%] h-96 w-96 rounded-full bg-brand-green/20 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-5 py-20 lg:px-8 lg:py-28">
          <p
            aria-hidden="true"
            className="font-heading text-[7rem] font-extrabold leading-none tracking-tight text-transparent [-webkit-text-stroke:2px_var(--color-brand-green)] sm:text-[10rem]"
          >
            404
          </p>
          <h1 className="font-heading mt-4 text-3xl font-bold text-white sm:text-4xl">
            Esta página no existe o cambió de lugar
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/70">
            Puede que el enlace sea de nuestro sitio anterior. Elige a dónde ir
            o escríbenos y te ayudamos.
          </p>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {shortcuts.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-brand-green/50 hover:bg-white/10"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green/15 text-brand-green">
                    <item.icon size={21} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold text-white">{item.label}</span>
                    <span className="block text-sm text-white/60">{item.text}</span>
                  </span>
                  <ArrowRight size={18} className="shrink-0 text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-brand-green" />
                </Link>
              </li>
            ))}
          </ul>

          <a
            href={whatsappLink("Hola, llegué a una página que no existe en su sitio web.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand-green px-7 py-3.5 text-sm font-bold text-brand-ink shadow-lg shadow-brand-green/20 transition-transform hover:scale-105"
          >
            <MessageCircle size={18} />
            Escríbenos por WhatsApp
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
