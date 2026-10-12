import { defineEventHandler, createError } from 'h3'
import { requireAdmin } from '../../utils/admin-auth'
import { useOrdersDb } from '../../utils/cloudflare'

// 등록된 직인 이미지. 로그인한 관리 화면이 견적서를 그릴 때만 받아 간다.
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const seal = await useOrdersDb(event)
    .prepare(`SELECT png FROM admin_assets WHERE name = 'seal'`)
    .first<{ png: ArrayBuffer | number[] }>()
  if (!seal) {
    throw createError({ statusCode: 404, message: '등록된 직인이 없습니다.' })
  }

  // D1은 BLOB을 숫자 배열로 돌려준다.
  const png = seal.png instanceof ArrayBuffer ? new Uint8Array(seal.png) : Uint8Array.from(seal.png)
  return new Response(png, {
    headers: {
      'content-type': 'image/png',
      'content-length': String(png.length),
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
    },
  })
})
