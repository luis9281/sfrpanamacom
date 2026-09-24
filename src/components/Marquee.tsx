import { Sparkles } from "lucide-react";

const items = [
  "Soporte técnico 24/7",
  "Cloud AWS",
  "Ciberseguridad",
  "Inteligencia Artificial",
  "Chatbots para WhatsApp",
  "Desarrollo Web",
  "Hosting y correo",
  "Redes LAN/WiFi",
  "Automatización de procesos",
  "Consultoría TI",
];

export default function Marquee() {
  return (
    <div className="marquee relative overflow-hidden border-y border-black/5 bg-brand-green py-4">
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 || undefined}
            className="flex shrink-0 items-center"
          >
            {items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-6 px-6 font-heading text-base font-bold whitespace-nowrap text-brand-ink sm:text-lg"
              >
                {item}
                <Sparkles size={16} className="text-brand-ink/50" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
