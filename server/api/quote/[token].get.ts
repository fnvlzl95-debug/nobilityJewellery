import { defineEventHandler, createError, getRouterParam } from 'h3'
import { useOrdersDb } from '../../utils/cloudflare'
import { findQuoteByToken, toPublicQuote } from '../../utils/quotes'

export default defineEventHandler(async (event) => {
  const quote = await findQuoteByToken(useOrdersDb(event), getRouterParam(event, 'token'))
  if (!quote) {
    throw createError({ statusCode: 404, message: '견적서를 찾을 수 없습니다.' })
  }
  return toPublicQuote(quote)
})
