import { useRuntimeConfig } from '#imports'
import { siteConfig } from '~/config/site'

interface MailOptions {
  to: string
  subject: string
  html: string
}

export async function sendMail(options: MailOptions) {
  const runtimeConfig = useRuntimeConfig()
  const apiKey = runtimeConfig.resendApiKey || process.env.RESEND_API_KEY || ''
  const fromEmail = runtimeConfig.resendFrom || siteConfig.mail.from
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
