import type { Metadata } from "next";
import type { CSSProperties } from "react";
import {
  ArrowDown,
  Cloud,
  Gauge,
  Globe,
  Lock,
  Mail,
  MessageCircle,
  Search,
  ShoppingCart,
  Smartphone,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ScrollEffects from "@/components/ScrollEffects";
import HeroCubes from "@/components/HeroCubes";
import PortfolioGallery from "@/components/PortfolioGallery";
import { portfolio } from "@/lib/portfolio";
import { site, webDesignPath, whatsappLink } from "@/lib/site";

const title = "Diseño de Páginas Web en Panamá";
const description =
  "Diseño y desarrollo de páginas web profesionales en Panamá: sitios responsivos, tiendas en línea, SEO, hosting, dominios, correo corporativo y almacenamiento en la nube. Mira nuestro portafolio.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "diseño de paginas web Panama",
    "creacion de paginas web Panama",
    "desarrollo web Panama",
    "tiendas en linea Panama",
    "hosting Panama",
    "dominios .com.pa",
    "correo corporativo Panama",
    "SEO Panama",
  ],
  alternates: { canonical: webDesignPath },
  openGraph: {
    title: `${title} | SFR Panamá`,
    description,
    url: webDesignPath,
    siteName: site.name,
    locale: "es_PA",
    type: "website",
    images: ["/opengraph-image.png"],
  },
};

const features = [
  {
    icon: Smartphone,
    title: "Diseño responsivo",
    description: "Se adapta perfecto a celulares, tablets y computadoras.",
  },
  {
    icon: Search,
    title: "SEO desde el inicio",
    description: "Estructura, velocidad y contenido listos para aparecer en Google.",
  },
  {
    icon: ShoppingCart,
    title: "Tiendas en línea",
    description: "Catálogos y ecommerce con pagos, inventario y cotizaciones.",
  },
  {
    icon: Globe,
    title: "Hosting y dominios",
    description: "Registro de dominios .com y .com.pa y hosting de alto rendimiento.",
  },
  {
    icon: Mail,
    title: "Correo corporativo",
    description: "Cuentas de correo con tu dominio para una imagen profesional.",
  },
  {
    icon: Cloud,
    title: "Almacenamiento en la nube",
    description: "Respaldos y archivos seguros en AWS S3, disponibles siempre.",
  },
  {
    icon: Lock,
    title: "Seguridad SSL",
    description: "Certificado SSL, protección y actualizaciones constantes.",
  },
  {
    icon: Gauge,
    title: "Velocidad y soporte",
    description: "Sitios rápidos, monitoreados y con soporte técnico local.",
  },
];

const steps = [
  {
    title: "Descubrimiento",
    description: "Conocemos tu negocio, tus clientes y los objetivos del sitio.",
  },
  {
    title: "Diseño",
    description: "Creamos la propuesta visual con tu marca y la aprobamos contigo.",
  },
  {
    title: "Desarrollo",
    description: "Programamos, optimizamos para SEO y probamos en todos los dispositivos.",
  },
  {
    title: "Lanzamiento y hosting",
    description: "Publicamos, configuramos dominio y correo, y te damos soporte continuo.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: title,
      serviceType: "Diseño y desarrollo web",
      description,
      url: `${site.url}${webDesignPath}`,
      provider: { "@id": `${site.url}/#organization` },
      areaServed: { "@type": "Country", name: "Panamá" },
    },
    {
      "@type": "ItemList",
      name: "Portafolio de páginas web",
      itemListElement: portfolio.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "WebSite",
          name: p.name,
          url: p.url,
          image: `${site.url}/images/portafolio/${p.slug}.webp`,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
        { "@type": "ListItem", position: 2, name: title, item: `${site.url}${webDesignPath}` },
      ],
    },
  ],
};

export default function WebDesignPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-brand-charcoal">
          <div className="bg-grid absolute inset-0 opacity-70" />
          <HeroCubes />
          <div className="pointer-events-none absolute -top-24 right-[-10%] h-96 w-96 rounded-full bg-brand-green/20 blur-3xl" />

          <div className="relative mx-auto max-w-4xl px-5 py-20 text-center lg:px-8 lg:py-28">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-green/40 bg-brand-green/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-green">
                Diseño web · Hosting · Dominios
              </span>
              <h1 className="font-heading mt-6 text-4xl font-bold leading-tight text-balance text-white sm:text-5xl lg:text-6xl">
                Diseño de páginas web en Panamá que{" "}
                <span className="text-brand-green">trabajan por tu negocio</span>
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/75">
                En SFR Panamá diseñamos y desarrollamos páginas web profesionales,
                rápidas y optimizadas para Google. Cada sitio es responsivo, seguro
                con certificado SSL y está pensado para convertir visitas en
                clientes: botón de WhatsApp, formularios de cotización, catálogos
                de productos y tiendas en línea, con posicionamiento SEO desde el
                primer día.
              </p>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-white/60">
                También nos encargamos de todo el alojamiento: hosting de alto
                rendimiento, registro de dominios .com y .com.pa, correo
                corporativo con tu dominio y almacenamiento en la nube con AWS para
                tus archivos y respaldos. Tu sitio siempre en línea, actualizado y
                protegido, con soporte técnico local en Panamá.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={whatsappLink("Hola, quiero cotizar el diseño de una página web.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-green px-7 py-3.5 text-sm font-bold text-brand-ink shadow-lg shadow-brand-green/20 transition-transform hover:scale-105 hover:bg-brand-green-dark hover:text-white"
                >
                  <MessageCircle size={18} />
                  Cotizar mi página web
                </a>
                <a
                  href="#portafolio"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:border-brand-green hover:text-brand-green"
                >
                  Ver portafolio
                  <ArrowDown size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Qué incluye */}
        <section className="relative overflow-hidden bg-white py-20 lg:py-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
            <div data-parallax="0.25" className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-brand-green/15 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <div data-reveal="up" className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-brand-green-dark">
                Todo incluido
              </p>
              <h2 className="font-heading mt-3 text-3xl font-bold text-brand-ink sm:text-4xl">
                Creación de páginas web y almacenamiento en un solo lugar
              </h2>
            </div>
            <div
              data-reveal-stagger="zoom"
              className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-green/30 hover:shadow-xl"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-light text-brand-green-dark transition-colors group-hover:bg-brand-green group-hover:text-white">
                    <feature.icon size={20} />
                  </span>
                  <h3 className="font-heading mt-4 text-base font-bold text-brand-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-brand-charcoal-light/80">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portafolio */}
        <section
          id="portafolio"
          className="relative overflow-hidden bg-brand-green-light/40 py-20 lg:py-28"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div data-parallax="0.2" className="absolute -right-24 top-20 h-96 w-96 rounded-full bg-brand-green/15 blur-3xl" />
            <div data-parallax="-0.2" className="absolute -left-20 bottom-20 h-80 w-80 rounded-full bg-white/80 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <div data-reveal="up" className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-brand-green-dark">
                Portafolio
              </p>
              <h2 className="font-heading mt-3 text-3xl font-bold text-brand-ink sm:text-4xl">
                Páginas web que hemos creado
              </h2>
              <p className="mt-4 text-base leading-relaxed text-brand-charcoal-light/80">
                Empresas panameñas de aduanas, salud, industria marina, eventos,
                mantenimiento de elevadores, derecho y arquitectura confían en
                nosotros. Pasa el cursor sobre
                cada diseño para recorrerlo y haz clic para visitar el sitio.
              </p>
            </div>
            <div className="mt-14">
              <PortfolioGallery />
            </div>
          </div>
        </section>

        {/* Proceso */}
        <section className="relative overflow-hidden bg-brand-charcoal py-20 lg:py-28">
          <div className="bg-grid absolute inset-0 opacity-40" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div data-parallax="0.3" className="absolute right-[-8rem] top-1/4 h-80 w-80 rounded-full bg-brand-green/15 blur-3xl" />
            <div data-parallax="-0.35" className="absolute left-[8%] top-12 hidden opacity-30 lg:block">
              <div className="cube-float" style={{ "--float": "10s" } as CSSProperties}>
                <div className="cube-3d relative" style={{ "--size": "70px", "--spin": "32s" } as CSSProperties}>
                  {Array.from({ length: 6 }, (_, i) => (
                    <span key={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <div data-reveal="up" className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-green/40 bg-brand-green/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-green">
                Cómo trabajamos
              </span>
              <h2 className="font-heading mt-4 text-3xl font-bold text-white sm:text-4xl">
                De la idea a tu sitio en línea
              </h2>
            </div>
            <ol
              data-reveal-stagger="right"
              className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {steps.map((step, i) => (
                <li
                  key={step.title}
                  className="relative rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur transition-colors hover:border-brand-green/40 hover:bg-white/10"
                >
                  <span className="font-heading text-5xl font-extrabold text-brand-green/30">
                    0{i + 1}
                  </span>
                  <h3 className="font-heading mt-3 text-lg font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
      <WhatsAppFloat />
      <ScrollEffects />
    </>
  );
}
