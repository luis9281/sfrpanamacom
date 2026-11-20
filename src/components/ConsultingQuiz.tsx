"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarCheck, MessageCircle, RotateCcw } from "lucide-react";
import { whatsappLink } from "@/lib/site";
import { contactPath } from "@/lib/contact";

type Answer = "si" | "no" | "nose";

// Preguntas del día a día: cada "sí" es una señal de que la tecnología está frenando a la empresa.
const questions = [
  "¿Tus computadoras se ponen lentas o fallan seguido?",
  "Si mañana se daña una computadora, ¿perderías información importante?",
  "¿Pagas programas, licencias o servicios que no sabes bien para qué sirven?",
  "¿Tu equipo pierde tiempo copiando datos a mano o repitiendo las mismas tareas?",
  "¿El internet o el WiFi de tu oficina se cae o se pone lento?",
];

const options: { value: Answer; label: string }[] = [
  { value: "si", label: "Sí" },
  { value: "no", label: "No" },
  { value: "nose", label: "No sé" },
];

const answerLabel: Record<Answer, string> = { si: "Sí", no: "No", nose: "No sé" };

// "No sé" cuenta media señal: no tener claro el estado de la tecnología también es un riesgo.
const score = (answers: Answer[]) =>
  answers.reduce((total, a) => total + (a === "si" ? 1 : a === "nose" ? 0.5 : 0), 0);

function resultFor(points: number) {
  if (points >= 3.5)
    return {
      title: "Tu empresa necesita una consultoría pronto",
      text: "Hay varias cosas que te están haciendo perder tiempo, dinero o información. La buena noticia: casi todas tienen solución, y te decimos por dónde empezar.",
      tone: "high" as const,
    };
  if (points >= 1.5)
    return {
      title: "Hay cosas que conviene revisar",
      text: "Tu tecnología funciona, pero tiene puntos débiles. Arreglarlos ahora cuesta mucho menos que esperar a que fallen en el peor momento.",
      tone: "mid" as const,
    };
  return {
    title: "Vas por buen camino",
    text: "Tu tecnología parece estar en orden. Una revisión preventiva te ayuda a mantenerla así y a encontrar formas de ahorrar.",
    tone: "low" as const,
  };
}

const toneBar = { high: "bg-amber-400", mid: "bg-brand-green", low: "bg-brand-green" };

export default function ConsultingQuiz() {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const step = answers.length;
  const done = step === questions.length;

  const focusQuestion = () => requestAnimationFrame(() => headingRef.current?.focus());

  const answer = (value: Answer) => {
    setAnswers((prev) => [...prev, value]);
    focusQuestion();
  };
  const back = () => {
    setAnswers((prev) => prev.slice(0, -1));
    focusQuestion();
  };
  const restart = () => {
    setAnswers([]);
    focusQuestion();
  };

  const points = score(answers);
  const result = resultFor(points);
  const summary = questions.map((q, i) => `${i + 1}. ${q} ${answerLabel[answers[i]] ?? ""}`).join("\n");
  const message = `Hola SFR, hice el autodiagnóstico en su web y el resultado fue: "${result.title}".\n\nMis respuestas:\n${summary}\n\nQuiero agendar la consulta gratis.`;

  return (
    <div data-track="autodiagnostico" className="overflow-hidden rounded-[2rem] bg-brand-charcoal text-white shadow-[0_30px_60px_-30px_rgba(23,26,27,0.6)]">
      {/* Progreso */}
      <div className="h-1.5 bg-white/10" aria-hidden="true">
        <div
          className="h-full bg-brand-green transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ width: `${(step / questions.length) * 100}%` }}
        />
      </div>

      <div className="p-7 sm:p-10" aria-live="polite">
        {!done ? (
          <div key={step} className="quiz-enter">
            <p className="text-sm font-semibold text-white/60">
              Pregunta {step + 1} de {questions.length}
            </p>
            <h3
              ref={headingRef}
              tabIndex={-1}
              className="font-heading mt-3 min-h-[4.5rem] text-2xl font-bold leading-snug text-balance outline-none sm:text-3xl"
            >
              {questions[step]}
            </h3>

            <div className="mt-8 grid grid-cols-3 gap-3 sm:max-w-md">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => answer(option.value)}
                  className={`rounded-2xl border px-4 py-4 text-base font-bold transition-all hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green ${
                    option.value === "nose"
                      ? "border-white/15 text-white/80 hover:border-white/40"
                      : "border-white/20 bg-white/5 hover:border-brand-green hover:bg-brand-green hover:text-brand-ink"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {step > 0 && (
              <button
                type="button"
                onClick={back}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white/60 transition-colors hover:text-brand-green"
              >
                <ArrowLeft size={16} />
                Pregunta anterior
              </button>
            )}
          </div>
        ) : (
          <div className="quiz-result">
            <p className="text-sm font-semibold text-white/60">Tu resultado</p>
            <h3
              ref={headingRef}
              tabIndex={-1}
              className="font-heading mt-3 text-2xl font-bold leading-snug text-balance outline-none sm:text-3xl"
            >
              {result.title}
            </h3>

            {/* Medidor: cuántas señales encontró el test */}
            <div className="mt-6 flex items-center gap-4">
              <div className="flex flex-1 gap-1.5" aria-hidden="true">
                {questions.map((_, i) => (
                  <span
                    key={i}
                    className={`h-2.5 flex-1 rounded-full ${i < Math.round(points) ? toneBar[result.tone] : "bg-white/15"}`}
                  />
                ))}
              </div>
              <span className="shrink-0 text-sm font-bold tabular-nums text-white/80">
                {points.toLocaleString("es-PA")} de {questions.length} señales
              </span>
            </div>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75">{result.text}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={whatsappLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-green px-6 py-3.5 text-sm font-bold text-brand-ink transition-transform hover:scale-105"
              >
                <MessageCircle size={18} />
                Enviar mi resultado por WhatsApp
              </a>
              <Link
                href={`${contactPath}?tipo=consulta&servicio=consultoria-de-sistemas`}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:border-brand-green hover:text-brand-green"
              >
                <CalendarCheck size={18} />
                Agendar consulta gratis
              </Link>
            </div>

            <button
              type="button"
              onClick={restart}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white/60 transition-colors hover:text-brand-green"
            >
              <RotateCcw size={15} />
              Volver a empezar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
