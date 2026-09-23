import { site } from "@/lib/site";
import { faqs } from "@/lib/faqs";
import { services } from "@/components/Services";
import { solutions } from "@/components/AISolutions";

const organizationId = `${site.url}/#organization`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": organizationId,
      name: site.name,
      legalName: site.legalName,
      url: site.url,
      logo: `${site.url}/images/logo.png`,
      image: `${site.url}/images/logo-full.jpg`,
      description: site.description,
      telephone: site.phoneE164,
      email: site.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Panamá",
        addressCountry: "PA",
      },
      areaServed: { "@type": "Country", name: "Panamá" },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: site.phoneE164,
        email: site.email,
        contactType: "sales",
        areaServed: "PA",
        availableLanguage: ["Spanish", "English"],
      },
      knowsAbout: [...services, ...solutions].map((s) => s.title),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios TI e inteligencia artificial",
        itemListElement: [...services, ...solutions].map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.title,
            description: s.description,
            provider: { "@id": organizationId },
            areaServed: { "@type": "Country", name: "Panamá" },
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      inLanguage: "es-PA",
      publisher: { "@id": organizationId },
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}/#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\u003c"),
      }}
    />
  );
}
