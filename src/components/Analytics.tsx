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
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest("a");
      const href = link?.getAttribute("href") ?? "";
      const match = leadMethods.find(([prefix]) => href.startsWith(prefix));
      if (match) {
        window.gtag?.("event", "generate_lead", {
          method: match[1],
          link_text: link?.textContent?.trim() || link?.getAttribute("aria-label"),
        });
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
