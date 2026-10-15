import type { MetadataRoute } from "next";
import { remoteSupportPath, site, webDesignPath } from "@/lib/site";
import { portfolio } from "@/lib/portfolio";
import { contactPath } from "@/lib/contact";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: [`${site.url}/images/logo-full.jpg`],
    },
    {
      url: `${site.url}${webDesignPath}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      images: portfolio.map((p) => `${site.url}/images/portafolio/${p.slug}.webp`),
    },
    {
      url: `${site.url}${remoteSupportPath}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      images: ["mesa-de-ayuda", "tecnico-monitores", "diagnostico-laptop", "tecnico-servidores"].map(
        (name) => `${site.url}/images/soporte-remoto/${name}.webp`,
      ),
    },
    {
      url: `${site.url}${contactPath}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
