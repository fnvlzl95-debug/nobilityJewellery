import { defineEventHandler, createError, getRouterParam } from 'h3'
import { useOrdersDb } from '../../utils/cloudflare'
import { findOrderByToken, toPublicOrder } from '../../utils/orders'

export default defineEventHandler(async (event) => {
  const order = await findOrderByToken(useOrdersDb(event), getRouterParam(event, 'token'))
  if (!order) {
    throw createError({ statusCode: 404, message: '주문서를 찾을 수 없습니다.' })
  }
  return toPublicOrder(order)
})
