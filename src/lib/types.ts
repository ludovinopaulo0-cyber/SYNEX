/** Produto tal como é consumido pela interface (sem detalhes internos da base de dados). */
export interface Product {
  id: number
  category: string
  subcategory: string
  name: string
  price: number
  /** Imagem do produto como data URL (base64), ou null para usar o placeholder da marca. */
  imageData: string | null
  platform: string | null
  region: string | null
  type: string | null
  delivery: string
  available: boolean
}

export interface ProductInput {
  category: string
  subcategory: string
  name: string
  price: number
  imageData: string | null
  platform: string | null
  region: string | null
  type: string | null
  available: boolean
}
