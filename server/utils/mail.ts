import { siteConfig } from '~/config/site'

interface MailOptions {
  to: string
  subject: string
  html: string
  apiKey: string
  fromEmail?: string
}

export async function sendMail(options: MailOptions) {
  const apiKey = options.apiKey
  const fromEmail = options.fromEmail || siteConfig.mail.from
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
    const error = await response.json()
    throw new Error(error.message || 'Failed to send email')
  }
}
