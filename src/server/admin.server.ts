import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'
import { eq, lt } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { adminSessions, settings } from '../../db/schema.js'

const PIN_KEY = 'admin_pin'
const ATTEMPTS_KEY = 'admin_attempts'
const SESSION_HOURS = 12
const MAX_ATTEMPTS = 5
const LOCK_MINUTES = 15

export const MIN_PIN_LENGTH = 6

/** Erro com mensagem segura para mostrar ao dono da loja. */
export class AdminError extends Error {}

async function readSetting(key: string): Promise<string | null> {
  const [row] = await db
    .select({ value: settings.value })
    .from(settings)
    .where(eq(settings.key, key))
    .limit(1)
  return row?.value ?? null
}

async function writeSetting(key: string, value: string): Promise<void> {
  await db
    .insert(settings)
    .values({ key, value })
    .onConflictDoUpdate({
      target: settings.key,
      set: { value, updatedAt: new Date() },
    })
}

function hashPin(pin: string, salt: string): string {
  return scryptSync(pin.normalize('NFKC'), salt, 32).toString('hex')
}

function encodePin(pin: string): string {
  const salt = randomBytes(16).toString('hex')
  return `scrypt$${salt}$${hashPin(pin, salt)}`
}

function matchesEncoded(pin: string, encoded: string): boolean {
  const [scheme, salt, digest] = encoded.split('$')
  if (scheme !== 'scrypt' || !salt || !digest) return false
  const candidate = Buffer.from(hashPin(pin, salt), 'hex')
  const expected = Buffer.from(digest, 'hex')
  return (
    candidate.length === expected.length &&
    timingSafeEqual(candidate, expected)
  )
}

/**
 * PIN de recuperação definido em variável de ambiente (`SYNEX_ADMIN_PIN`).
 * Quando existe, tem prioridade sobre o PIN guardado na base de dados — é a
 * forma de recuperar o acesso sem tocar no código.
 */
function envPin(): string | null {
  const value = process.env.SYNEX_ADMIN_PIN?.trim()
  return value ? value : null
}

export async function pinIsConfigured(): Promise<boolean> {
  if (envPin()) return true
  return (await readSetting(PIN_KEY)) !== null
}

interface AttemptState {
  attempts: number
  lockedUntil: number
}

async function readAttempts(): Promise<AttemptState> {
  const raw = await readSetting(ATTEMPTS_KEY)
  if (!raw) return { attempts: 0, lockedUntil: 0 }
  try {
    const parsed = JSON.parse(raw) as Partial<AttemptState>
    return {
      attempts: Number(parsed.attempts) || 0,
      lockedUntil: Number(parsed.lockedUntil) || 0,
    }
  } catch {
    return { attempts: 0, lockedUntil: 0 }
  }
}

function assertPinShape(pin: string): void {
  if (!/^\d{6,12}$/.test(pin)) {
    throw new AdminError(
      `O PIN tem de ter entre ${MIN_PIN_LENGTH} e 12 dígitos.`,
    )
  }
}

async function newSession(): Promise<string> {
  const token = randomBytes(32).toString('base64url')
  const expiresAt = new Date(Date.now() + SESSION_HOURS * 3600_000)
  await db.delete(adminSessions).where(lt(adminSessions.expiresAt, new Date()))
  await db.insert(adminSessions).values({ token, expiresAt })
  return token
}

/** Primeira configuração: define o PIN se ainda não existir nenhum. */
export async function setupPin(pin: string): Promise<string> {
  assertPinShape(pin)
  if (await pinIsConfigured()) {
    throw new AdminError('Já existe um PIN definido para esta loja.')
  }
  await writeSetting(PIN_KEY, encodePin(pin))
  return newSession()
}

/**
 * Autenticação do painel admin. Ponto único de verificação — trocar isto por
 * um backend de identidade não obriga a mexer no resto do site.
 */
export async function authenticateAdmin(pin: string): Promise<string> {
  const state = await readAttempts()
  if (state.lockedUntil > Date.now()) {
    const minutes = Math.ceil((state.lockedUntil - Date.now()) / 60_000)
    throw new AdminError(
      `Demasiadas tentativas. Tenta novamente dentro de ${minutes} min.`,
    )
  }

  const encoded = await readSetting(PIN_KEY)
  const fromEnv = envPin()
  const valid = fromEnv
    ? fromEnv === pin.trim()
    : encoded !== null && matchesEncoded(pin.trim(), encoded)

  if (!valid) {
    const attempts = state.attempts + 1
    const lockedUntil =
      attempts >= MAX_ATTEMPTS ? Date.now() + LOCK_MINUTES * 60_000 : 0
    await writeSetting(
      ATTEMPTS_KEY,
      JSON.stringify({
        attempts: lockedUntil ? 0 : attempts,
        lockedUntil,
      }),
    )
    throw new AdminError(
      lockedUntil
        ? `PIN incorrecto. Acesso bloqueado ${LOCK_MINUTES} min.`
        : 'PIN incorrecto.',
    )
  }

  await writeSetting(ATTEMPTS_KEY, JSON.stringify({ attempts: 0, lockedUntil: 0 }))
  return newSession()
}

export async function verifySession(token: string): Promise<boolean> {
  if (!token) return false
  const [row] = await db
    .select({ expiresAt: adminSessions.expiresAt })
    .from(adminSessions)
    .where(eq(adminSessions.token, token))
    .limit(1)
  if (!row) return false
  if (row.expiresAt.getTime() < Date.now()) {
    await db.delete(adminSessions).where(eq(adminSessions.token, token))
    return false
  }
  return true
}

export async function requireAdmin(token: string): Promise<void> {
  if (!(await verifySession(token))) {
    throw new AdminError('Sessão expirada. Entra outra vez com o teu PIN.')
  }
}

export async function endSession(token: string): Promise<void> {
  await db.delete(adminSessions).where(eq(adminSessions.token, token))
}

export async function changePin(
  token: string,
  currentPin: string,
  nextPin: string,
): Promise<void> {
  await requireAdmin(token)
  assertPinShape(nextPin)
  const encoded = await readSetting(PIN_KEY)
  const fromEnv = envPin()
  if (fromEnv) {
    throw new AdminError(
      'O PIN está definido na variável de ambiente SYNEX_ADMIN_PIN. Altera-o (ou remove-o) nas variáveis de ambiente do teu alojamento.',
    )
  }
  const currentValid = fromEnv
    ? fromEnv === currentPin.trim()
    : encoded !== null && matchesEncoded(currentPin.trim(), encoded)
  if (!currentValid) {
    throw new AdminError('O PIN actual não está correcto.')
  }
  await writeSetting(PIN_KEY, encodePin(nextPin))
}
