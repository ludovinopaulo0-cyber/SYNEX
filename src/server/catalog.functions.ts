import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import {
  insertProduct,
  listProducts,
  removeProduct,
  saveProduct,
} from './catalog.server'
import { AdminError, requireAdmin } from './admin.server'

const productInput = z.object({
  category: z.string().min(1).max(60),
  subcategory: z.string().min(1).max(60),
  name: z.string().min(1).max(120),
  price: z.number().int().min(0).max(100_000_000),
  discountPrice: z.number().int().min(0).max(100_000_000).nullable(),
  imageData: z.string().max(3_000_000).nullable(),
  platform: z.string().max(80).nullable(),
  region: z.string().max(80).nullable(),
  type: z.string().max(80).nullable(),
  available: z.boolean(),
}).refine((data) => data.discountPrice === null || data.discountPrice < data.price, {
  message: 'O preço com desconto tem de ser menor que o preço normal.',
  path: ['discountPrice'],
})

const authed = z.object({ token: z.string().min(1) })

/** Mensagens de erro do painel são seguras; o resto é genérico. */
function safeError(error: unknown): never {
  if (error instanceof AdminError) throw new Error(error.message)
  console.error('[synex] admin action failed', error)
  throw new Error('Não foi possível guardar. Tenta novamente.')
}

export const getProducts = createServerFn().handler(async () => {
  return listProducts()
})

export const createProduct = createServerFn({ method: 'POST' })
  .inputValidator(authed.extend({ product: productInput }))
  .handler(async ({ data }) => {
    try {
      await requireAdmin(data.token)
      return await insertProduct(data.product)
    } catch (error) {
      safeError(error)
    }
  })

export const updateProduct = createServerFn({ method: 'POST' })
  .inputValidator(
    authed.extend({ id: z.number().int().positive(), product: productInput }),
  )
  .handler(async ({ data }) => {
    try {
      await requireAdmin(data.token)
      const updated = await saveProduct(data.id, data.product)
      if (!updated) throw new AdminError('Esse produto já não existe.')
      return updated
    } catch (error) {
      safeError(error)
    }
  })

export const deleteProduct = createServerFn({ method: 'POST' })
  .inputValidator(authed.extend({ id: z.number().int().positive() }))
  .handler(async ({ data }) => {
    try {
      await requireAdmin(data.token)
      await removeProduct(data.id)
      return { ok: true as const }
    } catch (error) {
      safeError(error)
    }
  })

