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

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: '귀족 문의 <onboarding@resend.dev>',
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
