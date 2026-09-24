export const BRAND = {
  name: 'SYNEX DIGITAL',
  shortName: 'SYNEX',
  instagramHandle: 'sx.synex',
  instagramProfile: 'https://instagram.com/sx.synex',
  /** Link directo para a caixa de mensagens do Instagram. */
  instagramDm: 'https://ig.me/m/sx.synex',
  /** Número de WhatsApp em formato internacional, sem espaços nem "+". */
  whatsappNumber: '244962289140',
} as const

/** Link do WhatsApp, com a mensagem já preenchida (o WhatsApp aceita texto em ?text=, ao contrário do Instagram). */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${BRAND.whatsappNumber}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

import { formatKz } from './format'
import type { Product } from './types'

/**
 * Mensagem de encomenda. O Instagram não aceita texto pré-preenchido em links de
 * DM, por isso a mensagem é copiada para a área de transferência antes de abrir
 * a conversa.
 */
export function orderMessage(product: Product): string {
  const hasDiscount =
    product.discountPrice !== null && product.discountPrice < product.price
  const lines = [
    'Olá! Quero encomendar:',
    '',
    product.name,
    hasDiscount
      ? `Preço: ${formatKz(product.discountPrice!)} (promoção, preço normal ${formatKz(product.price)})`
      : `Preço: ${formatKz(product.price)}`,
  ]
  if (product.platform) lines.push(`Plataforma: ${product.platform}`)
  if (product.region) lines.push(`Região: ${product.region}`)
  if (product.type) lines.push(`Tipo: ${product.type}`)
  lines.push('', 'Vi através do site da SYNEX.')
  return lines.join('\n')
}
