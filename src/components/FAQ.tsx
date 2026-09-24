import { ChevronDown } from "lucide-react";
import { faqs as defaultFaqs } from "@/lib/faqs";

type FAQProps = {
  items?: { question: string; answer: string }[];
  title?: string;
};

export default function FAQ({
  items = defaultFaqs,
  title = "Todo sobre nuestros servicios TI en Panamá",
}: FAQProps) {
  return (
    <section id="preguntas" className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-dots absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]" />
        <div data-parallax="0.3" className="absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-brand-green/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-5 lg:px-8">
        <div data-reveal="up" className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-green-dark">
            Preguntas frecuentes
          </p>
          <h2 className="font-heading mt-3 text-3xl font-bold text-brand-ink sm:text-4xl">
            {title}
          </h2>
        </div>

        <div data-reveal-stagger="up" className="mt-12 space-y-4">
          {items.map((faq) => (
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
