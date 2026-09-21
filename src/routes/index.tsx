import { useEffect, useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  ArrowRight,
  Check,
  Instagram,
  Lock,
  LogOut,
  MessageCircle,
  Plus,
  Search,
  ShieldCheck,
  Wallet,
  X,
  Zap,
} from 'lucide-react'
import { AdminDialog } from '@/components/AdminDialog'
import type { AdminDialogMode } from '@/components/AdminDialog'
import { AdminProductForm } from '@/components/AdminProductForm'
import { Logo, Wordmark } from '@/components/Logo'
import { ProductCard } from '@/components/ProductCard'
import { CATEGORIES, categoryLabel, subcategoryLabel } from '@/data/catalog'
import { BRAND, orderMessage } from '@/lib/brand'
import { useAdmin } from '@/lib/useAdmin'
import { getProducts } from '@/server/catalog.functions'
import type { Product } from '@/lib/types'

export const Route = createFileRoute('/')({
  loader: async () => ({ products: await getProducts() }),
  component: Home,
})

const HERO_ART = '/img/hero-backdrop.png'

function fold(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}

function Home() {
  const { products: initial } = Route.useLoaderData()
  const [products, setProducts] = useState<Array<Product>>(initial)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [subcategory, setSubcategory] = useState<string | null>(null)
  const [dialog, setDialog] = useState<AdminDialogMode | null>(null)
  const [creating, setCreating] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const admin = useAdmin()

  useEffect(() => setProducts(initial), [initial])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(null), 4200)
    return () => window.clearTimeout(timer)
  }, [toast])

  /** Só são listadas as categorias que têm produtos. */
  const activeCategories = useMemo(() => {
    const used = new Set(products.map((product) => product.category))
    const known = CATEGORIES.filter((entry) => used.has(entry.id)).map(
      (entry) => entry.id,
    )
    const extra = [...used].filter(
      (id) => !CATEGORIES.some((entry) => entry.id === id),
    )
    return [...known, ...extra]
  }, [products])

  /** Idem para as subcategorias dentro da categoria escolhida. */
  const activeSubcategories = useMemo(() => {
    if (category === 'all') return []
    const seen: Array<string> = []
    for (const product of products) {
      if (product.category !== category) continue
      if (!seen.includes(product.subcategory)) seen.push(product.subcategory)
    }
    return seen
  }, [products, category])

  const searching = query.trim().length > 0

  const visible = useMemo(() => {
    if (searching) {
      const needle = fold(query.trim())
      return products.filter((product) => fold(product.name).includes(needle))
    }
    return products.filter((product) => {
      if (category !== 'all' && product.category !== category) return false
      if (subcategory && product.subcategory !== subcategory) return false
      return true
    })
  }, [products, query, category, subcategory, searching])

  const order = async (product: Product) => {
    const message = orderMessage(product)
    try {
      await navigator.clipboard.writeText(message)
      setToast('Mensagem copiada. Cola no DM e envia.')
    } catch {
      setToast('Abre o DM e diz-nos qual o produto que queres.')
    }
    window.open(BRAND.instagramDm, '_blank', 'noopener,noreferrer')
  }

  const upsert = (saved: Product) =>
    setProducts((current) =>
      current.some((product) => product.id === saved.id)
        ? current.map((product) => (product.id === saved.id ? saved : product))
        : [...current, saved],
    )

  const isAdmin = admin.token !== null

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink">
      <div className="grain" />

      {/* ---------------- Cabeçalho ---------------- */}
      <header className="sticky top-0 z-40 border-b border-hairline bg-ink/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
          <div className="flex items-center gap-3">
            <Logo size={38} />
            <Wordmark />
          </div>
          <a
            href={BRAND.instagramProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-hairline px-3 py-1.5 font-display text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:border-lilac/50 hover:text-paper"
          >
            <Instagram className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">@{BRAND.instagramHandle}</span>
          </a>
        </div>
      </header>

      {/* ---------------- Hero ---------------- */}
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-y-0 right-0 w-[72%] bg-cover bg-center opacity-70"
          style={{ backgroundImage: `url("${HERO_ART}")` }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(95deg, #0f172a 0%, rgba(15,23,42,0.96) 34%, rgba(15,23,42,0.55) 62%, rgba(15,23,42,0.85) 100%)',
          }}
          aria-hidden="true"
        />
        <div className="hairline-grid absolute inset-0 opacity-60" aria-hidden="true" />

        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-16 sm:pt-24">
          <div className="max-w-2xl">
            <p
              className="rise inline-flex items-center gap-2 border-l-2 border-lilac pl-3 font-display text-[0.66rem] font-medium uppercase tracking-[0.28em] text-lilac"
              style={{ animationDelay: '40ms' }}
            >
              Entrega digital · Pagamento em Kz
            </p>

            <h1
              className="rise mt-6 font-display text-[2.45rem] font-bold leading-[1.04] tracking-tight text-paper sm:text-[3.6rem]"
              style={{ animationDelay: '110ms' }}
            >
              O teu próximo jogo
              <br />
              <span className="text-lilac">começa aqui.</span>
            </h1>

            <p
              className="rise mt-5 max-w-lg text-[0.95rem] leading-relaxed text-muted sm:text-base"
              style={{ animationDelay: '180ms' }}
            >
              Gift Cards, Game Keys e produtos digitais para gamers em Angola.
            </p>

            <ul
              className="rise mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.7rem] uppercase tracking-[0.16em] text-muted"
              style={{ animationDelay: '240ms' }}
            >
              <li className="flex items-center gap-2">
                <Zap className="h-3.5 w-3.5 text-lilac" /> Entrega digital
              </li>
              <li className="flex items-center gap-2">
                <Wallet className="h-3.5 w-3.5 text-lilac" /> Pagamento em Kz
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-3.5 w-3.5 text-lilac" /> Atendimento online
              </li>
            </ul>

            <div
              className="rise mt-9 flex flex-wrap items-center gap-3"
              style={{ animationDelay: '300ms' }}
            >
              <a
                href="#catalogo"
                className="group flex items-center gap-2 border border-violet bg-violet/30 px-6 py-3 font-display text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-paper transition-colors hover:bg-violet/55"
              >
                Ver produtos
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={BRAND.instagramDm}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-hairline px-6 py-3 font-display text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-muted transition-colors hover:border-lilac/60 hover:text-paper"
              >
                <Instagram className="h-3.5 w-3.5" />
                Fala connosco
              </a>
            </div>

            <div
              className="rise mt-10 flex max-w-md items-center gap-3 border border-hairline bg-ink-deep/70 px-4 py-3 backdrop-blur-sm focus-within:border-lilac/60"
              style={{ animationDelay: '360ms' }}
            >
              <Search className="h-4 w-4 shrink-0 text-muted" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Procurar produto: PSN, Robux, Netflix…"
                aria-label="Procurar produto"
                className="w-full bg-transparent text-sm text-paper outline-none placeholder:text-muted/70"
              />
              {searching && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Limpar pesquisa"
                  className="text-muted transition-colors hover:text-paper"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="rule-glow h-px w-full" aria-hidden="true" />
      </section>

      {/* ---------------- Catálogo ---------------- */}
      <section id="catalogo" className="relative mx-auto max-w-6xl px-5 py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-bold uppercase tracking-[0.16em] text-paper">
              {searching ? (
                <>
                  Resultados para{' '}
                  <span className="text-lilac">“{query.trim()}”</span>
                </>
              ) : (
                'Catálogo'
              )}
            </h2>
            <p className="mt-1.5 text-[0.7rem] uppercase tracking-[0.18em] text-muted">
              {visible.length} {visible.length === 1 ? 'produto' : 'produtos'}
              {!searching && category !== 'all' && ` · ${categoryLabel(category)}`}
            </p>
          </div>
          {isAdmin && (
            <button
              type="button"
              onClick={() => setCreating((value) => !value)}
              className="flex items-center gap-2 border border-violet bg-violet/25 px-4 py-2 font-display text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-paper transition-colors hover:bg-violet/45"
            >
              <Plus className="h-3.5 w-3.5" /> Novo produto
            </button>
          )}
        </div>

        {!searching && (
          <div className="mt-7 space-y-4">
            <div className="flex flex-wrap gap-2">
              <CategoryTab
                label="Todos"
                active={category === 'all'}
                onClick={() => {
                  setCategory('all')
                  setSubcategory(null)
                }}
              />
              {activeCategories.map((id) => (
                <CategoryTab
                  key={id}
                  label={categoryLabel(id)}
                  active={category === id}
                  onClick={() => {
                    setCategory(id)
                    setSubcategory(null)
                  }}
                />
              ))}
            </div>

            {activeSubcategories.length > 1 && (
              <div className="flex flex-wrap gap-2 border-l border-hairline pl-3">
                <Pill
                  label="Tudo"
                  active={subcategory === null}
                  onClick={() => setSubcategory(null)}
                />
                {activeSubcategories.map((id) => (
                  <Pill
                    key={id}
                    label={subcategoryLabel(id)}
                    active={subcategory === id}
                    onClick={() => setSubcategory(id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {isAdmin && creating && admin.token && (
            <AdminProductForm
              product={null}
              token={admin.token}
              onSaved={upsert}
              onCancel={() => setCreating(false)}
            />
          )}

          {visible.map((product, index) =>
            isAdmin && admin.token ? (
              <AdminProductForm
                key={product.id}
                product={product}
                token={admin.token}
                onSaved={upsert}
                onDeleted={(id) =>
                  setProducts((current) =>
                    current.filter((entry) => entry.id !== id),
                  )
                }
              />
            ) : (
              <div key={product.id} className="rise">
                <ProductCard product={product} onOrder={order} index={index} />
              </div>
            ),
          )}
        </div>

        {visible.length === 0 && (
          <div className="cut-panel mt-6 border border-hairline bg-ink-raised/40 px-6 py-14 text-center">
            <Search className="mx-auto h-7 w-7 text-lilac/60" strokeWidth={1.25} />
            <p className="mt-4 font-display text-sm font-semibold uppercase tracking-[0.18em] text-paper">
              Sem resultados
            </p>
            <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-muted">
              Não temos nada com esse nome à vista. Pede pelo DM — muita coisa
              entra por encomenda.
            </p>
            <a
              href={BRAND.instagramDm}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 border border-violet bg-violet/25 px-5 py-2.5 font-display text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-paper transition-colors hover:bg-violet/45"
            >
              <Instagram className="h-3.5 w-3.5" /> Pedir no Instagram
            </a>
          </div>
        )}
      </section>

      {/* ---------------- Como funciona ---------------- */}
      <section className="border-t border-hairline bg-ink-deep/60">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:grid-cols-3">
          {[
            {
              step: '01',
              title: 'Escolhe o produto',
              body: 'Procura pelo nome ou navega pelas categorias. Os preços estão todos em Kwanzas.',
            },
            {
              step: '02',
              title: 'Fala pelo Instagram',
              body: 'O botão Encomendar copia os dados do produto e abre o nosso DM. Combinamos o pagamento aí.',
            },
            {
              step: '03',
              title: 'Recebes o código',
              body: 'Entrega digital: o código ou a conta chegam pela mesma conversa, sem envios nem esperas.',
            },
          ].map((item) => (
            <div key={item.step} className="flex gap-4">
              <span className="font-display text-2xl font-bold text-violet/70">
                {item.step}
              </span>
              <div>
                <h3 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-paper">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Rodapé ---------------- */}
      <footer className="border-t border-hairline">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Logo size={34} />
            <div>
              <Wordmark />
              <p className="mt-1 text-[0.66rem] uppercase tracking-[0.16em] text-muted">
                Produtos digitais · Angola
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={BRAND.instagramProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.16em] text-muted transition-colors hover:text-paper"
            >
              <Instagram className="h-3.5 w-3.5" /> @{BRAND.instagramHandle}
            </a>
            <button
              type="button"
              onClick={() =>
                setDialog(admin.configured === false ? 'setup' : 'login')
              }
              aria-label="Acesso ao painel de gestão"
              title="Gestão"
              className="text-muted/25 transition-colors hover:text-lilac/70"
            >
              <Lock className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </footer>

      {/* ---------------- Barra de administração ---------------- */}
      {isAdmin && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-violet/40 bg-ink-deep/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-3">
            <p className="flex items-center gap-2 font-display text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-lilac">
              <ShieldCheck className="h-3.5 w-3.5" /> Modo administrador
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDialog('change')}
                className="border border-hairline px-3 py-1.5 font-display text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:text-paper"
              >
                Alterar PIN
              </button>
              <button
                type="button"
                onClick={() => void admin.logout()}
                className="flex items-center gap-1.5 border border-hairline px-3 py-1.5 font-display text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:text-paper"
              >
                <LogOut className="h-3 w-3" /> Sair
              </button>
            </div>
          </div>
        </div>
      )}

      {dialog && (
        <AdminDialog
          mode={dialog}
          onClose={() => setDialog(null)}
          onLogin={admin.login}
          onSetup={admin.setup}
          onChange={admin.changePin}
        />
      )}

      {toast && (
        <div className="panel-in fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2.5 border border-lilac/40 bg-ink-deep/95 px-4 py-3 text-xs text-paper shadow-[0_18px_40px_-18px_rgba(124,58,237,0.7)] backdrop-blur-md">
          <Check className="h-4 w-4 shrink-0 text-lilac" />
          {toast}
        </div>
      )}
    </div>
  )
}

function CategoryTab({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cut-chip px-4 py-2 font-display text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition-colors ${
        active
          ? 'bg-violet/35 text-paper ring-1 ring-inset ring-violet'
          : 'bg-ink-raised/50 text-muted hover:bg-ink-raised hover:text-paper'
      }`}
    >
      {label}
    </button>
  )
}

function Pill({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-[0.66rem] uppercase tracking-[0.14em] transition-colors ${
        active
          ? 'border-lilac/70 text-paper'
          : 'border-hairline text-muted hover:border-lilac/40 hover:text-paper'
      }`}
    >
      {label}
    </button>
  )
}
