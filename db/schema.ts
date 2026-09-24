import {
  boolean,
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'

/**
 * Catálogo de produtos digitais.
 *
 * `seedId` existe apenas para tornar a carga inicial do catálogo idempotente
 * (insert ... on conflict do nothing). Produtos criados no painel admin não têm
 * seedId.
 */
export const products = pgTable(
  'products',
  {
    id: serial().primaryKey(),
    seedId: text('seed_id').unique(),
    category: text().notNull(),
    subcategory: text().notNull(),
    name: text().notNull(),
    price: integer().notNull(),
    discountPrice: integer('discount_price'),
    imageData: text('image_data'),
    platform: text(),
    region: text(),
    type: text(),
    delivery: text().notNull().default('Digital'),
    available: boolean().notNull().default(true),
    position: integer().notNull().default(0),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => [index('products_category_idx').on(table.category)],
)

/** Configuração da loja (hash do PIN, contador de tentativas, etc.). */
export const settings = pgTable('settings', {
  key: text().primaryKey(),
  value: text().notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

/** Sessões do painel admin. O token vive no sessionStorage do browser. */
export const adminSessions = pgTable('admin_sessions', {
  token: text().primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  expiresAt: timestamp('expires_at').notNull(),
})
