import { defineEventHandler, createError, getQuery, getRouterParam } from 'h3'
import { useOrdersDb } from '../../../utils/cloudflare'
import { findQuoteByToken } from '../../../utils/quotes'

// 견적서 이미지를 실제 주소로 내려준다. 카카오톡 같은 인앱 브라우저는 화면에서 만든 이미지(blob)를
// 저장하지 못하는 경우가 많아, 주소가 있는 파일이어야 '이미지 저장'과 길게 눌러 저장이 모두 된다.
export default defineEventHandler(async (event) => {
  const db = useOrdersDb(event)
  const quote = await findQuoteByToken(db, getRouterParam(event, 'token'))
  const image = quote?.status === 'active'
    ? await db.prepare('SELECT png FROM quote_images WHERE quote_id = ?').bind(quote.id).first<{ png: ArrayBuffer | number[] }>()
    : null
  if (!quote || !image) {
    throw createError({ statusCode: 404, message: '견적서를 찾을 수 없습니다.' })
  }

  // D1은 BLOB을 숫자 배열로 돌려준다.
  const png = image.png instanceof ArrayBuffer ? new Uint8Array(image.png) : Uint8Array.from(image.png)
  const fileName = `귀족_견적서_${quote.quote_date.replaceAll('-', '')}.png`
  const disposition = getQuery(event).download === '1' ? 'attachment' : 'inline'
  return new Response(png, {
    headers: {
      'content-type': 'image/png',
      'content-length': String(png.length),
      'content-disposition': `${disposition}; filename="quote-${quote.id}.png"; filename*=UTF-8''${encodeURIComponent(fileName)}`,
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
      'x-robots-tag': 'noindex, nofollow',
    },
  })
})
