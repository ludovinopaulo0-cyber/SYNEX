import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema.js'

/**
 * Ligação à base de dados via Neon (Postgres serverless).
 * Define DATABASE_URL nas variáveis de ambiente da plataforma de alojamento
 * (Vercel, Render, etc.) com a connection string do teu projecto Neon.
 */
export const db = drizzle(process.env.DATABASE_URL!, { schema })
