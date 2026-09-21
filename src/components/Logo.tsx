/**
 * Monograma da SYNEX. Repete o corte diagonal do "K" do logótipo original —
 * para trocar pelo ficheiro do dono da loja, substituir o bloco interior por
 * uma <img src="/img/logo.png" />.
 */
export function Logo({ size = 40 }: { size?: number }) {
  return (
    <span
      className="cut-chip relative grid place-items-center overflow-hidden border border-hairline bg-ink-deep"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <span
        className="absolute inset-0 opacity-90"
        style={{
          background:
            'linear-gradient(135deg, rgba(124,58,237,0.95) 0%, rgba(124,58,237,0.25) 55%, rgba(15,23,42,0.9) 100%)',
        }}
      />
      <span
        className="absolute -right-1 top-0 h-full w-px rotate-[22deg] bg-lilac/50"
        style={{ transformOrigin: 'top' }}
      />
      <span
        className="relative font-display font-bold leading-none tracking-tight text-paper"
        style={{ fontSize: size * 0.42 }}
      >
        SX
      </span>
    </span>
  )
}

export function Wordmark() {
  return (
    <span className="flex items-baseline gap-2">
      <span className="font-display text-[1.05rem] font-bold tracking-[0.22em] text-paper">
        SYNEX
      </span>
      <span className="font-display text-[0.6rem] font-medium tracking-[0.32em] text-muted">
        DIGITAL
      </span>
    </span>
  )
}
