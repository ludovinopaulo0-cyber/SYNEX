export const BRAND = {
  name: 'SYNEX DIGITAL',
  shortName: 'SYNEX',
  instagramHandle: 'sx.synex',
  instagramProfile: 'https://instagram.com/sx.synex',
  /** Link directo para a caixa de mensagens do Instagram. */
  instagramDm: 'https://ig.me/m/sx.synex',
} as const

import { formatKz } from './format'
import type { Product } from './types'

/**
 * Mensagem de encomenda. O Instagram não aceita texto pré-preenchido em links de
 * DM, por isso a mensagem é copiada para a área de transferência antes de abrir
 * a conversa.
 */
export function orderMessage(product: Product): string {
  const lines = [
    'Olá! Quero encomendar:',
    '',
    product.name,
    `Preço: ${formatKz(product.price)}`,
  ]
  if (product.platform) lines.push(`Plataforma: ${product.platform}`)
  if (product.region) lines.push(`Região: ${product.region}`)
  if (product.type) lines.push(`Tipo: ${product.type}`)
  lines.push('', 'Vi através do site da SYNEX.')
  return lines.join('\n')
}
