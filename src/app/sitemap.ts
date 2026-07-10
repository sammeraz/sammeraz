import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { inventory } from "@/data/inventory";
import { magazines } from "@/data/magazines";

const staticRoutes = ["", "/inventory", "/about", "/store", "/financing", "/faq", "/contact", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map((path) => ({ url: `${site.url}${path}`, lastModified: now })),
    ...inventory.map((vehicle) => ({ url: `${site.url}/inventory/${vehicle.slug}`, lastModified: now })),
    ...magazines.map((magazine) => ({ url: `${site.url}/store/${magazine.slug}`, lastModified: now })),
  ];
}
