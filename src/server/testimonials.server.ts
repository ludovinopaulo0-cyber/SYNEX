import { asc, eq } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { testimonials } from '../../db/schema.js'
import type { Testimonial, TestimonialInput } from '@/lib/types'

type Row = typeof testimonials.$inferSelect

function toTestimonial(row: Row): Testimonial {
  return {
    id: row.id,
    name: row.name,
    text: row.text,
    rating: row.rating,
    imageData: row.imageData,
  }
}

const SEED_TESTIMONIALS: Array<TestimonialInput> = [
  {
    name: 'Jérsson M.',
    text: 'Pedi a PSN à noite e já estava a jogar 10 minutos depois. Super rápido.',
    rating: 5,
    imageData: null,
  },
  {
    name: 'Ivânia S.',
    text: 'Comprei Robux para o meu filho, o código veio certo e o atendimento foi muito simpático.',
    rating: 5,
    imageData: null,
  },
  {
    name: 'Paulo K.',
    text: 'Já fiz várias encomendas, nunca tive problema nenhum. Recomendo.',
    rating: 5,
    imageData: null,
  },
]

/** Carrega 3 depoimentos de exemplo na primeira visita, só se a tabela estiver vazia. */
async function seedIfEmpty(): Promise<void> {
  const existing = await db.select({ id: testimonials.id }).from(testimonials).limit(1)
  if (existing.length > 0) return

  await db.insert(testimonials).values(
    SEED_TESTIMONIALS.map((item, index) => ({
      name: item.name,
      text: item.text,
      rating: item.rating,
      position: index,
    })),
  )
}

export async function listTestimonials(): Promise<Array<Testimonial>> {
  await seedIfEmpty()
  const rows = await db
    .select()
    .from(testimonials)
    .orderBy(asc(testimonials.position), asc(testimonials.id))
  return rows.map(toTestimonial)
}

export async function insertTestimonial(input: TestimonialInput): Promise<Testimonial> {
  const [row] = await db
    .insert(testimonials)
    .values({
      name: input.name,
      text: input.text,
      rating: input.rating,
      imageData: input.imageData,
      position: 9999,
    })
    .returning()
  return toTestimonial(row)
}

export async function saveTestimonial(
  id: number,
  input: TestimonialInput,
): Promise<Testimonial | null> {
  const [row] = await db
    .update(testimonials)
    .set({
      name: input.name,
      text: input.text,
      rating: input.rating,
      imageData: input.imageData,
      updatedAt: new Date(),
    })
    .where(eq(testimonials.id, id))
    .returning()
  return row ? toTestimonial(row) : null
}

export async function removeTestimonial(id: number): Promise<void> {
  await db.delete(testimonials).where(eq(testimonials.id, id))
}
