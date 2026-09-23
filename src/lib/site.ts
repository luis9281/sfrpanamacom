export const site = {
  name: "SFR Panamá",
  legalName: "System FR Panamá",
  phoneDisplay: "+507 6671-2959",
  phoneHref: "tel:+50766712959",
  whatsappNumber: "50766712959",
  email: "ventas@sfrpanama.com",
  address: "Panamá, República de Panamá",
};

export const whatsappLink = (message: string) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Soluciones IA", href: "#ia" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];
