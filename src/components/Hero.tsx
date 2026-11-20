import Link from "next/link";
import { ArrowRight, Check, FileText, Globe, Mail, MessageCircle, Server, type LucideIcon } from "lucide-react";
import { webDesignPath, whatsappLink } from "@/lib/site";
import { contactPath } from "@/lib/contact";
import HeroCubes from "@/components/HeroCubes";
import HeroOrbit from "@/components/HeroOrbit";
import HeroCarousel from "@/components/HeroCarousel";

type Action = {
  /** Identifica el slide en Google Analytics (ver Analytics.tsx) */
  track: string;
  cta: { label: string; href: string };
  /** Mensaje de WhatsApp: termina abierto para que el cliente complete su necesidad */
  whatsapp: string;
  perks?: string[];
  more?: { label: string; href: string };
};

type PhotoSlide = Action & {
  label: string;
  eyebrow: string;
  title: string;
  text: string;
  chips?: { icon: LucideIcon; label: string }[];
  image: string;
  alt: string;
};

const mainAction: Action = {
  track: "hero-soluciones-ti",
  cta: { label: "Solicita tu cotización", href: `${contactPath}?tipo=cotizacion` },
  whatsapp: "Hola SFR, quiero una cotización de servicios TI. Lo que necesito es: ",
  perks: ["Primera consulta gratis", "Soporte 24/7"],
  more: { label: "Ver todos los servicios", href: "#servicios" },
};

const photoSlides: PhotoSlide[] = [
  {
    track: "hero-paginas-web",
    label: "Páginas web",
    eyebrow: "Diseño web en Panamá",
    title: "Páginas web que convierten visitas en clientes",
    text: "¿Tus clientes te buscan en Google y no te encuentran? Diseñamos tu sitio rápido, seguro y listo para celulares.",
    image: "/images/hero/paginas-web",
    alt: "Laptop y monitor mostrando el diseño de un sitio web",
    cta: { label: "Cotiza tu página web", href: `${contactPath}?tipo=cotizacion&servicio=diseno-y-desarrollo-web` },
    whatsapp: "Hola SFR, quiero cotizar una página web. Mi negocio se dedica a: ",
    perks: ["Certificado SSL", "Dominio .com.pa", "Optimizada para móviles"],
    more: { label: "Mira sitios que ya hicimos", href: `${webDesignPath}#portafolio` },
  },
  {
    track: "hero-consultoria-it",
    label: "Consultoría IT",
    eyebrow: "Consultoría IT",
    title: "Tecnología que trabaja para tu empresa",
    text: "¿Equipos lentos, caídas de red o dudas sobre seguridad? Te decimos qué resolver primero, con más de 15 años de experiencia.",
    image: "/images/hero/consultoria-it",
    alt: "Equipo de trabajo revisando reportes en laptops y tablets",
    cta: { label: "Agenda tu consulta gratis", href: `${contactPath}?tipo=consulta&servicio=consultoria-de-sistemas` },
    whatsapp: "Hola SFR, quiero una consulta de TI para mi empresa. Lo que necesito resolver es: ",
    perks: ["Primera consulta gratis", "Soporte 24/7", "Seguridad informática"],
  },
  {
    track: "hero-hosting",
    label: "Hosting, dominios y correos",
    eyebrow: "Hosting · Dominios · Correos",
    title: "Tu presencia en línea, en un solo lugar",
    text: "Dominio, hosting y correo con el nombre de tu empresa. Nosotros lo configuramos todo por ti.",
    chips: [
      { icon: Server, label: "Hosting" },
      { icon: Globe, label: "Dominios .com y .com.pa" },
      { icon: Mail, label: "Correo corporativo" },
    ],
    image: "/images/hero/hosting",
    alt: "Racks de servidores iluminados en un centro de datos",
    cta: { label: "Cotiza tu plan", href: `${contactPath}?tipo=cotizacion&servicio=hosting-y-servidores` },
    whatsapp: "Hola SFR, quiero cotizar hosting, dominio y correo corporativo. Mi dominio (o el que quiero) es: ",
  },
];

const primaryBtn =
  "inline-flex items-center gap-2 rounded-full bg-brand-green px-7 py-3.5 text-sm font-bold text-brand-ink shadow-lg shadow-brand-green/20 transition-transform hover:scale-105 hover:bg-brand-green-dark hover:text-white";
const whatsappBtn =
  "inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:border-brand-green hover:text-brand-green";

function Actions({ track, cta, whatsapp, perks, more }: Action) {
  return (
    <div data-track={track}>
      <div className="hero-anim mt-10 flex flex-wrap items-center gap-4">
        <Link href={cta.href} className={primaryBtn}>
          <FileText size={18} />
          {cta.label}
        </Link>
        <a href={whatsappLink(whatsapp)} target="_blank" rel="noopener noreferrer" className={whatsappBtn}>
          <MessageCircle size={18} />
          <span>
            <span className="hidden sm:inline">Escríbenos por </span>WhatsApp
          </span>
        </a>
      </div>

      {(perks || more) && (
        <div className="hero-anim mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          {perks?.map((perk) => (
            <span key={perk} className="inline-flex items-center gap-1.5 font-medium text-white/70">
              <Check size={16} className="text-brand-green" />
              {perk}
            </span>
          ))}
          {more && (
            <Link
              href={more.href}
              className="inline-flex items-center gap-1.5 font-bold text-white/70 underline-offset-4 transition-colors hover:text-brand-green hover:underline"
            >
              {more.label}
              <ArrowRight size={16} />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

function MainSlide() {
  return (
    <div className="relative mx-auto grid h-full max-w-7xl gap-12 px-5 pt-20 pb-28 lg:grid-cols-2 lg:items-center lg:px-8 lg:pt-28 lg:pb-32">
      <div>
        <span className="hero-anim inline-flex items-center gap-2 rounded-full border border-brand-green/40 bg-brand-green/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-green">
          Más de 15 años impulsando empresas en Panamá
        </span>

        <h1 className="font-heading mt-6 text-4xl font-bold leading-tight text-balance text-white sm:text-5xl lg:text-6xl">
          Soluciones TI en Panamá que tu{" "}
          <span className="text-brand-green">empresa merece</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
          Soporte técnico outsourcing, consultoría TI, cloud AWS,
          inteligencia artificial, desarrollo web y ciberseguridad para
          pequeñas y medianas empresas en Panamá. No vendemos servicios,
          entregamos soluciones reales.
        </p>

        <Actions {...mainAction} />
      </div>

      <HeroOrbit />
    </div>
  );
}

function Photo({ slide }: { slide: PhotoSlide }) {
  return (
    <div className="relative grid h-full lg:grid-cols-2">
      <div className="relative order-first aspect-[16/9] overflow-hidden sm:aspect-[2/1] lg:order-last lg:aspect-auto">
        {/* <img> con srcSet: el sitio es export estático sin optimizador de imágenes */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${slide.image}-1600.webp`}
          srcSet={`${slide.image}-800.webp 800w, ${slide.image}-1600.webp 1600w`}
          sizes="(min-width: 1024px) 50vw, 100vw"
          width={1600}
          height={1200}
          alt={slide.alt}
          loading="lazy"
          decoding="async"
          className="hero-photo absolute inset-0 h-full w-full object-cover"
        />
        {/* Funde la foto con el fondo para que no quede un corte duro */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-transparent lg:bg-gradient-to-r lg:from-brand-charcoal lg:via-transparent lg:via-25%" />
      </div>

      {/* En escritorio el texto se alinea con el contenedor de 80rem del resto del sitio */}
      <div className="flex items-center px-5 pt-6 pb-28 sm:pt-10 lg:py-28 lg:pr-12 lg:pb-32 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
        <div className="w-full max-w-xl">
          <p className="hero-anim text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
            {slide.eyebrow}
          </p>
          <h2 className="font-heading mt-5 text-4xl font-bold leading-tight text-balance text-white sm:text-5xl lg:text-6xl">
            {slide.title}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">{slide.text}</p>
          {slide.chips && (
            <ul className="mt-6 flex flex-wrap gap-3">
              {slide.chips.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/85"
                >
                  <Icon size={16} className="text-brand-green" />
                  {label}
                </li>
              ))}
            </ul>
          )}
          <Actions {...slide} />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-brand-charcoal">
      <div className="bg-grid absolute inset-0 opacity-70" />
      <HeroCubes />
      <div className="pointer-events-none absolute -top-24 right-[-10%] h-96 w-96 rounded-full bg-brand-green/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-6rem] left-[-6rem] h-72 w-72 rounded-full bg-brand-green/10 blur-3xl" />

      <HeroCarousel labels={["Soluciones TI", ...photoSlides.map((s) => s.label)]}>
        <MainSlide />
        {photoSlides.map((slide) => (
          <Photo key={slide.label} slide={slide} />
        ))}
      </HeroCarousel>
    </section>
  );
}
