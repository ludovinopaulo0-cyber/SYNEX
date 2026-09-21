/**
 * Gera os fundos abstractos da marca (executado uma vez, em build local).
 * As imagens ficam em public/img e são servidas via Netlify Image CDN.
 */
import { writeFile } from 'node:fs/promises'
import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({
  apiKey: process.env.NETLIFY_AI_GATEWAY_KEY,
  httpOptions: {
    baseUrl: process.env.NETLIFY_AI_GATEWAY_BASE_URL?.replace(/\/$/, ''),
  },
})

const jobs = [
  {
    file: 'public/img/hero-backdrop.png',
    aspectRatio: '16:9',
    prompt:
      'Abstract dark tech backdrop, deep navy #0F172A base, sharp angular shards and thin diagonal light rays in muted violet #7c3aed and pale lilac #c084fc, low-key lighting, matte finish, fine film grain, subtle depth of field, negative space in the left third, no text, no logos, no neon glow, no people, editorial poster quality.',
  },
  {
    file: 'public/img/texture-shards.png',
    aspectRatio: '1:1',
    prompt:
      'Seamless abstract texture of overlapping translucent geometric planes cut at 30 degree diagonals, near-black navy background, faint violet edge highlights, matte, very low contrast, fine grain, no text, no logos, no glow.',
  },
]

async function generate({ file, prompt, aspectRatio }) {
  const request = {
    model: 'gemini-3.1-flash-image',
    contents: prompt,
    config: { imageConfig: { aspectRatio } },
  }
  let response
  try {
    response = await ai.models.generateContent(request)
  } catch (error) {
    console.warn(`aspectRatio rejected for ${file}, retrying square:`, error.message)
    response = await ai.models.generateContent({
      model: request.model,
      contents: prompt,
    })
  }
  const parts = response.candidates?.[0]?.content?.parts ?? []
  const image = parts.find((part) => part.inlineData)
  if (!image) throw new Error(`no image returned for ${file}`)
  await writeFile(file, Buffer.from(image.inlineData.data, 'base64'))
  console.log(`wrote ${file}`)
}

for (const job of jobs) {
  await generate(job)
}
