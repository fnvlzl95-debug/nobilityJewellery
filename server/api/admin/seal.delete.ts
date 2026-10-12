import { defineEventHandler } from 'h3'
import { requireAdmin } from '../../utils/admin-auth'
import { useOrdersDb } from '../../utils/cloudflare'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  await useOrdersDb(event).prepare(`DELETE FROM admin_assets WHERE name = 'seal'`).run()
  console.log('Seal image removed')
  return { ok: true }
})
