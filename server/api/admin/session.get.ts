import { defineEventHandler } from 'h3'
import { isAdmin } from '../../utils/admin-auth'

export default defineEventHandler(async (event) => {
  return { authenticated: await isAdmin(event) }
})
