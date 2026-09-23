import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";

const heading = Sora({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = "https://www.sfrpanama.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SFR Panamá | Soluciones TI que tu empresa merece",
    template: "%s | SFR Panamá",
  },
  description:
    "Consultoría, soporte técnico outsourcing, cloud AWS, inteligencia artificial, desarrollo web y ciberseguridad para pequeñas y medianas empresas en Panamá. Más de 15 años de experiencia.",
  keywords: [
    "soporte tecnico Panama",
    "outsourcing TI Panama",
    "cloud AWS Panama",
    "inteligencia artificial Panama",
    "desarrollo web Panama",
    "ciberseguridad Panama",
    "System FR Panama",
  ],
  openGraph: {
    title: "SFR Panamá | Soluciones TI que tu empresa merece",
    description:
      "Consultoría, soporte técnico outsourcing, cloud AWS, inteligencia artificial, desarrollo web y ciberseguridad para pymes en Panamá.",
    url: siteUrl,
    siteName: "SFR Panamá",
    locale: "es_PA",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${heading.variable} ${body.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-brand-ink">
        {children}
      </body>
    </html>
  );
}
