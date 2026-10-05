// Web Crypto helpers shared by order links and the admin login.

/** URL-safe random token. 16 bytes = 128 bits = 22 characters. */
export function randomToken(bytes = 16): string {
  const buffer = crypto.getRandomValues(new Uint8Array(bytes))
  return btoa(String.fromCharCode(...buffer))
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replace(/=+$/, '')
}

/** Uniform random decimal code, e.g. 8 digits for the admin login mail. */
export function randomDigits(length: number): string {
  const digits: number[] = []
  while (digits.length < length) {
    // 250 is the largest multiple of 10 below 256; larger bytes would skew the distribution.
    for (const byte of crypto.getRandomValues(new Uint8Array(length * 2))) {
      if (byte < 250 && digits.length < length) digits.push(byte % 10)
    }
  }
  return digits.join('')
}

export async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))
  return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('')
}

export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}
