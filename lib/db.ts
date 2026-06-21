import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export type Product = {
  id: number;
  name: string;
  category: string;
  dosage: string | null;
  purity: string | null;
  price: number;
  image_type: string | null;
  description: string | null;
  stock: number;
  created_at: string;
};

export type ProductInput = {
  name: string;
  category: string;
  dosage: string;
  purity: string;
  price: number;
  description: string;
  stock: number;
};

export type ImageInput = {
  data: Buffer;
  type: string;
};

export async function getProducts(): Promise<Product[]> {
  const rows = await sql`
    SELECT id, name, category, dosage, purity, price, image_type, description, stock, created_at
    FROM products
    ORDER BY created_at DESC
  `;
  return rows as Product[];
}

export async function getProductById(id: number): Promise<Product | null> {
  const rows = await sql`
    SELECT id, name, category, dosage, purity, price, image_type, description, stock, created_at
    FROM products
    WHERE id = ${id}
  `;
  return (rows[0] as Product) ?? null;
}

export async function getProductImage(
  id: number
): Promise<ImageInput | null> {
  const rows = await sql`
    SELECT image_data, image_type FROM products WHERE id = ${id}
  `;
  const row = rows[0];
  if (!row || !row.image_data || !row.image_type) return null;
  return { data: row.image_data as Buffer, type: row.image_type as string };
}

export async function createProduct(
  data: ProductInput,
  image: ImageInput | null
): Promise<Product> {
  const rows = await sql`
    INSERT INTO products
      (name, category, dosage, purity, price, description, stock, image_data, image_type)
    VALUES
      (${data.name}, ${data.category}, ${data.dosage}, ${data.purity}, ${data.price}, ${data.description}, ${data.stock}, ${image?.data ?? null}, ${image?.type ?? null})
    RETURNING id, name, category, dosage, purity, price, image_type, description, stock, created_at
  `;
  return rows[0] as Product;
}

export async function updateProduct(
  id: number,
  data: ProductInput,
  image: ImageInput | null
): Promise<Product> {
  const rows = image
    ? await sql`
        UPDATE products
        SET name = ${data.name},
            category = ${data.category},
            dosage = ${data.dosage},
            purity = ${data.purity},
            price = ${data.price},
            description = ${data.description},
            stock = ${data.stock},
            image_data = ${image.data},
            image_type = ${image.type}
        WHERE id = ${id}
        RETURNING id, name, category, dosage, purity, price, image_type, description, stock, created_at
      `
    : await sql`
        UPDATE products
        SET name = ${data.name},
            category = ${data.category},
            dosage = ${data.dosage},
            purity = ${data.purity},
            price = ${data.price},
            description = ${data.description},
            stock = ${data.stock}
        WHERE id = ${id}
        RETURNING id, name, category, dosage, purity, price, image_type, description, stock, created_at
      `;
  return rows[0] as Product;
}

export async function deleteProduct(id: number): Promise<void> {
  await sql`DELETE FROM products WHERE id = ${id}`;
}
