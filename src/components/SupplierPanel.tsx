import { useEffect, useRef, useState } from 'react'
import { Check, Copy, Loader2, Search, ShoppingCart, X } from 'lucide-react'
import {
  supplierBalance,
  supplierGameKeyOffers,
  supplierGiftCardOffers,
  supplierOrderGameKey,
  supplierOrderGiftCard,
  supplierOrderStatus,
  supplierSearchGameKeys,
  supplierSearchGiftCards,
} from '@/server/supplier.functions'

type Tab = 'giftcards' | 'gamekeys'

interface Category {
  id: string
  label: string
}

interface Offer {
  id: string
  name: string
  price_usd: string
  stock: number
  min_quantity: number
  max_quantity: number
}

interface OrderResult {
  number: number
  status: string
  status_reason: string | null
  fail_code: string | null
  charged_usd: string
  name: string
  quantity: number
  codes: Array<string>
}

const FAIL_MESSAGES: Record<string, string> = {
  out_of_stock: 'Esgotou antes de conseguirmos encomendar. Tenta mais tarde.',
  stock_short: 'Não havia stock suficiente para a quantidade pedida.',
  price_changed: 'O preço mudou entretanto. Consulta outra vez.',
  offer_gone: 'Este item deixou de estar disponível.',
  account_problem: 'Dados do destinatário rejeitados.',
  region_restricted: 'Esta região não é elegível para este item.',
  limit_exceeded: 'Limite de quantidade ou frequência atingido.',
  timed_out: 'Demorou demasiado tempo a concluir.',
  cancelled: 'O pedido foi cancelado antes de terminar.',
  declined: 'O fornecedor recusou o pedido.',
}

export function SupplierPanel({
  token,
  onClose,
}: {
  token: string
  onClose: () => void
}) {
  const [tab, setTab] = useState<Tab>('giftcards')
  const [balance, setBalance] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [categories, setCategories] = useState<Array<Category>>([])
  const [searching, setSearching] = useState(false)
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)
  const [offers, setOffers] = useState<Array<Offer>>([])
  const [loadingOffers, setLoadingOffers] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [order, setOrder] = useState<OrderResult | null>(null)
  const [placingId, setPlacingId] = useState<string | null>(null)
  const pollTimer = useRef<number | null>(null)

  useEffect(() => {
    void supplierBalance({ data: { token } })
      .then((res) => setBalance(res?.balance_usd ?? null))
      .catch(() => setBalance(null))
    return () => {
      if (pollTimer.current) window.clearTimeout(pollTimer.current)
    }
  }, [token])

  function resetResults() {
    setCategories([])
    setActiveCategory(null)
    setOffers([])
    setOrder(null)
    setError(null)
  }

  function switchTab(next: Tab) {
    setTab(next)
    setQuery('')
    resetResults()
  }

  async function search(event?: React.FormEvent) {
    event?.preventDefault()
    setSearching(true)
    setError(null)
    setActiveCategory(null)
    setOffers([])
    setOrder(null)
    try {
      if (tab === 'giftcards') {
        const res = await supplierSearchGiftCards({ data: { token, q: query } })
        setCategories(
          (res?.data ?? []).map((c) => ({ id: c.category_id, label: c.name })),
        )
      } else {
        const res = await supplierSearchGameKeys({ data: { token, q: query } })
        setCategories(
          (res?.data ?? []).map((g) => ({
            id: g.game_id,
            label: `${g.name} · ${g.platform} · ${g.region}`,
          })),
        )
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Falha na pesquisa.')
    } finally {
      setSearching(false)
    }
  }

  async function openCategory(category: Category) {
    setActiveCategory(category)
    setOffers([])
    setOrder(null)
    setError(null)
    setLoadingOffers(true)
    try {
      if (tab === 'giftcards') {
        const res = await supplierGiftCardOffers({ data: { token, categoryId: category.id } })
        setOffers(
          (res?.offers ?? []).map((o) => ({
            id: o.card_id,
            name: o.name,
            price_usd: o.price_usd,
            stock: o.stock,
            min_quantity: o.min_quantity,
            max_quantity: o.max_quantity,
          })),
        )
      } else {
        const res = await supplierGameKeyOffers({ data: { token, gameId: category.id } })
        setOffers(
          (res?.keys ?? []).map((o) => ({
            id: o.key_id,
            name: o.name,
            price_usd: o.price_usd,
            stock: o.stock,
            min_quantity: o.min_quantity,
            max_quantity: o.max_quantity,
          })),
        )
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não consegui carregar os preços.')
    } finally {
      setLoadingOffers(false)
    }
  }

  function poll(number: number) {
    pollTimer.current = window.setTimeout(async () => {
      try {
        const res = await supplierOrderStatus({ data: { token, number } })
        if (!res) return
        setOrder((prev) =>
          prev
            ? {
                ...prev,
                status: res.status,
                status_reason: res.status_reason,
                fail_code: res.fail_code,
                codes: res.codes ?? res.keys ?? [],
              }
            : prev,
        )
        if (res.status === 'created' || res.status === 'processing') {
          poll(number)
        }
      } catch {
        // a próxima tentativa de polling resolve-se sozinha; não interrompe o ecrã
        poll(number)
      }
    }, 2500)
  }

  async function buy(offer: Offer) {
    if (!activeCategory) return
    setPlacingId(offer.id)
    setError(null)
    try {
      const res =
        tab === 'giftcards'
          ? await supplierOrderGiftCard({
              data: { token, categoryId: activeCategory.id, cardId: offer.id, quantity: 1 },
            })
          : await supplierOrderGameKey({
              data: { token, gameId: activeCategory.id, keyId: offer.id, quantity: 1 },
            })
      if (!res) return
      setOrder({
        number: res.number,
        status: res.status,
        status_reason: res.status_reason,
        fail_code: res.fail_code,
        charged_usd: res.charged_usd,
        name: res.card_name ?? res.key_name ?? offer.name,
        quantity: res.quantity ?? 1,
        codes: res.codes ?? res.keys ?? [],
      })
      if (res.status === 'created' || res.status === 'processing') {
        poll(res.number)
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível encomendar.')
    } finally {
      setPlacingId(null)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-deep/85 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Fornecedor"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="cut-panel panel-in flex max-h-[85vh] w-full max-w-lg flex-col border border-hairline bg-ink p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-paper">
              Fornecedor · ReSellCodes
            </h2>
            <p className="mt-0.5 text-[0.66rem] uppercase tracking-[0.16em] text-muted">
              {balance !== null ? `Saldo: ${balance} USD` : 'A carregar saldo…'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="text-muted transition-colors hover:text-paper"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-4 flex gap-2">
          <button
            type="button"
            onClick={() => switchTab('giftcards')}
            className={`flex-1 border px-3 py-2 font-display text-[0.64rem] font-semibold uppercase tracking-[0.16em] transition-colors ${
              tab === 'giftcards'
                ? 'border-violet bg-violet/25 text-paper'
                : 'border-hairline text-muted hover:text-paper'
            }`}
          >
            Giftcards
          </button>
          <button
            type="button"
            onClick={() => switchTab('gamekeys')}
            className={`flex-1 border px-3 py-2 font-display text-[0.64rem] font-semibold uppercase tracking-[0.16em] transition-colors ${
              tab === 'gamekeys'
                ? 'border-violet bg-violet/25 text-paper'
                : 'border-hairline text-muted hover:text-paper'
            }`}
          >
            Jogos (chaves)
          </button>
        </div>

        <form onSubmit={search} className="mb-4 flex gap-2">
          <input
            className="field flex-1"
            placeholder={tab === 'giftcards' ? 'Ex: roblox, psn, netflix…' : 'Ex: GTA, FC 26…'}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button
            type="submit"
            disabled={searching}
            className="flex items-center gap-1.5 bg-violet px-3 py-2 font-display text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-paper disabled:opacity-60"
          >
            {searching ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Search className="h-3.5 w-3.5" />}
            Pesquisar
          </button>
        </form>

        <div className="flex-1 overflow-y-auto">
          {error && (
            <p className="mb-3 border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-300">
              {error}
            </p>
          )}

          {!activeCategory && categories.length > 0 && (
            <ul className="space-y-1.5">
              {categories.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => void openCategory(c)}
                    className="w-full border border-hairline px-3 py-2 text-left text-xs text-paper transition-colors hover:border-lilac/50"
                  >
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {activeCategory && (
            <div>
              <button
                type="button"
                onClick={resetResults}
                className="mb-3 text-[0.64rem] uppercase tracking-[0.16em] text-lilac hover:underline"
              >
                ← Voltar à pesquisa
              </button>

              {loadingOffers && (
                <p className="flex items-center gap-2 text-xs text-muted">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> A carregar preços…
                </p>
              )}

              {!loadingOffers && !order && (
                <ul className="space-y-2">
                  {offers.map((o) => (
                    <li
                      key={o.id}
                      className="flex items-center justify-between gap-3 border border-hairline px-3 py-2"
                    >
                      <div>
                        <p className="text-xs text-paper">{o.name}</p>
                        <p className="text-[0.64rem] text-muted">
                          {o.price_usd} USD · stock {o.stock}
                        </p>
                      </div>
                      <button
                        type="button"
                        disabled={placingId === o.id || o.stock < 1}
                        onClick={() => void buy(o)}
                        className="flex shrink-0 items-center gap-1.5 bg-violet px-3 py-1.5 font-display text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-paper disabled:opacity-50"
                      >
                        {placingId === o.id ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <ShoppingCart className="h-3 w-3" />
                        )}
                        Comprar
                      </button>
                    </li>
                  ))}
                  {offers.length === 0 && (
                    <p className="text-xs text-muted">Sem ofertas disponíveis neste item.</p>
                  )}
                </ul>
              )}

              {order && <OrderStatusCard order={order} />}
            </div>
          )}

          {!activeCategory && categories.length === 0 && !searching && (
            <p className="text-xs text-muted">
              Pesquisa por um produto acima para veres os preços atuais do fornecedor.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function OrderStatusCard({ order }: { order: OrderResult }) {
  const [copied, setCopied] = useState<string | null>(null)

  const copy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(code)
      window.setTimeout(() => setCopied(null), 1500)
    } catch {
      // clipboard indisponível — o código continua visível para copiar à mão
    }
  }

  const pending = order.status === 'created' || order.status === 'processing'
  const failed = order.status === 'failed' || order.status === 'refund'

  return (
    <div className="border border-violet/40 bg-violet/10 p-4">
      <p className="text-xs text-paper">
        Pedido #{order.number} · {order.name}
      </p>
      <p className="mt-1 text-[0.64rem] text-muted">Cobrado: {order.charged_usd} USD</p>

      {pending && (
        <p className="mt-3 flex items-center gap-2 text-xs text-lilac">
          <Loader2 className="h-3.5 w-3.5 animate-spin" /> A processar no fornecedor…
        </p>
      )}

      {failed && (
        <p className="mt-3 text-xs text-red-300">
          {(order.fail_code && FAIL_MESSAGES[order.fail_code]) ||
            order.status_reason ||
            'O pedido falhou. O saldo foi devolvido automaticamente.'}
        </p>
      )}

      {order.status === 'completed' && order.codes.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {order.codes.map((code) => (
            <li
              key={code}
              className="flex items-center justify-between gap-2 border border-hairline bg-ink px-2.5 py-1.5 font-display text-xs text-paper"
            >
              <span className="truncate">{code}</span>
              <button
                type="button"
                onClick={() => void copy(code)}
                className="shrink-0 text-muted hover:text-lilac"
                aria-label="Copiar código"
              >
                {copied === code ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
