import type { Metadata, Viewport } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";

const heading = Sora({
  variable: "--font-heading",
  subsets: ["latin"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s | SFR Panamá",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "soporte tecnico Panama",
    "soporte tecnico empresas Panama",
    "outsourcing TI Panama",
    "empresa de informatica Panama",
    "consultoria TI Panama",
    "cloud AWS Panama",
    "inteligencia artificial Panama",
    "chatbot WhatsApp Panama",
    "desarrollo web Panama",
    "diseño de paginas web Panama",
    "ciberseguridad Panama",
    "soporte de redes Panama",
    "System FR Panama",
  ],
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: site.title,
    description: site.description,
    url: "/",
    siteName: site.name,
    locale: "es_PA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#26292b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-PA"
      suppressHydrationWarning
      className={`${heading.variable} ${body.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        {/* Marca que hay JS antes de pintar, para ocultar lo que entra con scroll */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-brand-ink">
        {children}
        <JsonLd />
        <Analytics />
      </body>
    </html>
  );
}
