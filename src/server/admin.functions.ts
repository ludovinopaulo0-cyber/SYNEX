import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import {
  AdminError,
  authenticateAdmin,
  changePin,
  endSession,
  pinIsConfigured,
  setupPin,
  verifySession,
} from './admin.server'

const pinSchema = z.object({ pin: z.string().min(4).max(24) })

function toClientError(error: unknown): never {
  if (error instanceof AdminError) throw new Error(error.message)
  console.error('[synex] admin auth failed', error)
  throw new Error('Não foi possível concluir o pedido. Tenta novamente.')
}

export const getAdminStatus = createServerFn().handler(async () => {
  return { configured: await pinIsConfigured() }
})

/** Primeira configuração da loja: o dono escolhe o PIN no próprio site. */
export const createAdminPin = createServerFn({ method: 'POST' })
  .inputValidator(pinSchema)
  .handler(async ({ data }) => {
    try {
      return { token: await setupPin(data.pin) }
    } catch (error) {
      toClientError(error)
    }
  })

/**
 * Verificação do PIN. Toda a autenticação do site passa por aqui, por isso
 * substituir este passo por um backend de identidade é uma alteração isolada.
 */
export const adminLogin = createServerFn({ method: 'POST' })
  .inputValidator(pinSchema)
  .handler(async ({ data }) => {
    try {
      return { token: await authenticateAdmin(data.pin) }
    } catch (error) {
      toClientError(error)
    }
  })

export const adminSessionValid = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ token: z.string().min(1) }))
  .handler(async ({ data }) => {
    return { valid: await verifySession(data.token) }
  })

export const adminLogout = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ token: z.string().min(1) }))
  .handler(async ({ data }) => {
    await endSession(data.token)
    return { ok: true as const }
  })

export const adminChangePin = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      token: z.string().min(1),
      currentPin: z.string().min(4).max(24),
      nextPin: z.string().min(4).max(24),
    }),
  )
  .handler(async ({ data }) => {
    try {
      await changePin(data.token, data.currentPin, data.nextPin)
      return { ok: true as const }
    } catch (error) {
      toClientError(error)
    }
  })
