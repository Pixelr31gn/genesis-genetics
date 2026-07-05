import type { MetadataRoute } from "next";
import { getPosts, getProducts } from "@/lib/db";

const BASE_URL = "https://genesisgenetics.io";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, posts] = await Promise.all([getProducts(), getPosts()]);

  const now = new Date().toISOString();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1, lastModified: now },
    { url: `${BASE_URL}/standards`, changeFrequency: "monthly", priority: 0.5, lastModified: now },
    { url: `${BASE_URL}/research`, changeFrequency: "weekly", priority: 0.8, lastModified: now },
    { url: `${BASE_URL}/quality-control`, changeFrequency: "monthly", priority: 0.6, lastModified: now },
    { url: `${BASE_URL}/certificate-of-analysis`, changeFrequency: "monthly", priority: 0.6, lastModified: now },
    { url: `${BASE_URL}/shipping-cold-chain`, changeFrequency: "monthly", priority: 0.6, lastModified: now },
    { url: `${BASE_URL}/categories/regeneration`, changeFrequency: "weekly", priority: 0.7, lastModified: now },
    { url: `${BASE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/compounds/${p.slug}`,
    lastModified: p.created_at,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/research/${post.slug}`,
    lastModified: post.created_at,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...postRoutes];
}
