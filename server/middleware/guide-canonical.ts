import { defineEventHandler, getRequestURL, sendRedirect } from 'h3'

// The guide index is rendered by the Worker, so Pages' static HTML redirect no
// longer normalizes its trailing slash. Preserve pagination and search queries.
export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  if (url.pathname === '/guide/') return sendRedirect(event, `/guide${url.search}`, 308)
})
