import { useEffect, useRef, useState } from 'react'
import { KeyRound, Lock, X } from 'lucide-react'
import { Logo } from './Logo'

export type AdminDialogMode = 'login' | 'setup' | 'change'

const COPY: Record<AdminDialogMode, { title: string; hint: string; action: string }> = {
  login: {
    title: 'Acesso restrito',
    hint: 'Introduz o PIN para entrar no modo de gestão do catálogo.',
    action: 'Entrar',
  },
  setup: {
    title: 'Definir PIN da loja',
    hint: 'Primeira utilização: escolhe um PIN de 6 a 12 dígitos. Fica guardado apenas como hash — nunca em texto simples.',
    action: 'Guardar PIN',
  },
  change: {
    title: 'Alterar PIN',
    hint: 'Confirma o PIN actual e define o novo.',
    action: 'Alterar',
  },
}

export function AdminDialog({
  mode,
  onClose,
  onLogin,
  onSetup,
  onChange,
}: {
  mode: AdminDialogMode
  onClose: () => void
  onLogin: (pin: string) => Promise<void>
  onSetup: (pin: string) => Promise<void>
  onChange: (currentPin: string, nextPin: string) => Promise<void>
}) {
  const [pin, setPin] = useState('')
  const [nextPin, setNextPin] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const firstField = useRef<HTMLInputElement>(null)
  const copy = COPY[mode]

  useEffect(() => {
    firstField.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    setBusy(true)
    try {
      if (mode === 'login') await onLogin(pin)
      else if (mode === 'setup') await onSetup(pin)
      else await onChange(pin, nextPin)
      onClose()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível continuar.')
      setBusy(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-deep/85 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={copy.title}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="cut-panel panel-in w-full max-w-sm border border-hairline bg-ink p-7">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo size={36} />
            <div>
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-paper">
                {copy.title}
              </h2>
              <p className="mt-0.5 flex items-center gap-1.5 text-[0.62rem] uppercase tracking-[0.18em] text-muted">
                <Lock className="h-3 w-3" /> Painel SYNEX
              </p>
            </div>
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

        <p className="mb-5 text-xs leading-relaxed text-muted">{copy.hint}</p>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="field-label" htmlFor="admin-pin">
              {mode === 'change' ? 'PIN actual' : 'PIN'}
            </label>
            <input
              ref={firstField}
              id="admin-pin"
              className="field font-display tracking-[0.5em]"
              type="password"
              inputMode="numeric"
              autoComplete="off"
              value={pin}
              onChange={(event) => setPin(event.target.value.replace(/\D/g, ''))}
              placeholder="······"
              required
            />
          </div>

          {mode === 'change' && (
            <div>
              <label className="field-label" htmlFor="admin-next-pin">
                Novo PIN
              </label>
              <input
                id="admin-next-pin"
                className="field font-display tracking-[0.5em]"
                type="password"
                inputMode="numeric"
                autoComplete="off"
                value={nextPin}
                onChange={(event) => setNextPin(event.target.value.replace(/\D/g, ''))}
                placeholder="······"
                required
              />
            </div>
          )}

          {error && (
            <p className="border-l-2 border-lilac bg-violet/10 px-3 py-2 text-[0.7rem] leading-relaxed text-paper">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="flex w-full items-center justify-center gap-2 border border-violet bg-violet/25 px-4 py-2.5 font-display text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-paper transition-colors hover:bg-violet/45 disabled:opacity-60"
          >
            <KeyRound className="h-3.5 w-3.5" />
            {busy ? 'A verificar…' : copy.action}
          </button>
        </form>
      </div>
    </div>
  )
}
