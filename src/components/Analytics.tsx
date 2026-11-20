"use client";

import Script from "next/script";
import { useEffect } from "react";
import { site } from "@/lib/site";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const leadMethods: [prefix: string, method: string][] = [
  ["https://wa.me/", "whatsapp"],
  ["tel:", "phone"],
  ["mailto:", "email"],
];

export default function Analytics() {
  // Registra como conversión (generate_lead) los clics en WhatsApp, teléfono y correo.
  // Los enlaces dentro de un [data-track] (p. ej. cada slide del hero) llevan su ubicación,
  // y sus demás enlaces se registran como cta_click para comparar qué mensaje funciona mejor.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest("a");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const match = leadMethods.find(([prefix]) => href.startsWith(prefix));
      const placement = link.closest<HTMLElement>("[data-track]")?.dataset.track;
      const linkText = link.textContent?.trim() || link.getAttribute("aria-label");
      if (match) {
        window.gtag?.("event", "generate_lead", {
          method: match[1],
          link_text: linkText,
          ...(placement && { placement }),
        });
      } else if (placement) {
        window.gtag?.("event", "cta_click", { placement, link_text: linkText, link_url: href });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      {/* La cola (dataLayer) existe desde el inicio, así no se pierden clics;
          la librería de Google (~176 KB) baja cuando el navegador queda libre. */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`}
        strategy="lazyOnload"
      />
      <Script id="google-tag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${site.gaId}');`}
      </Script>
    </>
  );
}
