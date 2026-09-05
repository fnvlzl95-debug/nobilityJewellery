import { siteConfig } from '~/config/site'

interface MailOptions {
  to: string
  subject: string
  html: string
  apiKey: string
  fromEmail?: string
}

export async function sendMail(options: MailOptions) {
  const apiKey = options.apiKey.trim()
  const fromEmail = options.fromEmail?.trim() || siteConfig.mail.from
  const from = fromEmail.includes('<') ? fromEmail : `${siteConfig.name} 문의 <${fromEmail}>`

  if (!apiKey) {
    throw new Error('RESEND_API_KEY not configured')
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: options.to,
      subject: options.subject,
      html: options.html,
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => null) as { message?: string } | null
    throw new Error(error?.message || `Resend request failed with status ${response.status}`)
  }

  const result = await response.json().catch(() => null) as { id?: string } | null
  if (!result?.id) throw new Error('Mail provider did not confirm receipt')
  return { id: result.id }
}
