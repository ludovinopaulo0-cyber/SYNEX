import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import {
  insertTestimonial,
  listTestimonials,
  removeTestimonial,
  saveTestimonial,
} from './testimonials.server'
import { AdminError, requireAdmin } from './admin.server'

const testimonialInput = z.object({
  name: z.string().min(1).max(80),
  text: z.string().min(1).max(500),
  rating: z.number().int().min(1).max(5),
  imageData: z.string().max(3_000_000).nullable(),
})

const authed = z.object({ token: z.string().min(1) })

function safeError(error: unknown): never {
  if (error instanceof AdminError) throw new Error(error.message)
  console.error('[synex] admin action failed', error)
  throw new Error('Não foi possível guardar. Tenta novamente.')
}

export const getTestimonials = createServerFn().handler(async () => {
  return listTestimonials()
})

export const createTestimonial = createServerFn({ method: 'POST' })
  .inputValidator(authed.extend({ testimonial: testimonialInput }))
  .handler(async ({ data }) => {
    try {
      await requireAdmin(data.token)
      return await insertTestimonial(data.testimonial)
    } catch (error) {
      safeError(error)
    }
  })

export const updateTestimonial = createServerFn({ method: 'POST' })
  .inputValidator(
    authed.extend({ id: z.number().int().positive(), testimonial: testimonialInput }),
  )
  .handler(async ({ data }) => {
    try {
      await requireAdmin(data.token)
      const updated = await saveTestimonial(data.id, data.testimonial)
      if (!updated) throw new AdminError('Esse depoimento já não existe.')
      return updated
    } catch (error) {
      safeError(error)
    }
  })

export const deleteTestimonial = createServerFn({ method: 'POST' })
  .inputValidator(authed.extend({ id: z.number().int().positive() }))
  .handler(async ({ data }) => {
    try {
      await requireAdmin(data.token)
      await removeTestimonial(data.id)
      return { ok: true as const }
    } catch (error) {
      safeError(error)
    }
  })
