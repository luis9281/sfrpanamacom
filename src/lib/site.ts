export const site = {
  name: "SFR Panamá",
  legalName: "System FR Panamá",
  url: "https://www.sfrpanama.com",
  gaId: "G-M577BGMMF1",
  title: "SFR Panamá | Soporte técnico, Cloud AWS e IA para empresas",
  description:
    "Soporte técnico outsourcing, consultoría TI, cloud AWS, inteligencia artificial, desarrollo web y ciberseguridad para pequeñas y medianas empresas en Panamá. Más de 15 años de experiencia y soporte 24/7.",
  phoneDisplay: "+507 6671-2959",
  phoneE164: "+50766712959",
  phoneHref: "tel:+50766712959",
  whatsappNumber: "50766712959",
  email: "ventas@sfrpanama.com",
  address: "Panamá, República de Panamá",
};

export const whatsappLink = (message: string) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const webDesignPath = "/diseno-paginas-web";

export const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Diseño Web", href: webDesignPath },
  { label: "Soluciones IA", href: "/#ia" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Preguntas", href: "/#preguntas" },
  { label: "Contacto", href: "#contacto" },
];
