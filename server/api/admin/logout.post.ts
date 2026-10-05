import { defineEventHandler } from 'h3'
import { assertSameOrigin, endAdminSession } from '../../utils/admin-auth'

export default defineEventHandler(async (event) => {
  assertSameOrigin(event)
  await endAdminSession(event)
  return { ok: true }
})
