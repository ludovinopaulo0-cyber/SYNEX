import { useRef, useState } from 'react'
import { ImagePlus, Loader2, Quote, Save, Star, Trash2, X } from 'lucide-react'
import { cropToSquareDataUrl } from '@/lib/imageCrop'
import {
  createTestimonial,
  deleteTestimonial,
  updateTestimonial,
} from '@/server/testimonials.functions'
import type { Testimonial, TestimonialInput } from '@/lib/types'

const EMPTY: TestimonialInput = {
  name: '',
  text: '',
  rating: 5,
  imageData: null,
}

function toInput(item: Testimonial): TestimonialInput {
  return {
    name: item.name,
    text: item.text,
    rating: item.rating,
    imageData: item.imageData,
  }
}

export function AdminTestimonialForm({
  testimonial,
  token,
  onSaved,
  onDeleted,
  onCancel,
}: {
  testimonial: Testimonial | null
  token: string
  onSaved: (item: Testimonial) => void
  onDeleted?: (id: number) => void
  onCancel?: () => void
}) {
  const [form, setForm] = useState<TestimonialInput>(
    testimonial ? toInput(testimonial) : EMPTY,
  )
  const [busy, setBusy] = useState<false | 'save' | 'image' | 'delete'>(false)
  const [error, setError] = useState<string | null>(null)
  const fileInput = useRef<HTMLInputElement>(null)

  const patch = (changes: Partial<TestimonialInput>) =>
    setForm((current) => ({ ...current, ...changes }))

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
    const payload: TestimonialInput = {
      ...form,
      name: form.name.trim(),
      text: form.text.trim(),
    }
    if (!payload.name || !payload.text) {
      setError('Preenche o nome e o texto do depoimento.')
      return
    }
    setBusy('save')
    try {
      const saved = testimonial
        ? await updateTestimonial({
            data: { token, id: testimonial.id, testimonial: payload },
          })
        : await createTestimonial({ data: { token, testimonial: payload } })
      onSaved(saved)
      if (!testimonial) setForm(EMPTY)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível guardar.')
    } finally {
      setBusy(false)
    }
  }

  const remove = async () => {
    if (!testimonial || !onDeleted) return
    if (!window.confirm(`Eliminar o depoimento de "${testimonial.name}"?`)) return
    setBusy('delete')
    try {
      await deleteTestimonial({ data: { token, id: testimonial.id } })
      onDeleted(testimonial.id)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível eliminar.')
      setBusy(false)
    }
  }

  return (
    <article className="cut-card relative flex flex-col gap-3 border border-violet/45 bg-ink-raised/70 p-4">
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          aria-label="Fechar"
          className="absolute right-3 top-3 text-muted hover:text-paper"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}

      <div className="flex items-center gap-3">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden border border-hairline bg-ink">
          {form.imageData ? (
            <img src={form.imageData} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted">
              <Quote className="h-5 w-5" />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            disabled={busy === 'image'}
            className="flex items-center gap-1.5 border border-hairline px-2 py-1 font-display text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:border-lilac/60"
          >
            {busy === 'image' ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <ImagePlus className="h-3 w-3" />
            )}
            {form.imageData ? 'Trocar foto' : 'Adicionar foto'}
          </button>
          {form.imageData && (
            <button
              type="button"
              onClick={() => patch({ imageData: null })}
              className="font-display text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-muted hover:text-paper"
            >
              Remover foto
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

      <div>
        <label className="field-label">Nome do cliente</label>
        <input
          className="field"
          value={form.name}
          onChange={(event) => patch({ name: event.target.value })}
          placeholder="Jérsson M."
        />
      </div>

      <div>
        <label className="field-label">Depoimento</label>
        <textarea
          className="field min-h-[72px] resize-y"
          value={form.text}
          onChange={(event) => patch({ text: event.target.value })}
          placeholder="O que o cliente disse…"
        />
      </div>

      <div>
        <label className="field-label">Avaliação</label>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => {
            const value = i + 1
            const filled = value <= form.rating
            return (
              <button
                key={value}
                type="button"
                onClick={() => patch({ rating: value })}
                aria-label={`${value} estrelas`}
                className="p-0.5"
              >
                <Star
                  className={`h-4 w-4 ${filled ? 'fill-lilac text-lilac' : 'text-hairline'}`}
                />
              </button>
            )
          })}
        </div>
      </div>

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
          {testimonial ? 'Guardar' : 'Adicionar'}
        </button>
        {testimonial && onDeleted && (
          <button
            type="button"
            onClick={() => void remove()}
            disabled={busy !== false}
            className="flex items-center justify-center gap-1.5 border border-hairline px-3 py-2 font-display text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:border-red-400/60 hover:text-red-300 disabled:opacity-60"
          >
            {busy === 'delete' ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Trash2 className="h-3 w-3" />
            )}
          </button>
        )}
      </div>
    </article>
  )
}
