import { Resend } from 'resend'

interface MailOptions {
  to: string
  subject: string
  html: string
}

export async function sendMail(options: MailOptions) {
  const apiKey = process.env.RESEND_API_KEY || ''

  if (!apiKey) {
    throw new Error('RESEND_API_KEY not configured')
  }

  const resend = new Resend(apiKey)

  const { error } = await resend.emails.send({
    from: '귀족 문의 <onboarding@resend.dev>',
    to: options.to,
    subject: options.subject,
    html: options.html,
  })

  if (error) {
    throw new Error(error.message)
  }
}
