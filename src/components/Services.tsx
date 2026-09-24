import {
  ClipboardList,
  Code2,
  ShieldCheck,
  Cloud,
  LayoutTemplate,
  Megaphone,
  Server,
  ShoppingCart,
  Network,
  Wrench,
  Laptop,
  ArrowRight,
} from "lucide-react";
import { webDesignPath } from "@/lib/site";

export const services = [
  {
    icon: ClipboardList,
    title: "Consultoría de Sistemas",
    description:
      "Análisis estratégico de tu infraestructura TI y un plan tecnológico claro para tomar mejores decisiones y crecer.",
  },
  {
    icon: Code2,
    title: "Desarrollo de Aplicaciones",
    description:
      "Aplicaciones web y móviles a la medida, diseñadas según los procesos y necesidades de tu negocio.",
  },
  {
    icon: ShieldCheck,
    title: "Seguridad Informática",
    description:
      "Antivirus, firewalls, respaldos y protección integral de la información de tu empresa frente a ciberataques.",
  },
  {
    icon: Cloud,
    title: "Servicios Cloud AWS",
    description:
      "Migración y administración en Amazon Web Services: EC2, S3 y servidores con alta disponibilidad, con ahorros de hasta 60%.",
  },
  {
    icon: LayoutTemplate,
    title: "Diseño y Desarrollo Web",
    description:
      "Páginas web responsivas, tiendas en línea (ecommerce), posicionamiento SEO y manejo de redes sociales.",
    href: webDesignPath,
    cta: "Ver portafolio",
  },
  {
    icon: Megaphone,
    title: "Mercadeo Digital",
    description:
      "SEO, email marketing, Facebook, Instagram y Google Ads para hacer crecer tu marca.",
  },
  {
    icon: Server,
    title: "Hosting y Servidores",
    description:
      "Dominios, hosting, correo, cPanel y administración de bases de datos.",
  },
  {
    icon: ShoppingCart,
    title: "Venta de Equipos",
    description:
      "Equipos de cómputo, comunicaciones, servidores, accesorios y licencias.",
  },
  {
    icon: Network,
    title: "Soporte a Redes",
    description:
      "Configuración LAN/WiFi, verificación de seguridad y telefonía IP.",
  },
  {
    icon: Wrench,
    title: "Soporte a Hardware",
    description:
      "Diagnóstico físico, reemplazo de partes e instalación de equipos.",
  },
  {
    icon: Laptop,
    title: "Soporte a Software",
    description:
      "Optimización de sistemas operativos, reinstalación de Windows, antivirus y resolución de errores.",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div data-parallax="0.25" className="absolute -left-32 top-24 h-96 w-96 rounded-full bg-brand-green/15 blur-3xl" />
        <div data-parallax="-0.2" className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-brand-green/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div data-reveal="up" className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-green-dark">
            Lo que hacemos
          </p>
          <h2 className="font-heading mt-3 text-3xl font-bold text-brand-ink sm:text-4xl">
            Servicios de TI y soporte técnico en Panamá
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-charcoal-light/80">
            Outsourcing de TI con técnicos especializados en mantenimiento,
            reparaciones, servidores, seguridad, Windows, Linux y cableado
            estructurado para empresas de todo Panamá.
          </p>
        </div>

        <div
          data-reveal-stagger="up"
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-2xl border border-black/5 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-green/30 hover:shadow-xl"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green-light text-brand-green-dark transition-colors group-hover:bg-brand-green group-hover:text-white">
                <service.icon size={22} />
              </span>
              <h3 className="font-heading mt-5 text-lg font-bold text-brand-ink">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-charcoal-light/80">
                {service.description}
              </p>
              {"href" in service && (
                <a
                  href={service.href}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-green-dark hover:gap-2.5 transition-all"
                >
                  {service.cta}
                  <ArrowRight size={16} />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
