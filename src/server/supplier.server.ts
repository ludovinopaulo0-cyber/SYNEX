const BASE_URL = 'https://resell.codes/api/v1'

/** Erro com mensagem segura para mostrar ao dono da loja. */
export class SupplierError extends Error {}

function apiKey(): string {
  const key = process.env.RESELLCODES_API_KEY?.trim()
  if (!key) {
    throw new SupplierError(
      'A chave da ReSellCodes não está configurada (RESELLCODES_API_KEY).',
    )
  }
  return key
}

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${apiKey()}`,
        ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
        ...init?.headers,
      },
    })
  } catch {
    throw new SupplierError('Não consegui contactar a ReSellCodes. Tenta novamente.')
  }

  if (response.status === 429) {
    throw new SupplierError('Demasiados pedidos à ReSellCodes. Espera um pouco.')
  }
  if (!response.ok) {
    let message = `A ReSellCodes recusou o pedido (${response.status}).`
    try {
      const body = (await response.json()) as { error?: { message?: string } }
      if (body?.error?.message) message = body.error.message
    } catch {
      // resposta sem corpo JSON legível — mantém a mensagem genérica
    }
    throw new SupplierError(message)
  }

  return (await response.json()) as T
}

export interface GiftCardCategory {
  category_id: string
  name: string
  image?: string
}

export interface GiftCardOffer {
  card_id: string
  name: string
  price_usd: string
  stock: number
  min_quantity: number
  max_quantity: number
}

export interface GameKeyEntry {
  game_id: string
  name: string
  region: string
  platform: string
  region_restriction: boolean
  image?: string
}

export interface GameKeyOffer {
  key_id: string
  name: string
  price_usd: string
  stock: number
  min_quantity: number
  max_quantity: number
}

export interface SupplierOrder {
  number: number
  type: string
  status: 'created' | 'processing' | 'completed' | 'failed' | 'refund'
  charged_usd: string
  status_reason: string | null
  fail_code: string | null
  category_name?: string
  card_name?: string
  game_name?: string
  key_name?: string
  quantity?: number
  codes?: Array<string>
  keys?: Array<string>
}

export async function searchGiftCardCategories(q: string) {
  const query = q ? `?q=${encodeURIComponent(q)}` : ''
  return call<{ data: Array<GiftCardCategory> }>(`/gift-cards/categories${query}`)
}

export async function giftCardOffers(categoryId: string) {
  return call<{ name: string; offers: Array<GiftCardOffer> }>(
    `/gift-cards/categories/${encodeURIComponent(categoryId)}/cards`,
  )
}

export async function orderGiftCard(categoryId: string, cardId: string, quantity: number) {
  return call<SupplierOrder>('/gift-cards/order', {
    method: 'POST',
    body: JSON.stringify({ category_id: categoryId, card_id: cardId, quantity }),
  })
}

export async function searchGameKeys(q: string) {
  const query = q ? `?q=${encodeURIComponent(q)}` : ''
  return call<{ data: Array<GameKeyEntry> }>(`/game-keys${query}`)
}

export async function gameKeyOffers(gameId: string) {
  return call<{ name: string; keys: Array<GameKeyOffer> }>(
    `/game-keys/${encodeURIComponent(gameId)}/keys`,
  )
}

export async function orderGameKey(gameId: string, keyId: string, quantity: number) {
  return call<SupplierOrder>('/game-keys/order', {
    method: 'POST',
    body: JSON.stringify({ game_id: gameId, key_id: keyId, quantity }),
  })
}

export async function getSupplierOrder(number: number) {
  return call<SupplierOrder>(`/orders/${number}`)
}

export async function supplierAccount() {
  return call<{ balance_usd: string; total_orders: number }>('/me')
}
