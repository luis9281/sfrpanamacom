import { MessageCircle, Phone } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";

export default function CTA() {
  return (
    <section id="contacto" className="relative overflow-hidden bg-brand-green">
      <div className="bg-grid absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-5xl px-5 py-16 text-center lg:px-8 lg:py-20">
        <h2 className="font-heading text-3xl font-bold text-brand-ink sm:text-4xl">
          ¿Listo para una operación TI sin interrupciones?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-brand-ink/80">
          Escríbenos hoy y agenda una consulta gratuita. Te mostramos cómo
          optimizar tu tecnología y reducir costos operativos.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href={whatsappLink("Hola, quiero agendar una consulta gratuita.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand-ink px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105"
          >
            <MessageCircle size={18} />
            Escríbenos por WhatsApp
          </a>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 rounded-full border-2 border-brand-ink px-7 py-3.5 text-sm font-bold text-brand-ink transition-colors hover:bg-brand-ink hover:text-white"
          >
            <Phone size={18} />
            {site.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
