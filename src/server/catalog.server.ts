import { asc, eq } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { products } from '../../db/schema.js'
import { SEED_CATALOG } from '@/data/catalog'
import type { Product, ProductInput } from '@/lib/types'

type Row = typeof products.$inferSelect

function toProduct(row: Row): Product {
  return {
    id: row.id,
    category: row.category,
    subcategory: row.subcategory,
    name: row.name,
    price: row.price,
    imageData: row.imageData,
    platform: row.platform,
    region: row.region,
    type: row.type,
    delivery: row.delivery,
    available: row.available,
  }
}

/**
 * Carrega o catálogo inicial na primeira visita. É idempotente: `seed_id` é
 * único, por isso corridas em paralelo não duplicam produtos, e produtos que o
 * dono apague não voltam (só corre enquanto a tabela estiver vazia).
 */
async function seedIfEmpty(): Promise<void> {
  const existing = await db.select({ id: products.id }).from(products).limit(1)
  if (existing.length > 0) return

  await db
    .insert(products)
    .values(
      SEED_CATALOG.map((item, index) => ({
        seedId: item.seedId,
        category: item.category,
        subcategory: item.subcategory,
        name: item.name,
        price: item.price,
        platform: item.platform ?? null,
        region: item.region ?? null,
        type: item.type ?? null,
        position: index,
      })),
    )
    .onConflictDoNothing({ target: products.seedId })
}

export async function listProducts(): Promise<Array<Product>> {
  await seedIfEmpty()
  const rows = await db
    .select()
    .from(products)
    .orderBy(asc(products.position), asc(products.id))
  return rows.map(toProduct)
}

export async function insertProduct(input: ProductInput): Promise<Product> {
  const [row] = await db
    .insert(products)
    .values({
      category: input.category,
      subcategory: input.subcategory,
      name: input.name,
      price: input.price,
      imageData: input.imageData,
      platform: input.platform,
      region: input.region,
      type: input.type,
      available: input.available,
      position: 9999,
    })
    .returning()
  return toProduct(row)
}

export async function saveProduct(
  id: number,
  input: ProductInput,
): Promise<Product | null> {
  const [row] = await db
    .update(products)
    .set({
      category: input.category,
      subcategory: input.subcategory,
      name: input.name,
      price: input.price,
      imageData: input.imageData,
      platform: input.platform,
      region: input.region,
      type: input.type,
      available: input.available,
      updatedAt: new Date(),
    })
    .where(eq(products.id, id))
    .returning()
  return row ? toProduct(row) : null
}

export async function removeProduct(id: number): Promise<void> {
  await db.delete(products).where(eq(products.id, id))
}
