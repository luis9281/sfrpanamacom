import type { MetadataRoute } from "next";
import { site, webDesignPath } from "@/lib/site";
import { portfolio } from "@/lib/portfolio";

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
  ];
}
