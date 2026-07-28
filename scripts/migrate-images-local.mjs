/**
 * Migrate product images from Vercel Blob to public/products/
 * Uses the Vercel CLI (vercel blob get) to bypass CDN auth restrictions.
 * Run once: node --env-file=.env.local scripts/migrate-images-local.mjs
 */

import { neon } from "@neondatabase/serverless";
import { execSync } from "child_process";
import { mkdir, rename } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public", "products");
const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;
const CDN_BASE = "https://puukvgrfdo6uactj.public.blob.vercel-storage.com/";

const sql = neon(process.env.DATABASE_URL);

function extFrom(pathname) {
  const m = pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|avif)$/i);
  return m ? m[0].toLowerCase() : ".jpg";
}

async function run() {
  if (!existsSync(publicDir)) {
    await mkdir(publicDir, { recursive: true });
  }

  const products = await sql`
    SELECT id, slug, image_url FROM products
    WHERE image_url IS NOT NULL AND image_url LIKE 'http%'
    ORDER BY id
  `;

  console.log(`Migrating ${products.length} images…`);

  for (const p of products) {
    try {
      // Derive the blob pathname from the full CDN URL
      const pathname = p.image_url.replace(CDN_BASE, "");
      const ext = extFrom(pathname);
      const filename = `${p.slug}${ext}`;
      const destPath = path.join(publicDir, filename);
      const localPath = `/products/${filename}`;

      // Use vercel CLI to download (bypasses CDN auth)
      execSync(
        `npx vercel blob get "${pathname}" --access public --token "${BLOB_TOKEN}" -o "${destPath}"`,
        { stdio: "pipe" }
      );

      await sql`UPDATE products SET image_url = ${localPath} WHERE id = ${p.id}`;
      console.log(`  ✓ ${p.slug}  →  ${localPath}`);
    } catch (err) {
      console.error(`  ERROR ${p.slug}:`, err.message.slice(0, 200));
    }
  }

  console.log("Done.");
}

run();
