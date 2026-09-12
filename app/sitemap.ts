import type { MetadataRoute } from "next";
import { person, caseStudies } from "@/content/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = person.siteUrl;
  const now = new Date();
  const routes = ["", "/work", "/lab", "/decisions", "/about", ...caseStudies.map((c) => `/work/${c.id}`)];
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
