import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/faqs";

export default function FAQ() {
  return (
    <section id="preguntas" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-green-dark">
            Preguntas frecuentes
          </p>
          <h2 className="font-heading mt-3 text-3xl font-bold text-brand-ink sm:text-4xl">
            Todo sobre nuestros servicios TI en Panamá
          </h2>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-black/5 bg-white p-6 shadow-sm open:border-brand-green/30"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                <h3 className="font-heading text-base font-bold text-brand-ink sm:text-lg">
                  {faq.question}
                </h3>
                <ChevronDown
                  size={20}
                  className="shrink-0 text-brand-green-dark transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-brand-charcoal-light/80">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
