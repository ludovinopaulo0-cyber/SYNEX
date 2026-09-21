import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import '../styles.css'

const DESCRIPTION =
  'Gift Cards, Game Keys e produtos digitais para gamers em Angola. Entrega digital, pagamento em Kwanzas e atendimento pelo Instagram.'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'SYNEX DIGITAL — Gift Cards e Game Keys em Angola' },
      { name: 'description', content: DESCRIPTION },
      { name: 'theme-color', content: '#0f172a' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'SYNEX DIGITAL' },
      {
        property: 'og:title',
        content: 'SYNEX DIGITAL — O teu próximo jogo começa aqui.',
      },
      { property: 'og:description', content: DESCRIPTION },
      {
        property: 'og:image',
        content:
          '/img/hero-backdrop.png',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-ink px-6 text-center">
      <div>
        <p className="font-display text-5xl font-bold text-violet/70">404</p>
        <h1 className="mt-4 font-display text-lg font-semibold uppercase tracking-[0.18em] text-paper">
          Página não encontrada
        </h1>
        <a
          href="/"
          className="mt-7 inline-block border border-violet bg-violet/25 px-5 py-2.5 font-display text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-paper transition-colors hover:bg-violet/45"
        >
          Voltar ao catálogo
        </a>
      </div>
    </main>
  )
}

export { Outlet }
