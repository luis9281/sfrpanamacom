const stats = [
  { value: "15+", label: "Años de experiencia" },
  { value: "24/7", label: "Soporte disponible" },
  { value: "40%", label: "Reducción de costos con IA" },
  { value: "100%", label: "Empresas atendidas con éxito" },
];

export default function Stats() {
  return (
    <section className="bg-brand-ink">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-10 lg:grid-cols-4 lg:px-8 lg:py-12">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center lg:border-r lg:border-white/10 lg:last:border-r-0">
            <p className="font-heading text-3xl font-extrabold text-brand-green sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/60 sm:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
