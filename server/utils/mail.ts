import { siteConfig } from '~/config/site'

interface MailOptions {
  to: string
  subject: string
  html: string
  apiKey: string
  fromEmail?: string
  idempotencyKey?: string
}

export async function sendMail(options: MailOptions) {
  const apiKey = options.apiKey.trim()
  const fromEmail = options.fromEmail?.trim() || siteConfig.mail.from
  const from = fromEmail.includes('<') ? fromEmail : `${siteConfig.name} 문의 <${fromEmail}>`

  if (!apiKey) {
    throw new Error('RESEND_API_KEY not configured')
  }

  const requestBody = JSON.stringify({ from, to: options.to, subject: options.subject, html: options.html })
  let response: Response | undefined
  for (let attempt = 0; attempt < (options.idempotencyKey ? 2 : 1); attempt++) {
    try {
      response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      ...(options.idempotencyKey ? { 'Idempotency-Key': options.idempotencyKey } : {}),
    },
        body: requestBody,
        signal: AbortSignal.timeout(15000),
      })
      if (response.ok || ![429, 500, 502, 503, 504].includes(response.status) || attempt === 1 || !options.idempotencyKey) break
    } catch (error) {
      if (attempt === 1 || !options.idempotencyKey) throw error
    }
    await new Promise(resolve => setTimeout(resolve, 750))
  }
  if (!response) throw new Error('Mail provider did not respond')

  if (!response.ok) {
    const error = await response.json().catch(() => null) as { message?: string } | null
    throw new Error(error?.message || `Resend request failed with status ${response.status}`)
  }

  const result = await response.json().catch(() => null) as { id?: string } | null
  if (!result?.id) throw new Error('Mail provider did not confirm receipt')
  return { id: result.id }
}
