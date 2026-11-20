import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, CalendarCheck, CheckCircle2, ChevronDown, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ScrollEffects from "@/components/ScrollEffects";
import HeroCubes from "@/components/HeroCubes";
import ConsultingQuiz from "@/components/ConsultingQuiz";
import ConsultingFunctions from "@/components/ConsultingFunctions";
import { consultingFunctions } from "@/lib/consulting";
import { consultingPath, remoteSupportPath, site, whatsappLink } from "@/lib/site";
import { contactPath } from "@/lib/contact";

const title = "Consultoría de Sistemas en Panamá";
const description =
  "Consultoría de sistemas en Panamá explicada fácil: revisamos la tecnología de tu empresa y te damos un plan claro para trabajar más rápido, más seguro y sin gastar de más. Primera consulta gratis.";

const formHref = `${contactPath}?tipo=consulta&servicio=consultoria-de-sistemas`;
const whatsappMessage = "Hola SFR, quiero una consulta de sistemas para mi empresa. Lo que necesito resolver es: ";

// Fotos provisionales: se reemplazan subiendo un archivo con el mismo nombre.
const images = {
  team: {
    src: "/images/consultoria/equipo-de-trabajo.webp",
    width: 1200,
    height: 900,
    alt: "Equipo de trabajo revisando reportes en laptops y tablets durante una consultoría",
  },
  review: {
    src: "/images/consultoria/revision-de-equipos.webp",
    width: 640,
    height: 800,
    alt: "Revisión de una laptop conectada a varios monitores durante una consultoría de sistemas",
  },
};

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "consultoria de sistemas Panama",
    "consultoria TI Panama",
    "consultoria informatica Panama",
    "asesoria tecnologica empresas Panama",
    "auditoria de sistemas Panama",
    "plan tecnologico pymes",
  ],
  alternates: { canonical: consultingPath },
  openGraph: {
    title: `${title} | SFR Panamá`,
    description,
    url: consultingPath,
    siteName: site.name,
    locale: "es_PA",
    type: "website",
    images: [{ url: images.team.src, width: images.team.width, height: images.team.height, alt: images.team.alt }],
  },
};

const highlights = ["Primera consulta gratis", "Sin palabras complicadas", "Más de 15 años de experiencia"];

const steps = [
  {
    title: "Conversamos",
    simple: "Nos cuentas cómo trabaja tu empresa y qué te molesta en el día a día. Es una conversación, no un examen, y es gratis.",
    detail: "Entendemos tus objetivos, tu presupuesto y las herramientas que ya usas.",
  },
  {
    title: "Revisamos",
    simple: "Vemos tus computadoras, tu red, tus programas y cómo guardas la información, en tu oficina o a distancia.",
    detail: "Hacemos un inventario de equipos, licencias, accesos y respaldos, y medimos el estado de la red.",
  },
  {
    title: "Te explicamos el plan",
    simple: "Te entregamos un informe sencillo: qué urge, qué puede esperar y cuánto cuesta cada cosa.",
    detail: "Ordenamos cada mejora por impacto, riesgo y costo para que decidas con información clara.",
  },
  {
    title: "Lo ponemos en marcha",
    simple: "Si estás de acuerdo, hacemos los cambios por etapas, sin detener el trabajo de tu equipo.",
    detail: "Programamos los cambios en horarios que no afecten tu operación y probamos cada uno.",
  },
  {
    title: "Te acompañamos",
    simple: "Revisamos que todo siga funcionando bien y ajustamos lo que haga falta.",
    detail: "Seguimiento periódico, soporte técnico y recomendaciones a medida que tu empresa crece.",
  },
];

const consultingFaqs = [
  {
    question: "¿Necesito saber de tecnología para contratar una consultoría?",
    answer:
      "No. Tú nos cuentas cómo trabajas y qué problemas tienes; nosotros nos encargamos de la parte técnica y te explicamos todo con palabras sencillas.",
  },
  {
    question: "¿Mi empresa es muy pequeña para una consultoría de sistemas?",
    answer:
      "No. Trabajamos con pequeñas y medianas empresas en Panamá. Justamente en las empresas pequeñas un buen plan evita gastos innecesarios y pérdidas de información.",
  },
  {
    question: "¿Tengo que comprar equipos o programas nuevos?",
    answer:
      "No necesariamente. Primero revisamos lo que ya tienes; muchas veces la mejor solución es aprovecharlo mejor. Si algo hay que cambiar, te explicamos por qué y te damos opciones.",
  },
  {
    question: "¿Cuánto cuesta la consultoría de sistemas?",
    answer:
      "La primera consulta es gratuita. Después de conocer tu empresa te enviamos una propuesta con el costo antes de empezar, sin compromiso.",
  },
  {
    question: "¿Qué recibo al final de la consultoría?",
    answer:
      "Un informe claro con lo que encontramos y un plan paso a paso, ordenado por importancia y presupuesto. Si quieres, también lo ponemos en marcha contigo.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: title,
      serviceType: "Consultoría de sistemas",
      description,
      url: `${site.url}${consultingPath}`,
      image: `${site.url}${images.team.src}`,
      provider: { "@id": `${site.url}/#organization` },
      areaServed: { "@type": "Country", name: "Panamá" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Consultoría de sistemas",
        itemListElement: consultingFunctions.map((f) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: f.title, description: f.technical },
        })),
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: consultingFaqs.map((faq) => ({
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
        { "@type": "ListItem", position: 3, name: title, item: `${site.url}${consultingPath}` },
      ],
    },
  ],
};

const primaryBtn =
  "inline-flex items-center gap-2 rounded-full bg-brand-green px-7 py-3.5 text-sm font-bold text-brand-ink shadow-lg shadow-brand-green/20 transition-transform hover:scale-105 hover:bg-brand-green-dark hover:text-white";
const outlineBtn =
  "inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:border-brand-green hover:text-brand-green";

export default function ConsultingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-brand-charcoal">
          <div className="bg-grid absolute inset-0 opacity-70" />
          <HeroCubes />
          <div className="pointer-events-none absolute -top-24 right-[-10%] h-96 w-96 rounded-full bg-brand-green/20 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:py-24">
            <div className="animate-fade-up" data-track="consultoria-hero">
              <nav aria-label="Ruta de navegación" className="text-xs font-semibold text-white/50">
                <Link href="/" className="hover:text-brand-green">Inicio</Link>
                <span className="mx-2">/</span>
                <Link href="/#servicios" className="hover:text-brand-green">Servicios</Link>
                <span className="mx-2">/</span>
                <span className="text-white/80">Consultoría de sistemas</span>
              </nav>
              <h1 className="font-heading mt-6 text-4xl font-bold leading-tight text-balance text-white sm:text-5xl">
                Consultoría de sistemas en Panamá:{" "}
                <span className="text-brand-green">tecnología clara para tu empresa</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
                Revisamos cómo funciona la tecnología de tu negocio y te decimos, sin
                palabras complicadas, qué mejorar primero para trabajar más rápido, más
                seguro y sin gastar de más.
              </p>

              <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                {highlights.map((item) => (
                  <li key={item} className="inline-flex items-center gap-2 text-sm font-semibold text-white/85">
                    <CheckCircle2 size={17} className="text-brand-green" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link href={formHref} className={primaryBtn}>
                  <CalendarCheck size={18} />
                  Agenda tu consulta gratis
                </Link>
                <a href={whatsappLink(whatsappMessage)} target="_blank" rel="noopener noreferrer" className={outlineBtn}>
                  <MessageCircle size={18} />
                  Escríbenos por WhatsApp
                </a>
              </div>

              <a
                href="#autodiagnostico"
                className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-white/70 underline-offset-4 transition-colors hover:text-brand-green hover:underline"
              >
                ¿No sabes si la necesitas? Haz el test de 1 minuto
                <ArrowDown size={16} />
              </a>
            </div>

            <div className="animate-fade-up relative">
              <Image
                src={images.team.src}
                alt={images.team.alt}
                width={images.team.width}
                height={images.team.height}
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
              />
            </div>
          </div>
        </section>

        {/* Explicación sencilla */}
        <section className="relative overflow-hidden bg-white py-20 lg:py-28">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          </div>
          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[1.15fr_1fr] lg:px-8">
            <article data-reveal="up">
              <h2 className="font-heading text-3xl font-bold text-balance text-brand-ink sm:text-4xl">
                ¿Qué es la consultoría de sistemas? Te lo explicamos fácil
              </h2>
              <div className="mt-7 max-w-[65ch] space-y-5 text-lg leading-relaxed text-brand-charcoal-light">
                <p>
                  Piensa en ella como una <strong className="text-brand-ink">revisión médica, pero
                  para la tecnología de tu empresa</strong>. Revisamos tus computadoras, tu
                  internet, tus programas y la forma en que guardas la información, y te
                  decimos qué está bien, qué está mal y qué conviene arreglar primero.
                </p>
                <p>
                  <strong className="text-brand-ink">No necesitas saber de tecnología.</strong>{" "}
                  Tú nos cuentas qué te molesta en el día a día: que todo va lento, que se
                  cae el internet, que no encuentras un archivo o que pagas cosas que no
                  sabes para qué sirven. Nosotros nos encargamos de la parte técnica.
                </p>
                <p>
                  Al final te entregamos <strong className="text-brand-ink">un plan claro, paso a
                  paso</strong>, ordenado por importancia y por presupuesto. Así sabes en qué
                  vale la pena invertir y en qué no gastar. Muchas veces la mejor solución
                  es aprovechar mejor lo que ya tienes, no comprar algo nuevo.
                </p>
                <p>
                  Y no te dejamos solo con el plan: si quieres, lo ponemos en marcha contigo
                  y te acompañamos después. Llevamos <strong className="text-brand-ink">más de 15
                  años</strong> ayudando a pequeñas y medianas empresas en Panamá a trabajar
                  con una tecnología más segura, más rápida y sin gastar de más.
                </p>
              </div>
            </article>

            <figure data-reveal="zoom" className="relative">
              <Image
                src={images.review.src}
                alt={images.review.alt}
                width={images.review.width}
                height={images.review.height}
                loading="lazy"
                sizes="(min-width: 1024px) 520px, 100vw"
                className="aspect-[4/5] w-full rounded-3xl object-cover shadow-[0_24px_50px_-20px_rgba(23,26,27,0.45)]"
              />
              <figcaption className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/95 px-5 py-4 text-sm leading-snug text-brand-charcoal shadow-lg backdrop-blur sm:inset-x-6 sm:bottom-6">
                <strong className="block font-heading text-base text-brand-ink">
                  Revisamos en tu oficina o a distancia
                </strong>
                Lo que se pueda resolver de forma remota, lo hacemos sin que tengas que esperar
                una visita.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Autodiagnóstico */}
        <section id="autodiagnostico" className="relative scroll-mt-24 overflow-hidden bg-brand-green-light/50 py-20 lg:py-28">
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[1fr_1.25fr] lg:px-8">
            <div data-reveal="up">
              <h2 className="font-heading text-3xl font-bold text-balance text-brand-ink sm:text-4xl">
                ¿Tu empresa necesita una consultoría? Descúbrelo en 1 minuto
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-brand-charcoal-light">
                Responde 5 preguntas sencillas sobre tu día a día. Al final te decimos qué
                tan urgente es y puedes enviarnos el resultado por WhatsApp para que te
                orientemos gratis.
              </p>
              <p className="mt-4 text-sm font-semibold text-brand-charcoal-light">
                No guardamos tus respuestas: solo las ves tú, a menos que decidas enviarlas.
              </p>
            </div>
            <div data-reveal="zoom">
              <ConsultingQuiz />
            </div>
          </div>
        </section>

        {/* Funciones */}
        <section className="relative overflow-hidden bg-white py-20 lg:py-28">
          <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
            <div data-reveal="up" className="mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-3xl font-bold text-balance text-brand-ink sm:text-4xl">
                Lo que hace la consultoría por tu empresa
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-brand-charcoal-light">
                Elige cómo prefieres leerlo: en palabras de todos los días o con los
                términos técnicos.
              </p>
            </div>
            <div data-reveal="up" className="mt-10">
              <ConsultingFunctions />
            </div>
          </div>
        </section>

        {/* Pasos */}
        <section className="relative overflow-hidden bg-brand-charcoal py-20 lg:py-28">
          <div className="bg-grid absolute inset-0 opacity-40" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_1.4fr] lg:px-8">
            <div data-reveal="up" className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="font-heading text-3xl font-bold text-balance text-white sm:text-4xl">
                Cómo trabajamos contigo, paso a paso
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-white/70">
                Cinco pasos simples. Toca cada uno para ver qué hacemos por dentro.
              </p>
              <Link href={formHref} className={`${primaryBtn} mt-8`}>
                <CalendarCheck size={18} />
                Empezar con la consulta gratis
              </Link>
            </div>

            <ol data-reveal-stagger="up" className="space-y-3">
              {steps.map((step, i) => (
                <li key={step.title}>
                  <details
                    className="step-item group rounded-2xl border border-white/10 bg-white/[0.04] transition-colors open:border-brand-green/40 open:bg-white/[0.07] hover:border-white/25"
                    open={i === 0}
                  >
                    <summary className="flex cursor-pointer items-start gap-5 p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-green/50 font-heading text-base font-bold tabular-nums text-brand-green group-open:bg-brand-green group-open:text-brand-ink">
                        {i + 1}
                      </span>
                      <span className="flex-1">
                        <span className="font-heading block text-lg font-bold text-white">{step.title}</span>
                        <span className="mt-1.5 block text-base leading-relaxed text-white/70">{step.simple}</span>
                      </span>
                      <ChevronDown size={20} className="step-chevron mt-2 shrink-0 text-white/50 transition-transform duration-300" />
                    </summary>
                    <p className="ml-[4.75rem] mr-6 border-t border-white/10 pt-4 pb-6 text-sm leading-relaxed text-white/75">
                      <span className="font-bold text-brand-green">Por dentro: </span>
                      {step.detail}
                    </p>
                  </details>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Cierre */}
        <section className="bg-white py-20 lg:py-24">
          <div
            data-reveal="up"
            data-track="consultoria-cierre"
            className="mx-auto max-w-3xl px-5 text-center lg:px-8"
          >
            <h2 className="font-heading text-3xl font-bold text-balance text-brand-ink sm:text-4xl">
              La primera conversación es gratis y sin compromiso
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-brand-charcoal-light">
              Cuéntanos qué te preocupa de tu tecnología. Te respondemos con una
              recomendación clara, aunque decidas no contratarnos. ¿Algo dejó de
              funcionar hoy? Para eso tenemos{" "}
              <Link href={remoteSupportPath} className="font-semibold text-brand-green-dark underline underline-offset-4">
                soporte técnico remoto
              </Link>
              .
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link href={formHref} className={primaryBtn}>
                <CalendarCheck size={18} />
                Agenda tu consulta gratis
              </Link>
              <a
                href={whatsappLink(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-brand-ink/15 px-7 py-3.5 text-sm font-bold text-brand-ink transition-colors hover:border-brand-green-dark hover:text-brand-green-dark"
              >
                <MessageCircle size={18} />
                Escríbenos por WhatsApp
              </a>
            </div>
          </div>
        </section>

        <FAQ items={consultingFaqs} title="Preguntas sobre la consultoría de sistemas" />

        <CTA />
      </main>
      <Footer />
      <WhatsAppFloat />
      <ScrollEffects />
    </>
  );
}
