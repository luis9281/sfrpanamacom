import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const reasons = [
  {
    title: "15+ años de experiencia",
    description: "Trayectoria comprobada apoyando pymes en Panamá.",
  },
  {
    title: "Soporte 24/7",
    description: "Tu operación TI nunca se detiene, ni siquiera un momento.",
  },
  {
    title: "Ahorro de hasta 60%",
    description: "Reduce costos de infraestructura migrando a AWS.",
  },
  {
    title: "Hasta 50% menos costo",
    description: "Frente a mantener un equipo de TI interno.",
  },
];

const values = [
  "Confianza",
  "Responsabilidad",
  "Conocimiento",
  "Soporte TI",
  "Cloud AWS",
  "Inteligencia Artificial",
  "Ciberseguridad",
  "Desarrollo Web",
  "Outsourcing TI",
];

export default function WhyUs() {
  return (
    <section id="nosotros" className="bg-brand-green-light/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-brand-green-dark">
              Nosotros
            </p>
            <h2 className="font-heading mt-3 text-3xl font-bold text-brand-ink sm:text-4xl">
              No vendemos servicios, entregamos soluciones reales
            </h2>
            <p className="mt-5 text-base leading-relaxed text-brand-charcoal-light/80">
              En System FR Panamá llevamos más de 15 años ayudando a pequeñas
              y medianas empresas a resolver sus retos tecnológicos. Nuestro
              equipo de técnicos especializados trabaja en mantenimiento,
              reparaciones, servidores, seguridad, Windows, Linux y cableado
              estructurado, siempre enfocados en la continuidad de tu
              operación.
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {values.map((value) => (
                <span
                  key={value}
                  className="rounded-full border border-brand-green/30 bg-white px-4 py-1.5 text-xs font-bold text-brand-charcoal"
                >
                  {value}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-black/5 bg-white p-10 shadow-xl">
              <Image
                src="/images/logo-full.jpg"
                alt="System FR Panamá"
                width={640}
                height={533}
                className="mx-auto h-auto w-full max-w-sm"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <CheckCircle2 className="text-brand-green" size={26} />
              <h3 className="font-heading mt-4 text-base font-bold text-brand-ink">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-charcoal-light/80">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
