// Simple per-isolate rate limiting, same approach as the inquiry endpoint.
export function createRateLimiter(limit: number, windowMs: number) {
  const store = new Map<string, { count: number; resetTime: number }>()

  return (key: string): boolean => {
    const now = Date.now()
    if (store.size > 5000) for (const [k, item] of store) if (now > item.resetTime) store.delete(k)
    if (store.size >= 10000 && !store.has(key)) return false
    const record = store.get(key)

    if (!record || now > record.resetTime) {
      store.set(key, { count: 1, resetTime: now + windowMs })
      return true
    }

    if (record.count >= limit) {
      return false
    }

    record.count++
    return true
  }
}
