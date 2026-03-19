import type { MetadataRoute } from "next";
import { siteUrlString } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  const base = siteUrlString();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
