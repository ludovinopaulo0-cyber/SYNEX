const TARGET_SIZE = 800
const QUALITY = 0.86

/**
 * Recorta a imagem enviada para um quadrado 1:1 (corte central, sem distorcer),
 * redimensiona e comprime. Não é aplicado qualquer filtro, texto ou moldura —
 * apenas o ajuste técnico necessário para o site carregar depressa.
 */
export async function cropToSquareDataUrl(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file)
  const side = Math.min(bitmap.width, bitmap.height)
  const sx = Math.round((bitmap.width - side) / 2)
  const sy = Math.round((bitmap.height - side) / 2)
  const size = Math.min(side, TARGET_SIZE)

  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  if (!context) throw new Error('O browser não conseguiu preparar a imagem.')
  context.imageSmoothingQuality = 'high'
  context.drawImage(bitmap, sx, sy, side, side, 0, 0, size, size)
  bitmap.close()

  const webp = canvas.toDataURL('image/webp', QUALITY)
  if (webp.startsWith('data:image/webp')) return webp
  return canvas.toDataURL('image/jpeg', QUALITY)
}
