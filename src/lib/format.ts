/** 146859 → "146.859" (separador de milhares angolano/português). */
export function formatKz(price: number): string {
  const rounded = Math.round(price)
  return `${String(Math.abs(rounded)).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} Kz`
}

/** Separa o valor da moeda para dar destaque tipográfico diferente a cada um. */
export function formatKzParts(price: number): {
  amount: string
  currency: string
} {
  return { amount: formatKz(price).replace(' Kz', ''), currency: 'Kz' }
}
