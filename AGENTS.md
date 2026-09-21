# AGENTS.md

Catálogo digital da SYNEX DIGITAL. Ver `README.md` para contexto de produto e
instruções de arranque. O pedido original foi implementado por completo — não há
PLAN.md.

## Arquitectura

Página única em TanStack Start. O browser recebe o catálogo pelo loader da rota
`/`; todas as escritas passam por server functions que validam a sessão de
administrador antes de tocar na base de dados.

```
db/
  schema.ts                  # products, settings, admin_sessions (Drizzle)
  index.ts                   # cliente Drizzle sobre Netlify Database
netlify/database/migrations/ # aplicadas automaticamente pela Netlify
src/
  data/catalog.ts            # taxonomia + catálogo inicial (carga única)
  lib/
    brand.ts                 # marca, links do Instagram, mensagem de encomenda
    format.ts                # preços em Kz e URLs do Image CDN
    imageCrop.ts             # recorte 1:1 no browser antes do upload
    types.ts                 # Product / ProductInput (lado cliente)
    useAdmin.ts              # sessão do painel (sessionStorage)
  server/
    admin.server.ts          # authenticateAdmin, PIN, sessões, bloqueio
    admin.functions.ts       # server functions de autenticação
    catalog.server.ts        # leitura/escrita de produtos + carga inicial
    catalog.functions.ts     # server functions do catálogo (protegidas)
    images.server.ts         # Netlify Blobs
  components/                # Logo, ProductCard, AdminDialog, AdminProductForm
  routes/
    __root.tsx               # documento, meta/OG
    index.tsx                # storefront + modo administrador
    api/image.$.ts           # serve imagens dos blobs (origem do Image CDN)
```

## Decisões não óbvias

- **Autenticação num só ponto.** `authenticateAdmin(pin)` em
  `src/server/admin.server.ts` é o único sítio que valida credenciais. Trocar por
  Identity/Supabase/API própria é substituir essa função e manter o resto igual.
- **PIN com hash, não constante.** O PIN é guardado como `scrypt$salt$hash` na
  tabela `settings`, definido pelo dono no primeiro acesso. `SYNEX_ADMIN_PIN`
  (variável de ambiente) tem prioridade e serve de recuperação.
- **Sessões na base de dados.** O token vive no `sessionStorage` e é enviado em
  cada mutação; o servidor valida-o contra `admin_sessions` (12 h). A validação é
  sempre do lado do servidor — o modo admin do cliente é apenas interface.
- **Carga inicial idempotente.** `seedIfEmpty()` só corre com a tabela vazia e usa
  `seed_id` único, por isso produtos apagados não reaparecem.
- **Imagens.** Recortadas para 1:1 e comprimidas no browser (`imageCrop.ts`),
  guardadas em Netlify Blobs e servidas via `/api/image/*` através do Image CDN.
  Nunca aplicar filtros, texto, molduras ou alterações de cor.
- **Categorias.** A interface só mostra categorias e subcategorias que têm
  produtos; a taxonomia completa vive em `src/data/catalog.ts`.

## Convenções

- Componentes em PascalCase, hooks/utilitários em camelCase, imports via `@/`.
- Zod em `.inputValidator(...)` de todas as server functions com entrada
  (`.validator(...)` não existe nesta versão).
- Texto de interface em português de Angola/Portugal; sem emojis na interface —
  usar ícones lucide.
- Paleta e tipografia apenas através dos tokens `@theme` de `src/styles.css`
  (`ink`, `violet`, `lilac`, `paper`, `muted`, `hairline`).
- Motivo angular da marca: classes `cut-card`, `cut-chip`, `cut-panel`.
- Alterações ao `db/schema.ts` exigem `npx drizzle-kit generate --name <nome>`;
  nunca aplicar migrações à mão.
