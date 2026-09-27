import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { AdminError, requireAdmin } from './admin.server'
import {
  SupplierError,
  gameKeyOffers,
  getSupplierOrder,
  giftCardOffers,
  orderGameKey,
  orderGiftCard,
  searchGameKeys,
  searchGiftCardCategories,
  supplierAccount,
} from './supplier.server'

const authed = z.object({ token: z.string().min(1) })

function toClientError(error: unknown): never {
  if (error instanceof AdminError || error instanceof SupplierError) {
    throw new Error(error.message)
  }
  console.error('[synex] supplier request failed', error)
  throw new Error('Não foi possível falar com o fornecedor. Tenta novamente.')
}

export const supplierBalance = createServerFn({ method: 'POST' })
  .inputValidator(authed)
  .handler(async ({ data }) => {
    try {
      await requireAdmin(data.token)
      return await supplierAccount()
    } catch (error) {
      toClientError(error)
    }
  })

export const supplierSearchGiftCards = createServerFn({ method: 'POST' })
  .inputValidator(authed.extend({ q: z.string().max(80) }))
  .handler(async ({ data }) => {
    try {
      await requireAdmin(data.token)
      return await searchGiftCardCategories(data.q)
    } catch (error) {
      toClientError(error)
    }
  })

export const supplierGiftCardOffers = createServerFn({ method: 'POST' })
  .inputValidator(authed.extend({ categoryId: z.string().min(1).max(120) }))
  .handler(async ({ data }) => {
    try {
      await requireAdmin(data.token)
      return await giftCardOffers(data.categoryId)
    } catch (error) {
      toClientError(error)
    }
  })

export const supplierOrderGiftCard = createServerFn({ method: 'POST' })
  .inputValidator(
    authed.extend({
      categoryId: z.string().min(1).max(120),
      cardId: z.string().min(1).max(120),
      quantity: z.number().int().min(1).max(100),
    }),
  )
  .handler(async ({ data }) => {
    try {
      await requireAdmin(data.token)
      return await orderGiftCard(data.categoryId, data.cardId, data.quantity)
    } catch (error) {
      toClientError(error)
    }
  })

export const supplierSearchGameKeys = createServerFn({ method: 'POST' })
  .inputValidator(authed.extend({ q: z.string().max(80) }))
  .handler(async ({ data }) => {
    try {
      await requireAdmin(data.token)
      return await searchGameKeys(data.q)
    } catch (error) {
      toClientError(error)
    }
  })

export const supplierGameKeyOffers = createServerFn({ method: 'POST' })
  .inputValidator(authed.extend({ gameId: z.string().min(1).max(120) }))
  .handler(async ({ data }) => {
    try {
      await requireAdmin(data.token)
      return await gameKeyOffers(data.gameId)
    } catch (error) {
      toClientError(error)
    }
  })

export const supplierOrderGameKey = createServerFn({ method: 'POST' })
  .inputValidator(
    authed.extend({
      gameId: z.string().min(1).max(120),
      keyId: z.string().min(1).max(120),
      quantity: z.number().int().min(1).max(100),
    }),
  )
  .handler(async ({ data }) => {
    try {
      await requireAdmin(data.token)
      return await orderGameKey(data.gameId, data.keyId, data.quantity)
    } catch (error) {
      toClientError(error)
    }
  })

export const supplierOrderStatus = createServerFn({ method: 'POST' })
  .inputValidator(authed.extend({ number: z.number().int().min(1) }))
  .handler(async ({ data }) => {
    try {
      await requireAdmin(data.token)
      return await getSupplierOrder(data.number)
    } catch (error) {
      toClientError(error)
    }
  })
