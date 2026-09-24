import { useRef, useState } from 'react'
import { ChevronDown, ImagePlus, Loader2, Save, Trash2 } from 'lucide-react'
import { ProductArtwork } from './ProductCard'
import { CATEGORIES, subcategoryLabel } from '@/data/catalog'
import { cropToSquareDataUrl } from '@/lib/imageCrop'
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from '@/server/catalog.functions'
import type { Product, ProductInput } from '@/lib/types'

const EMPTY: ProductInput = {
  category: 'gaming',
  subcategory: 'playstation',
  name: '',
  price: 0,
  discountPrice: null,
  imageData: null,
  platform: '',
  region: '',
  type: '',
  available: true,
}

function toInput(product: Product): ProductInput {
  return {
    category: product.category,
    subcategory: product.subcategory,
    name: product.name,
    price: product.price,
    discountPrice: product.discountPrice,
    imageData: product.imageData,
    platform: product.platform ?? '',
    region: product.region ?? '',
    type: product.type ?? '',
    available: product.available,
  }
}

function clean(input: ProductInput): ProductInput {
  const trimmed = (value: string | null) => {
    const next = (value ?? '').trim()
    return next.length > 0 ? next : null
  }
  return {
    ...input,
    name: input.name.trim(),
    category: input.category.trim(),
    subcategory: input.subcategory.trim().toLowerCase(),
    platform: trimmed(input.platform),
    region: trimmed(input.region),
    type: trimmed(input.type),
  }
}

export function AdminProductForm({
  product,
  token,
  onSaved,
  onDeleted,
  onCancel,
}: {
  product: Product | null
  token: string
  onSaved: (product: Product) => void
  onDeleted?: (id: number) => void
  onCancel?: () => void
}) {
  const [form, setForm] = useState<ProductInput>(
    product ? toInput(product) : EMPTY,
  )
  const [open, setOpen] = useState(product === null)
  const [busy, setBusy] = useState<false | 'save' | 'image' | 'delete'>(false)
  const [error, setError] = useState<string | null>(null)
  const fileInput = useRef<HTMLInputElement>(null)

  const patch = (changes: Partial<ProductInput>) =>
    setForm((current) => ({ ...current, ...changes }))

  const knownSubcategories =
    CATEGORIES.find((entry) => entry.id === form.category)?.subcategories ?? []

  const handleFile = async (file: File | undefined) => {
    if (!file) return
    setError(null)
    setBusy('image')
    try {
      const dataUrl = await cropToSquareDataUrl(file)
      patch({ imageData: dataUrl })
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Falha no upload.')
    } finally {
      setBusy(false)
      if (fileInput.current) fileInput.current.value = ''
    }
  }

  const save = async () => {
    setError(null)
    const payload = clean(form)
    if (!payload.name) {
      setError('O produto precisa de um nome.')
      return
    }
    setBusy('save')
    try {
      const saved = product
        ? await updateProduct({ data: { token, id: product.id, product: payload } })
        : await createProduct({ data: { token, product: payload } })
      onSaved(saved)
      if (!product) setForm(EMPTY)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível guardar.')
    } finally {
      setBusy(false)
    }
  }

  const remove = async () => {
    if (!product || !onDeleted) return
    if (!window.confirm(`Eliminar "${product.name}" do catálogo?`)) return
    setBusy('delete')
    try {
      await deleteProduct({ data: { token, id: product.id } })
      onDeleted(product.id)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível eliminar.')
      setBusy(false)
    }
  }

  const preview: Product = {
    id: product?.id ?? 0,
    delivery: 'Digital',
    ...form,
    platform: form.platform || null,
    region: form.region || null,
    type: form.type || null,
  }

  return (
    <article className="cut-card flex flex-col border border-violet/45 bg-ink-raised/70">
      <div className="relative aspect-square overflow-hidden border-b border-hairline">
        <ProductArtwork product={preview} />
        <div className="absolute inset-x-0 bottom-0 flex gap-2 bg-ink-deep/80 p-2 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            disabled={busy === 'image'}
            className="flex flex-1 items-center justify-center gap-1.5 border border-hairline px-2 py-1.5 font-display text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:border-lilac/60"
          >
            {busy === 'image' ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <ImagePlus className="h-3 w-3" />
            )}
            {form.imageData ? 'Trocar' : 'Imagem'}
          </button>
          {form.imageData && (
            <button
              type="button"
              onClick={() => patch({ imageData: null })}
              className="border border-hairline px-2 py-1.5 font-display text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:text-paper"
            >
              Remover
            </button>
          )}
        </div>
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => void handleFile(event.target.files?.[0])}
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <label className="field-label">Nome</label>
          <input
            className="field"
            value={form.name}
            onChange={(event) => patch({ name: event.target.value })}
            placeholder="PSN 20€"
          />
        </div>

        <div>
          <label className="field-label">Preço (Kz)</label>
          <input
            className="field font-display"
            type="number"
            min={0}
            value={form.price}
            onChange={(event) => patch({ price: Number(event.target.value) || 0 })}
          />
        </div>

        <div>
          <label className="field-label">Preço com desconto (Kz, opcional)</label>
          <div className="flex items-center gap-2">
            <input
              className="field font-display"
              type="number"
              min={0}
              placeholder="Sem desconto"
              value={form.discountPrice ?? ''}
              onChange={(event) => {
                const raw = event.target.value
                patch({ discountPrice: raw === '' ? null : Number(raw) || 0 })
              }}
            />
            {form.discountPrice !== null && (
              <button
                type="button"
                onClick={() => patch({ discountPrice: null })}
                className="shrink-0 font-display text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-muted hover:text-lilac"
              >
                Remover
              </button>
            )}
          </div>
          {form.discountPrice !== null && form.discountPrice >= form.price && (
            <p className="mt-1 text-[0.66rem] text-amber-400">
              Tem de ser menor que o preço normal.
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex items-center gap-1.5 self-start font-display text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-muted transition-colors hover:text-lilac"
        >
          <ChevronDown
            className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`}
          />
          Mais detalhes
        </button>

        {open && (
          <div className="space-y-3 border-l border-hairline pl-3">
            <div>
              <label className="field-label">Categoria</label>
              <select
                className="field"
                value={form.category}
                onChange={(event) => patch({ category: event.target.value })}
              >
                {CATEGORIES.map((entry) => (
                  <option key={entry.id} value={entry.id}>
                    {entry.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="field-label">Subcategoria</label>
              <input
                className="field"
                list="synex-subcategories"
                value={form.subcategory}
                onChange={(event) => patch({ subcategory: event.target.value })}
              />
              <datalist id="synex-subcategories">
                {knownSubcategories.map((value) => (
                  <option key={value} value={value}>
                    {subcategoryLabel(value)}
                  </option>
                ))}
              </datalist>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="field-label">Plataforma</label>
                <input
                  className="field"
                  value={form.platform ?? ''}
                  onChange={(event) => patch({ platform: event.target.value })}
                  placeholder="PlayStation"
                />
              </div>
              <div>
                <label className="field-label">Região</label>
                <input
                  className="field"
                  value={form.region ?? ''}
                  onChange={(event) => patch({ region: event.target.value })}
                  placeholder="Europa"
                />
              </div>
            </div>
            <div>
              <label className="field-label">Tipo</label>
              <input
                className="field"
                value={form.type ?? ''}
                onChange={(event) => patch({ type: event.target.value })}
                placeholder="Gift Card"
              />
            </div>
            <label className="flex cursor-pointer items-center gap-2 text-[0.7rem] text-muted">
              <input
                type="checkbox"
                checked={form.available}
                onChange={(event) => patch({ available: event.target.checked })}
                className="h-3.5 w-3.5 accent-violet"
              />
              Disponível para encomenda
            </label>
          </div>
        )}

        {error && (
          <p className="border-l-2 border-lilac bg-violet/10 px-2.5 py-2 text-[0.68rem] leading-relaxed text-paper">
            {error}
          </p>
        )}

        <div className="mt-auto flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => void save()}
            disabled={busy !== false}
            className="flex flex-1 items-center justify-center gap-1.5 border border-violet bg-violet/25 px-3 py-2 font-display text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-violet/45 disabled:opacity-60"
          >
            {busy === 'save' ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Save className="h-3 w-3" />
            )}
            {product ? 'Guardar' : 'Adicionar'}
          </button>
          {product && onDeleted && (
            <button
              type="button"
              onClick={() => void remove()}
              disabled={busy !== false}
              aria-label="Eliminar produto"
              className="border border-hairline p-2 text-muted transition-colors hover:border-lilac/50 hover:text-paper disabled:opacity-60"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="border border-hairline px-3 py-2 font-display text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:text-paper"
            >
              Fechar
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
