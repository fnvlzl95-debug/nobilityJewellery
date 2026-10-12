import { defineEventHandler, readBody } from 'h3'
import { requireAdmin } from '../../utils/admin-auth'
import { useOrdersDb } from '../../utils/cloudflare'
import { decodePng } from '../../utils/quotes'

const MAX_SEAL_BYTES = 400000

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const body = await readBody<{ image?: unknown }>(event)
  const seal = decodePng(body?.image, MAX_SEAL_BYTES, '직인 이미지를 저장하지 못했습니다. 다른 사진으로 다시 시도해주세요.')

  await useOrdersDb(event)
    .prepare(`INSERT INTO admin_assets (name, png, updated_at) VALUES ('seal', ?1, ?2)
      ON CONFLICT (name) DO UPDATE SET png = ?1, updated_at = ?2`)
    .bind(seal.png, new Date().toISOString())
    .run()

  console.log('Seal image saved:', { bytes: seal.png.length })
  return { ok: true, width: seal.width, height: seal.height }
})
