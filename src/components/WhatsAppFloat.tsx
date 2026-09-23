import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";

export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("Hola, quiero más información sobre sus servicios.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-green text-white shadow-xl transition-transform hover:scale-110"
    >
      <MessageCircle size={26} />
    </a>
  );
}
