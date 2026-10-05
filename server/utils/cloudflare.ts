import { createError, getRequestHeader, getRequestIP, type H3Event } from 'h3'

// D1 API 중 이 프로젝트가 쓰는 부분만 선언한다.
export interface D1Result<T = unknown> {
  results: T[]
  meta: { changes: number }
}

export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement
  first<T = unknown>(): Promise<T | null>
  all<T = unknown>(): Promise<D1Result<T>>
  run(): Promise<D1Result>
}

export interface D1Database {
  prepare(query: string): D1PreparedStatement
  batch(statements: D1PreparedStatement[]): Promise<D1Result[]>
}

// Cloudflare Pages exposes runtime bindings on the request context.
export function cloudflareEnv(event: H3Event): Record<string, unknown> {
  return (event.context as { cloudflare?: { env?: Record<string, unknown> } }).cloudflare?.env ?? {}
}

export function useOrdersDb(event: H3Event): D1Database {
  const db = cloudflareEnv(event).DB as D1Database | undefined
  if (!db) {
    throw createError({
      statusCode: 503,
      message: '주문 저장소에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.',
      data: { code: 'DB_NOT_CONFIGURED' },
    })
  }
  return db
}

/** Keeps the Worker alive for work that should not delay the response, e.g. notification mail. */
export async function runAfterResponse(event: H3Event, task: Promise<unknown>): Promise<void> {
  const context = (event.context as { cloudflare?: { context?: { waitUntil(promise: Promise<unknown>): void } } }).cloudflare?.context
  if (context) context.waitUntil(task)
  else await task
}

export function clientIp(event: H3Event): string {
  const ip = getRequestHeader(event, 'cf-connecting-ip') ||
             getRequestIP(event, { xForwardedFor: true }) ||
             'unknown'
  return ip.split(',')[0].trim()
}
