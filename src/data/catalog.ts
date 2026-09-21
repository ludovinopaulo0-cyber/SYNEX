/**
 * Taxonomia e catálogo inicial da SYNEX DIGITAL.
 *
 * Este ficheiro é a carga inicial da base de dados: depois do primeiro arranque
 * a fonte de verdade passa a ser a tabela `products` (editável no painel admin).
 */

export type CategoryId =
  | 'gaming'
  | 'gift-cards'
  | 'entretenimento'
  | 'jogos-digitais'

export interface CategoryMeta {
  id: CategoryId
  label: string
  /** Subcategorias sugeridas no painel admin. A interface pública só mostra as que têm produtos. */
  subcategories: Array<string>
}

export const CATEGORIES: Array<CategoryMeta> = [
  {
    id: 'gaming',
    label: 'Gaming',
    subcategories: [
      'playstation',
      'xbox',
      'steam',
      'nintendo',
      'pc',
      'roblox',
    ],
  },
  {
    id: 'gift-cards',
    label: 'Gift Cards',
    subcategories: ['amazon', 'apple', 'google-play', 'outros'],
  },
  {
    id: 'entretenimento',
    label: 'Entretenimento',
    subcategories: ['netflix', 'spotify', 'disney', 'youcine', 'outros'],
  },
  {
    id: 'jogos-digitais',
    label: 'Jogos Digitais',
    subcategories: ['pc', 'playstation', 'xbox', 'nintendo'],
  },
]

/** Nome legível de uma subcategoria. Desconhecidas caem para Title Case. */
export const SUBCATEGORY_LABELS: Record<string, string> = {
  playstation: 'PlayStation',
  xbox: 'Xbox',
  steam: 'Steam',
  nintendo: 'Nintendo',
  pc: 'PC',
  roblox: 'Roblox',
  netflix: 'Netflix',
  spotify: 'Spotify',
  disney: 'Disney+',
  youcine: 'YouCine',
  amazon: 'Amazon',
  apple: 'Apple',
  'google-play': 'Google Play',
  outros: 'Outros',
}

export function categoryLabel(id: string): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? titleCase(id)
}

export function subcategoryLabel(id: string): string {
  return SUBCATEGORY_LABELS[id] ?? titleCase(id)
}

function titleCase(value: string): string {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export interface SeedProduct {
  seedId: string
  category: CategoryId
  subcategory: string
  name: string
  price: number
  platform?: string
  region?: string
  type?: string
}

const PSN = (value: number, price: number): SeedProduct => ({
  seedId: `psn-${value}`,
  category: 'gaming',
  subcategory: 'playstation',
  name: `PSN ${value}€`,
  price,
  platform: 'PlayStation',
  region: 'Europa',
  type: 'Gift Card',
})

const ROBUX = (value: number, price: number): SeedProduct => ({
  seedId: `robux-${value}`,
  category: 'gaming',
  subcategory: 'roblox',
  name: `Robux ${value}`,
  price,
  platform: 'Roblox',
  region: 'Global',
  type: 'Gift Card',
})

const NETFLIX = (value: number, price: number): SeedProduct => ({
  seedId: `netflix-${value}`,
  category: 'entretenimento',
  subcategory: 'netflix',
  name: `Netflix ${value}$`,
  price,
  platform: 'Netflix',
  region: 'Global',
  type: 'Assinatura',
})

const GAME = (
  seedId: string,
  name: string,
  price: number,
  subcategory: string,
  platform: string,
  region: string,
): SeedProduct => ({
  seedId,
  category: 'jogos-digitais',
  subcategory,
  name,
  price,
  platform,
  region,
  type: 'Jogo Digital',
})

export const SEED_CATALOG: Array<SeedProduct> = [
  PSN(10, 14800),
  PSN(20, 30000),
  PSN(50, 75000),
  PSN(60, 89900),
  PSN(100, 146859),

  ROBUX(200, 5400),
  ROBUX(400, 10600),
  ROBUX(800, 13500),
  ROBUX(1000, 15500),
  ROBUX(3000, 46800),

  NETFLIX(15, 21500),
  NETFLIX(20, 27500),
  NETFLIX(30, 39500),
  NETFLIX(50, 62000),
  NETFLIX(75, 94000),

  GAME('gta-6-ps5', 'GTA VI (PS5)', 115000, 'playstation', 'PlayStation 5', 'Europa'),
  GAME('gta-5-ps', 'GTA V (PS4/PS5)', 58000, 'playstation', 'PlayStation 4 / 5', 'Europa'),
  GAME('fc-27-ps5', 'EA Sports FC 27 (PS5)', 113900, 'playstation', 'PlayStation 5', 'Europa'),
  GAME('fc-26-ps5', 'EA Sports FC 26 (PS5)', 83500, 'playstation', 'PlayStation 5', 'Europa'),
  GAME('nba-2k26-ps5', 'NBA 2K26 (PS5)', 86000, 'playstation', 'PlayStation 5', 'Europa'),
  GAME('spiderman-remastered-ps5', 'Spider-Man Remastered (PS5)', 74800, 'playstation', 'PlayStation 5', 'Europa'),
  GAME('gta-5-pc', 'GTA V (PC)', 19900, 'pc', 'PC', 'Global'),
  GAME('rdr2-pc', 'Red Dead Redemption 2 (PC)', 59850, 'pc', 'PC', 'Global'),
]
