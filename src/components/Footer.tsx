import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { navLinks, site } from "@/lib/site";

const serviceLinks = [
  "Consultoría de Sistemas",
  "Servicios Cloud AWS",
  "Diseño y Desarrollo Web",
  "Seguridad Informática",
  "Soporte a Redes y Hardware",
  "Soluciones con Inteligencia Artificial",
];

export default function Footer() {
  return (
    <footer className="bg-brand-ink">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/images/logo.png"
              alt={site.legalName}
              width={140}
              height={100}
              className="h-14 w-auto"
            />
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              Soluciones TI que tu empresa merece. Más de 15 años apoyando a
              pequeñas y medianas empresas en Panamá.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-white">
              Navegación
            </h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-brand-green"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-white">
              Servicios
            </h3>
            <ul className="mt-5 space-y-3">
              {serviceLinks.map((label) => (
                <li key={label}>
                  <a
                    href="#servicios"
                    className="text-sm text-white/60 transition-colors hover:text-brand-green"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-white">
              Contacto
            </h3>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={site.phoneHref}
                  className="flex items-start gap-3 text-sm text-white/60 transition-colors hover:text-brand-green"
                >
                  <Phone size={18} className="mt-0.5 shrink-0" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-start gap-3 text-sm text-white/60 transition-colors hover:text-brand-green"
                >
                  <Mail size={18} className="mt-0.5 shrink-0" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin size={18} className="mt-0.5 shrink-0" />
                {site.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {site.legalName}. Todos los derechos
            reservados.
          </p>
          <p className="text-xs text-white/40">
            Panamá, República de Panamá
          </p>
        </div>
      </div>
    </footer>
  );
}
