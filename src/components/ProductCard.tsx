import { ArrowUpRight } from 'lucide-react'
import { subcategoryIcon } from './SubcategoryIcon'
import { subcategoryLabel } from '@/data/catalog'
import { formatKzParts } from '@/lib/format'
import type { Product } from '@/lib/types'

export function ProductArtwork({ product }: { product: Product }) {
  const Icon = subcategoryIcon(product.subcategory, product.category)

  if (product.imageData) {
    return (
      <img
        src={product.imageData}
        alt={product.name}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
    )
  }

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-3 bg-ink-deep"
      style={{
        backgroundImage:
          'linear-gradient(150deg, rgba(124,58,237,0.22), rgba(15,23,42,0.05) 60%), url(/img/texture-shards.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Icon className="h-9 w-9 text-lilac/70" strokeWidth={1.25} />
      <span className="font-display text-[0.62rem] font-medium uppercase tracking-[0.28em] text-muted">
        {subcategoryLabel(product.subcategory)}
      </span>
    </div>
  )
}

export function ProductCard({
  product,
  onOrder,
  index = 0,
}: {
  product: Product
  onOrder: (product: Product) => void
  index?: number
}) {
  const hasDiscount =
    product.discountPrice !== null && product.discountPrice < product.price
  const price = formatKzParts(hasDiscount ? product.discountPrice! : product.price)
  const originalPrice = hasDiscount ? formatKzParts(product.price) : null
  const meta = [product.region, product.platform, product.type].filter(Boolean)

  return (
    <article
      className="cut-card group relative flex flex-col border border-hairline bg-ink-raised/55 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-lilac/40 hover:bg-ink-raised/80"
      style={{ animationDelay: `${Math.min(index, 11) * 45}ms` }}
    >
      <div className="relative aspect-square overflow-hidden border-b border-hairline">
        <ProductArtwork product={product} />
        {hasDiscount && product.available && (
          <span className="absolute left-0 top-3 bg-violet px-2.5 py-1 font-display text-[0.6rem] font-bold uppercase tracking-[0.2em] text-paper">
            Promoção
          </span>
        )}
        {!product.available && (
          <span className="absolute left-0 top-3 bg-paper px-2.5 py-1 font-display text-[0.6rem] font-bold uppercase tracking-[0.2em] text-ink">
            Esgotado
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex-1 space-y-1.5">
          <h3 className="font-display text-[0.95rem] font-semibold leading-snug text-paper">
            {product.name}
          </h3>
          {meta.length > 0 && (
            <p className="text-[0.66rem] uppercase tracking-[0.12em] text-muted">
              {meta.join(' · ')}
            </p>
          )}
        </div>

        <div className="space-y-0.5">
          {originalPrice && (
            <p className="font-display text-[0.72rem] font-medium text-muted line-through decoration-muted/70">
              {originalPrice.amount} {originalPrice.currency}
            </p>
          )}
          <p className="flex items-baseline gap-1.5">
            <span className="font-display text-[1.35rem] font-bold leading-none text-paper">
              {price.amount}
            </span>
            <span className="font-display text-[0.7rem] font-medium tracking-[0.14em] text-lilac">
              {price.currency}
            </span>
          </p>
        </div>

        <button
          type="button"
          onClick={() => onOrder(product)}
          disabled={!product.available}
          className="flex items-center justify-between gap-2 border border-violet/60 bg-violet/15 px-3 py-2 font-display text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:border-lilac hover:bg-violet/35 disabled:cursor-not-allowed disabled:border-hairline disabled:bg-transparent disabled:text-muted"
        >
          {product.available ? 'Encomendar' : 'Indisponível'}
          {product.available && <ArrowUpRight className="h-3.5 w-3.5" />}
        </button>
      </div>
    </article>
  )
}
