import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bug,
  CheckCircle2,
  Clock,
  HardDriveDownload,
  Mail,
  MessageCircle,
  Monitor,
  Phone,
  Printer,
  ShieldCheck,
  Wifi,
  Wrench,
  Zap,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ScrollEffects from "@/components/ScrollEffects";
import HeroCubes from "@/components/HeroCubes";
import { remoteSupportPath, site, webDesignPath, whatsappLink } from "@/lib/site";

const title = "Soporte Técnico Remoto en Panamá";
const description =
  "Soporte técnico remoto en Panamá para empresas y hogares: resolvemos fallas de Windows, correo, impresoras, virus y redes en minutos por conexión segura. Atención 24/7 por WhatsApp.";

const whatsappMessage = "Hola, necesito soporte técnico remoto.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "soporte remoto Panama",
    "soporte tecnico remoto Panama",
    "asistencia tecnica remota Panama",
    "soporte tecnico en linea Panama",
    "mesa de ayuda Panama",
    "help desk Panama",
    "soporte informatico empresas Panama",
    "tecnico de computadoras Panama",
  ],
  alternates: { canonical: remoteSupportPath },
  openGraph: {
    title: `${title} | SFR Panamá`,
    description,
    url: remoteSupportPath,
    siteName: site.name,
    locale: "es_PA",
    type: "website",
    images: [
      {
        url: "/images/soporte-remoto/mesa-de-ayuda.webp",
        width: 1200,
        height: 800,
        alt: "Técnica de mesa de ayuda brindando soporte remoto con audífonos",
      },
    ],
  },
};

// Fotos de referencia: Unsplash (licencia de uso libre, incluido uso comercial).
const images = {
  hero: {
    src: "/images/soporte-remoto/mesa-de-ayuda.webp",
    alt: "Técnica de mesa de ayuda atendiendo una solicitud de soporte remoto en Panamá",
  },
  monitors: {
    src: "/images/soporte-remoto/tecnico-monitores.webp",
    alt: "Técnico de SFR Panamá conectado de forma remota a la computadora de un cliente",
  },
  laptop: {
    src: "/images/soporte-remoto/diagnostico-laptop.webp",
    alt: "Diagnóstico remoto de una laptop con herramientas de línea de comandos",
  },
  servers: {
    src: "/images/soporte-remoto/tecnico-servidores.webp",
    alt: "Técnico revisando un rack de servidores durante una visita en sitio",
  },
};

const highlights = [
  { icon: Zap, label: "Conexión en minutos" },
  { icon: Clock, label: "Atención 24/7" },
  { icon: ShieldCheck, label: "Acceso cifrado y autorizado" },
];

const issues = [
  {
    icon: Monitor,
    title: "Windows lento o con errores",
    description: "Optimización, actualizaciones, pantallazos azules y programas que no abren.",
  },
  {
    icon: Mail,
    title: "Correo y Microsoft 365",
    description: "Configuración de Outlook, correo corporativo, OneDrive y Teams.",
  },
  {
    icon: Bug,
    title: "Virus y malware",
    description: "Limpieza, antivirus y revisión de seguridad del equipo.",
  },
  {
    icon: Printer,
    title: "Impresoras y escáneres",
    description: "Instalación de drivers, colas de impresión y equipos en red.",
  },
  {
    icon: Wifi,
    title: "Redes y VPN",
    description: "Conexión a internet, WiFi, VPN y acceso a carpetas compartidas.",
  },
  {
    icon: HardDriveDownload,
    title: "Instalación de software",
    description: "Programas, licencias, contabilidad y aplicaciones de tu negocio.",
  },
  {
    icon: ShieldCheck,
    title: "Respaldos",
    description: "Copias de seguridad en la nube con AWS y recuperación de archivos.",
  },
  {
    icon: Wrench,
    title: "Mantenimiento preventivo",
    description: "Revisiones programadas para evitar fallas antes de que ocurran.",
  },
];

const steps = [
  {
    title: "Contacto",
    description:
      "Nos escribes por WhatsApp, llamas o envías un correo. Registramos tu caso y te asignamos un técnico.",
  },
  {
    title: "Diagnóstico",
    description:
      "Hacemos preguntas rápidas para entender la falla y te confirmamos si se resuelve de forma remota.",
  },
  {
    title: "Conexión segura",
    description:
      "Te guiamos para abrir una sesión cifrada. Solo accedemos con tu autorización y ves todo lo que hacemos.",
  },
  {
    title: "Solución y prueba",
    description:
      "Corregimos el problema y lo probamos contigo en el momento, antes de cerrar la sesión.",
  },
  {
    title: "Reporte y seguimiento",
    description:
      "Recibes un resumen de lo realizado y recomendaciones para que la falla no se repita.",
  },
];

const remoteFaqs = [
  {
    question: "¿Qué es el soporte técnico remoto?",
    answer:
      "Es la asistencia que un técnico brinda conectándose a tu computadora por internet, mediante una sesión segura y autorizada por ti. Permite resolver fallas de software, configuración, correo, impresoras y redes sin esperar una visita presencial.",
  },
  {
    question: "¿Es seguro permitir el acceso remoto a mi computadora?",
    answer:
      "Sí. Usamos herramientas de acceso remoto con conexión cifrada y la sesión solo se abre cuando tú la autorizas con un código de un solo uso. Ves en pantalla todo lo que hace el técnico y puedes terminar la conexión cuando quieras.",
  },
  {
    question: "¿Cuánto tarda la atención de soporte remoto en Panamá?",
    answer:
      "La mayoría de los casos se atienden el mismo día y muchos se resuelven en menos de una hora. Brindamos atención 24/7 para empresas con plan de soporte.",
  },
  {
    question: "¿Qué pasa si el problema no se puede resolver de forma remota?",
    answer:
      "Si la falla es de hardware, cableado o requiere reemplazo de piezas, coordinamos una visita técnica en sitio en la Ciudad de Panamá y alrededores, o gestionamos el equipo de reemplazo.",
  },
  {
    question: "¿Ofrecen planes de soporte remoto mensual para empresas?",
    answer:
      "Sí. Tenemos planes de mesa de ayuda (help desk) con un número de equipos o usuarios cubiertos, mantenimiento preventivo y monitoreo. Contratar soporte TI outsourcing puede costar hasta 50% menos que mantener un equipo interno.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: title,
      serviceType: "Soporte técnico remoto",
      description,
      url: `${site.url}${remoteSupportPath}`,
      image: `${site.url}${images.hero.src}`,
      provider: { "@id": `${site.url}/#organization` },
      areaServed: { "@type": "Country", name: "Panamá" },
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: `${site.url}${remoteSupportPath}`,
        servicePhone: site.phoneE164,
        availableLanguage: "es",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Soporte técnico remoto",
        itemListElement: issues.map((issue) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: issue.title, description: issue.description },
        })),
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: remoteFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
        { "@type": "ListItem", position: 2, name: "Servicios", item: `${site.url}/#servicios` },
        { "@type": "ListItem", position: 3, name: title, item: `${site.url}${remoteSupportPath}` },
      ],
    },
  ],
};

export default function RemoteSupportPage() {
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

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:py-24">
            <div className="animate-fade-up">
              <nav aria-label="Ruta de navegación" className="text-xs font-semibold text-white/50">
                <Link href="/" className="hover:text-brand-green">Inicio</Link>
                <span className="mx-2">/</span>
                <Link href="/#servicios" className="hover:text-brand-green">Servicios</Link>
                <span className="mx-2">/</span>
                <span className="text-white/80">Soporte técnico remoto</span>
              </nav>
              <h1 className="font-heading mt-6 text-4xl font-bold leading-tight text-balance text-white sm:text-5xl">
                Soporte técnico remoto en Panamá,{" "}
                <span className="text-brand-green">sin esperar una visita</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
                Un técnico especializado se conecta de forma segura a tu computadora
                y resuelve el problema mientras tú lo ves en pantalla. Atendemos
                empresas, oficinas y profesionales en todo Panamá con respuesta
                en minutos.
              </p>

              <ul className="mt-7 flex flex-wrap gap-3">
                {highlights.map((item) => (
                  <li
                    key={item.label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85"
                  >
                    <item.icon size={16} className="text-brand-green" />
                    {item.label}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href={whatsappLink(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-green px-7 py-3.5 text-sm font-bold text-brand-ink shadow-lg shadow-brand-green/20 transition-transform hover:scale-105 hover:bg-brand-green-dark hover:text-white"
                >
                  <MessageCircle size={18} />
                  Pedir soporte ahora
                </a>
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:border-brand-green hover:text-brand-green"
                >
                  <Phone size={18} />
                  Llamar {site.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="animate-fade-up relative">
              <div className="absolute -inset-3 rounded-[2rem] bg-brand-green/20 blur-2xl" aria-hidden="true" />
              <Image
                src={images.hero.src}
                alt={images.hero.alt}
                width={1200}
                height={800}
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="relative aspect-[3/2] w-full rounded-3xl object-cover shadow-2xl ring-1 ring-white/10"
              />
              <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-white px-5 py-3.5 shadow-xl sm:left-8">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-75 motion-reduce:hidden" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-brand-green" />
                </span>
                <span className="text-sm font-bold text-brand-ink">Soporte disponible 24/7</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contenido SEO */}
        <section className="relative overflow-hidden bg-white py-20 lg:py-28">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
            <div data-parallax="0.25" className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-brand-green/15 blur-3xl" />
          </div>
          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
            <article data-reveal="up">
              <p className="text-sm font-bold uppercase tracking-widest text-brand-green-dark">
                Asistencia técnica en línea
              </p>
              <h2 className="font-heading mt-3 text-3xl font-bold text-brand-ink sm:text-4xl">
                ¿Qué es el soporte remoto y por qué tu empresa lo necesita?
              </h2>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-brand-charcoal-light/85">
                <p>
                  El <strong className="text-brand-ink">soporte técnico remoto</strong> es
                  la forma más rápida de resolver problemas informáticos: en lugar de
                  esperar a que un técnico llegue a tu oficina, nos conectamos a tu
                  computadora por internet mediante una sesión cifrada que solo se abre
                  con tu autorización. Así atendemos fallas de Windows, correo, Microsoft
                  365, impresoras, antivirus y programas en minutos, desde cualquier
                  lugar de Panamá.
                </p>
                <p>
                  Para las pequeñas y medianas empresas, cada hora con un equipo detenido
                  es dinero perdido. Nuestra <strong className="text-brand-ink">mesa de
                  ayuda en Panamá</strong> reduce ese tiempo de inactividad: tus
                  colaboradores reportan la falla por WhatsApp o teléfono, el técnico se
                  conecta y la mayoría de los casos queda resuelta el mismo día, sin
                  costos de traslado y sin interrumpir al resto del equipo.
                </p>
                <p>
                  La seguridad es parte del servicio. Utilizamos herramientas de acceso
                  remoto reconocidas, con códigos de un solo uso y cifrado de extremo a
                  extremo. Ves en pantalla todo lo que hacemos, puedes cerrar la sesión
                  en cualquier momento y al terminar recibes un reporte con los cambios
                  realizados y nuestras recomendaciones.
                </p>
                <p>
                  Cuando el problema requiere manos en el equipo —un disco dañado,
                  cableado de red o un servidor— coordinamos una visita en sitio. Con más
                  de 15 años de experiencia en{" "}
                  <Link href="/#servicios" className="font-semibold text-brand-green-dark underline-offset-4 hover:underline">
                    soporte TI outsourcing
                  </Link>
                  , combinamos atención remota y presencial para que tu operación nunca
                  se detenga. Y si además necesitas presencia en internet, también{" "}
                  <Link href={webDesignPath} className="font-semibold text-brand-green-dark underline-offset-4 hover:underline">
                    diseñamos páginas web
                  </Link>
                  .
                </p>
              </div>
            </article>

            <div data-reveal="zoom" className="relative grid grid-cols-5 gap-4">
              <Image
                src={images.monitors.src}
                alt={images.monitors.alt}
                width={1200}
                height={800}
                loading="lazy"
                sizes="(min-width: 1024px) 380px, 60vw"
                className="col-span-3 aspect-[3/4] h-full w-full rounded-3xl object-cover shadow-xl"
              />
              <div className="col-span-2 flex flex-col gap-4">
                <Image
                  src={images.laptop.src}
                  alt={images.laptop.alt}
                  width={1200}
                  height={800}
                  loading="lazy"
                  sizes="(min-width: 1024px) 250px, 40vw"
                  className="aspect-square w-full rounded-3xl object-cover shadow-xl"
                />
                <div className="flex flex-1 flex-col justify-center rounded-3xl bg-brand-charcoal p-5 text-white">
                  <span className="font-heading text-3xl font-extrabold text-brand-green sm:text-4xl">
                    +15
                  </span>
                  <span className="mt-1 text-sm leading-snug text-white/70">
                    años resolviendo fallas TI en Panamá
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Qué resolvemos */}
        <section className="relative overflow-hidden bg-brand-green-light/40 py-20 lg:py-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div data-parallax="0.2" className="absolute -left-24 top-20 h-96 w-96 rounded-full bg-brand-green/15 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <div data-reveal="up" className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-brand-green-dark">
                Lo que resolvemos a distancia
              </p>
              <h2 className="font-heading mt-3 text-3xl font-bold text-brand-ink sm:text-4xl">
                Servicios de soporte remoto para empresas
              </h2>
            </div>
            <div
              data-reveal-stagger="zoom"
              className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {issues.map((issue) => (
                <div
                  key={issue.title}
                  className="group rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-green/30 hover:shadow-xl"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-light text-brand-green-dark transition-colors group-hover:bg-brand-green group-hover:text-white">
                    <issue.icon size={20} />
                  </span>
                  <h3 className="font-heading mt-4 text-base font-bold text-brand-ink">
                    {issue.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-brand-charcoal-light/80">
                    {issue.description}
                  </p>
                </div>
              ))}
            </div>
            <p data-reveal="up" className="mt-10 text-center text-sm font-semibold text-brand-charcoal">
              ¿No ves tu problema en la lista?{" "}
              <a
                href={whatsappLink("Hola, tengo un problema técnico y quiero saber si lo pueden resolver de forma remota.")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-green-dark underline underline-offset-4"
              >
                Escríbenos y te decimos en minutos si lo resolvemos a distancia.
              </a>
            </p>
          </div>
        </section>

        {/* Proceso de servicio */}
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
                Proceso de servicio
              </span>
              <h2 className="font-heading mt-4 text-3xl font-bold text-white sm:text-4xl">
                Cómo funciona nuestro soporte remoto
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/60">
                Cinco pasos claros, desde que nos contactas hasta que tu equipo vuelve
                a funcionar.
              </p>
            </div>
            <ol
              data-reveal-stagger="right"
              className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5"
            >
              {steps.map((step, i) => (
                <li
                  key={step.title}
                  className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-colors hover:border-brand-green/40 hover:bg-white/10"
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

        {/* Enganche de contacto */}
        <section className="relative overflow-hidden bg-white py-20 lg:py-24">
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <div
              data-reveal="zoom"
              className="relative grid overflow-hidden rounded-[2rem] bg-brand-ink lg:grid-cols-2"
            >
              <Image
                src={images.servers.src}
                alt={images.servers.alt}
                width={1200}
                height={800}
                loading="lazy"
                sizes="(min-width: 1024px) 640px, 100vw"
                className="aspect-[16/10] h-full w-full object-cover lg:aspect-auto"
              />
              <div className="relative p-8 sm:p-12">
                <div className="bg-grid absolute inset-0 opacity-30" aria-hidden="true" />
                <div className="relative">
                  <h2 className="font-heading text-2xl font-bold leading-snug text-white sm:text-3xl">
                    ¿Tu computadora falló justo ahora?
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-white/70">
                    No pierdas el día. Cuéntanos qué pasa y un técnico te responde en
                    minutos. Si no se puede resolver a distancia, te lo decimos de
                    inmediato y agendamos la visita.
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {[
                      "Primera consulta gratuita",
                      "Respuesta el mismo día",
                      "Planes mensuales para empresas",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm font-semibold text-white/85">
                        <CheckCircle2 size={18} className="shrink-0 text-brand-green" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <a
                      href={whatsappLink(whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-6 py-3 text-sm font-bold text-brand-ink transition-transform hover:scale-105"
                    >
                      <MessageCircle size={18} />
                      WhatsApp
                    </a>
                    <a
                      href={site.phoneHref}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-brand-green hover:text-brand-green"
                    >
                      <Phone size={18} />
                      {site.phoneDisplay}
                    </a>
                    <a
                      href={`mailto:${site.email}?subject=${encodeURIComponent("Solicitud de soporte remoto")}`}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-brand-green hover:text-brand-green"
                    >
                      <Mail size={18} />
                      Correo
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FAQ items={remoteFaqs} title="Preguntas sobre soporte técnico remoto" />

        <CTA />
      </main>
      <Footer />
      <WhatsAppFloat />
      <ScrollEffects />
    </>
  );
}
