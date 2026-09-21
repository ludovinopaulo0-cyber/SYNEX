# SYNEX DIGITAL

Catálogo digital da SYNEX DIGITAL (@sx.synex) — Gift Cards, Game Keys e produtos
digitais para gamers em Angola. Preços em Kwanzas, entrega digital e encomendas
combinadas por DM no Instagram.

O site é uma página única: hero com pesquisa, catálogo filtrável por categoria e
subcategoria, e um painel de gestão protegido por PIN escondido no rodapé.

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework | TanStack Start (React 19, TanStack Router) |
| Build | Vite 7 |
| Estilos | Tailwind CSS 4 + tokens da marca em `src/styles.css` |
| Tipografia | Chakra Petch (títulos/números) + Inter (corpo), via Google Fonts |
| Base de dados | Netlify Database (Postgres) com Drizzle ORM |
| Imagens dos produtos | Netlify Blobs + Netlify Image CDN |
| Ícones | lucide-react |
| Alojamento | Netlify |

## Correr localmente

```bash
pnpm install
netlify dev --port 8889
```

`netlify dev` é necessário para ligar a base de dados e o armazenamento de
imagens ao ambiente local. As migrações em `netlify/database/migrations/` são
aplicadas automaticamente pela Netlify em cada deploy.

## Primeiro acesso ao painel de gestão

1. No rodapé do site há um pequeno ícone de cadeado — é o acesso ao painel.
2. Na primeira utilização pede para **definir um PIN** de 6 a 12 dígitos. O PIN
   é guardado apenas como hash (scrypt com salt), nunca em texto simples.
3. Depois disso, o mesmo cadeado pede o PIN. A sessão dura enquanto o separador
   do browser estiver aberto e pode ser terminada em "Sair".
4. Se o PIN se perder, define a variável de ambiente `SYNEX_ADMIN_PIN` nas
   Environment variables do site na Netlify: passa a ser esse o PIN válido.

Após 5 tentativas erradas o acesso fica bloqueado 15 minutos.

## O que o painel permite

Em modo administrador, cada card do catálogo passa a formulário: nome, preço,
imagem e, num bloco "Mais detalhes" recolhido, categoria, subcategoria,
plataforma, região, tipo e disponibilidade. Há ainda "Novo produto" e a opção de
eliminar. As imagens enviadas são recortadas para quadrado 1:1 (corte central) e
comprimidas — sem filtros, molduras, texto ou alterações de cor.

## Notas

- O catálogo inicial (23 produtos) está em `src/data/catalog.ts` e é carregado
  para a base de dados na primeira visita. A partir daí a fonte de verdade é a
  base de dados, e o painel é o sítio para mudar preços e stock.
- O Instagram não permite abrir um DM com texto pré-preenchido. O botão
  "Encomendar" copia a mensagem da encomenda para a área de transferência e abre
  a conversa — o cliente só tem de colar e enviar.
- Publicação: qualquer alteração ao repositório gera um novo deploy na Netlify. O
  link do site é o que deve ficar na bio do Instagram.
