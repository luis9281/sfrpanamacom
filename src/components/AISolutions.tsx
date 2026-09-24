import {
  Bot,
  Workflow,
  LineChart,
  Sparkles,
  Plug,
  ShieldAlert,
  MessageCircle,
} from "lucide-react";
import type { CSSProperties } from "react";
import { whatsappLink } from "@/lib/site";

export const solutions = [
  {
    icon: Bot,
    title: "Agentes y Chatbots con IA",
    description:
      "Asistentes virtuales para WhatsApp, sitio web y aplicaciones que atienden a tus clientes 24/7.",
  },
  {
    icon: Workflow,
    title: "Automatización de Procesos (RPA + IA)",
    description:
      "Automatiza facturación, reportes y tareas repetitivas para que tu equipo se enfoque en lo importante.",
  },
  {
    icon: LineChart,
    title: "Análisis Predictivo e Inteligencia de Negocio",
    description:
      "Dashboards y predicción de demanda para tomar decisiones basadas en datos reales.",
  },
  {
    icon: Sparkles,
    title: "Generación de Contenido con IA",
    description:
      "Creación automatizada de contenido con ChatGPT y Claude para tu marketing y comunicación.",
  },
  {
    icon: Plug,
    title: "Integración de IA en Sistemas",
    description:
      "Conectamos IA a tu CRM, ERP y WhatsApp Business para potenciar tus procesos actuales.",
  },
  {
    icon: ShieldAlert,
    title: "Ciberseguridad Inteligente con IA",
    description:
      "Detección de amenazas en tiempo real para proteger tu operación de forma proactiva.",
  },
];

export default function AISolutions() {
  return (
    <section id="ia" className="relative overflow-hidden bg-brand-charcoal py-20 lg:py-28">
      <div className="bg-grid absolute inset-0 opacity-40" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div data-parallax="0.3" className="absolute right-[-8rem] top-1/3 h-80 w-80 rounded-full bg-brand-green/15 blur-3xl" />
        <div data-parallax="-0.25" className="absolute left-[-6rem] top-10 h-72 w-72 rounded-full bg-brand-green/10 blur-3xl" />
        <div data-parallax="-0.35" className="absolute right-[8%] top-16 hidden opacity-30 lg:block">
          <div className="cube-float" style={{ "--float": "9s" } as CSSProperties}>
            <div className="cube-3d relative" style={{ "--size": "90px", "--spin": "36s" } as CSSProperties}>
              {Array.from({ length: 6 }, (_, i) => (
                <span key={i} />
              ))}
            </div>
          </div>
        </div>
        <div data-parallax="0.4" className="absolute bottom-24 left-[6%] hidden opacity-25 lg:block">
          <div className="cube-float" style={{ "--float": "11s" } as CSSProperties}>
            <div className="cube-3d relative" style={{ "--size": "56px", "--spin": "28s" } as CSSProperties}>
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
            Nuevas soluciones
          </span>
          <h2 className="font-heading mt-4 text-3xl font-bold text-white sm:text-4xl">
            Inteligencia artificial para empresas en Panamá
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            Empresas que implementan nuestras soluciones de IA logran hasta un{" "}
            <span className="font-bold text-brand-green">
              40% de reducción en costos operativos
            </span>{" "}
            y duplican su velocidad de respuesta al cliente.
          </p>
        </div>

        <div
          data-reveal-stagger="zoom"
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {solutions.map((solution) => (
            <div
              key={solution.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur transition-colors hover:border-brand-green/40 hover:bg-white/10"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/15 text-brand-green">
                <solution.icon size={22} />
              </span>
              <h3 className="font-heading mt-5 text-lg font-bold text-white">
                {solution.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {solution.description}
              </p>
            </div>
          ))}
        </div>

        <div data-reveal="up" className="mt-14 flex justify-center">
          <a
            href={whatsappLink("Hola, quiero conocer más sobre las soluciones de IA para mi empresa.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand-green px-7 py-3.5 text-sm font-bold text-brand-ink shadow-lg shadow-brand-green/20 transition-transform hover:scale-105 hover:bg-brand-green-dark hover:text-white"
          >
            <MessageCircle size={18} />
            Quiero implementar IA en mi empresa
          </a>
        </div>
      </div>
    </section>
  );
}
