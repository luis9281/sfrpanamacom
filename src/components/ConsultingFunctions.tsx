"use client";

import { useState } from "react";
import { consultingFunctions } from "@/lib/consulting";

/** Lista de funciones con interruptor entre explicación sencilla y técnica: sirve a todo público. */
export default function ConsultingFunctions() {
  const [technical, setTechnical] = useState(false);

  return (
    <div>
      <div className="flex justify-center">
        <div
          role="group"
          aria-label="Tipo de explicación"
          className="inline-flex rounded-full border border-black/10 bg-white p-1 shadow-sm"
        >
          {[
            { value: false, label: "Explicación sencilla" },
            { value: true, label: "Explicación técnica" },
          ].map((option) => (
            <button
              key={option.label}
              type="button"
              aria-pressed={technical === option.value}
              onClick={() => setTechnical(option.value)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
                technical === option.value
                  ? "bg-brand-ink text-white"
                  : "text-brand-charcoal hover:text-brand-green-dark"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-12 grid gap-x-14 sm:grid-cols-2">
        {consultingFunctions.map(({ icon: Icon, title, simple, technical: tech }) => (
          <li key={title} className="group flex gap-5 border-t border-black/10 py-7">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-green-light text-brand-green-dark transition-colors group-hover:bg-brand-green group-hover:text-brand-ink">
              <Icon size={22} />
            </span>
            <div>
              <h3 className="font-heading text-lg font-bold text-brand-ink">{title}</h3>
              <p key={String(technical)} className="fade-swap mt-1.5 text-base leading-relaxed text-brand-charcoal-light">
                {technical ? tech : simple}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
