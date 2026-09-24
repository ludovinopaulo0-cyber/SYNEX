import { d as db, p as products, a as asc, e as eq, c as createServerRpc, r as requireAdmin, A as AdminError } from "./admin.server-D0tbPMwO.js";
import { S as SEED_CATALOG } from "./catalog-BfiH91C2.js";
import { $ as createServerFn } from "../server.js";
import { o as object, s as string, n as number, b as boolean } from "./schemas-CrY2pnAI.js";
import "node:crypto";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
function toProduct(row) {
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
    available: row.available
  };
}
async function seedIfEmpty() {
  const existing = await db.select({ id: products.id }).from(products).limit(1);
  if (existing.length > 0) return;
  await db.insert(products).values(
    SEED_CATALOG.map((item, index) => ({
      seedId: item.seedId,
      category: item.category,
      subcategory: item.subcategory,
      name: item.name,
      price: item.price,
      platform: item.platform ?? null,
      region: item.region ?? null,
      type: item.type ?? null,
      position: index
    }))
  ).onConflictDoNothing({ target: products.seedId });
}
async function listProducts() {
  await seedIfEmpty();
  const rows = await db.select().from(products).orderBy(asc(products.position), asc(products.id));
  return rows.map(toProduct);
}
async function insertProduct(input) {
  const [row] = await db.insert(products).values({
    category: input.category,
    subcategory: input.subcategory,
    name: input.name,
    price: input.price,
    imageData: input.imageData,
    platform: input.platform,
    region: input.region,
    type: input.type,
    available: input.available,
    position: 9999
  }).returning();
  return toProduct(row);
}
async function saveProduct(id, input) {
  const [row] = await db.update(products).set({
    category: input.category,
    subcategory: input.subcategory,
    name: input.name,
    price: input.price,
    imageData: input.imageData,
    platform: input.platform,
    region: input.region,
    type: input.type,
    available: input.available,
    updatedAt: /* @__PURE__ */ new Date()
  }).where(eq(products.id, id)).returning();
  return row ? toProduct(row) : null;
}
async function removeProduct(id) {
  await db.delete(products).where(eq(products.id, id));
}
const productInput = object({
  category: string().min(1).max(60),
  subcategory: string().min(1).max(60),
  name: string().min(1).max(120),
  price: number().int().min(0).max(1e8),
  imageData: string().max(3e6).nullable(),
  platform: string().max(80).nullable(),
  region: string().max(80).nullable(),
  type: string().max(80).nullable(),
  available: boolean()
});
const authed = object({
  token: string().min(1)
});
function safeError(error) {
  if (error instanceof AdminError) throw new Error(error.message);
  console.error("[synex] admin action failed", error);
  throw new Error("Não foi possível guardar. Tenta novamente.");
}
const getProducts_createServerFn_handler = createServerRpc({
  id: "463fe7260f33516dba912f69f4041220c06689e845e42d00d0e5e51ea2f5f081",
  name: "getProducts",
  filename: "src/server/catalog.functions.ts"
}, (opts) => getProducts.__executeServer(opts));
const getProducts = createServerFn().handler(getProducts_createServerFn_handler, async () => {
  return listProducts();
});
const createProduct_createServerFn_handler = createServerRpc({
  id: "dd7550d45d4bdad24417c4fda0d2d12d759627736b77977871096d4aa3776ec3",
  name: "createProduct",
  filename: "src/server/catalog.functions.ts"
}, (opts) => createProduct.__executeServer(opts));
const createProduct = createServerFn({
  method: "POST"
}).inputValidator(authed.extend({
  product: productInput
})).handler(createProduct_createServerFn_handler, async ({
  data
}) => {
  try {
    await requireAdmin(data.token);
    return await insertProduct(data.product);
  } catch (error) {
    safeError(error);
  }
});
const updateProduct_createServerFn_handler = createServerRpc({
  id: "01b4e5d5d77d2ec12a054e02e73e55d95560d0ce9c3bff966e2775412406d93b",
  name: "updateProduct",
  filename: "src/server/catalog.functions.ts"
}, (opts) => updateProduct.__executeServer(opts));
const updateProduct = createServerFn({
  method: "POST"
}).inputValidator(authed.extend({
  id: number().int().positive(),
  product: productInput
})).handler(updateProduct_createServerFn_handler, async ({
  data
}) => {
  try {
    await requireAdmin(data.token);
    const updated = await saveProduct(data.id, data.product);
    if (!updated) throw new AdminError("Esse produto já não existe.");
    return updated;
  } catch (error) {
    safeError(error);
  }
});
const deleteProduct_createServerFn_handler = createServerRpc({
  id: "35586c93f576b785717858c6debd5be24342826aa5654386336199524e160b8d",
  name: "deleteProduct",
  filename: "src/server/catalog.functions.ts"
}, (opts) => deleteProduct.__executeServer(opts));
const deleteProduct = createServerFn({
  method: "POST"
}).inputValidator(authed.extend({
  id: number().int().positive()
})).handler(deleteProduct_createServerFn_handler, async ({
  data
}) => {
  try {
    await requireAdmin(data.token);
    await removeProduct(data.id);
    return {
      ok: true
    };
  } catch (error) {
    safeError(error);
  }
});
export {
  createProduct_createServerFn_handler,
  deleteProduct_createServerFn_handler,
  getProducts_createServerFn_handler,
  updateProduct_createServerFn_handler
};
