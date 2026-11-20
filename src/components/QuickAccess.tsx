import Link from "next/link";
import { ArrowRight, FileText, LifeBuoy, Phone, type LucideIcon } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";
import { contactPath } from "@/lib/contact";

type Shortcut = {
  icon: LucideIcon;
  title: string;
  hint: string;
  href: string;
  external?: boolean;
};

// Tres caminos directos para quien llega con prisa: chat, formulario o llamada.
const shortcuts: Shortcut[] = [
  {
    icon: LifeBuoy,
    title: "Soporte ahora",
    hint: "Te atendemos por WhatsApp",
    href: whatsappLink("Hola SFR, necesito soporte técnico. El problema es: "),
    external: true,
  },
  {
    icon: FileText,
    title: "Solicita una cotización",
    hint: "Respuesta con propuesta clara",
    href: `${contactPath}?tipo=cotizacion`,
  },
  {
    icon: Phone,
    title: "Llámanos",
    hint: site.phoneDisplay,
    href: site.phoneHref,
  },
];

const cardClass =
  "group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-white/5 lg:px-8 lg:py-5";

export default function QuickAccess() {
  return (
    <nav aria-label="Accesos rápidos" data-track="acceso-rapido" className="border-t border-white/10 bg-brand-charcoal">
      <ul className="mx-auto grid max-w-7xl divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {shortcuts.map(({ icon: Icon, title, hint, href, external }) => {
          const content = (
            <>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-green/15 text-brand-green transition-colors group-hover:bg-brand-green group-hover:text-brand-ink">
                <Icon size={20} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold text-white">{title}</span>
                <span className="block text-sm text-white/60">{hint}</span>
              </span>
              <ArrowRight
                size={18}
                className="shrink-0 text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-brand-green"
              />
            </>
          );
          return (
            <li key={title}>
              {external ? (
                <a href={href} target="_blank" rel="noopener noreferrer" className={cardClass}>
                  {content}
                </a>
              ) : (
                <Link href={href} className={cardClass}>
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
