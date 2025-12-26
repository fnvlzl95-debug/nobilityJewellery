import nodemailer from 'nodemailer'

interface MailOptions {
  to: string
  subject: string
  html: string
}

export async function sendMail(options: MailOptions) {
  const user = process.env.NAVER_MAIL_USER || process.env.NUXT_NAVER_MAIL_USER || ''
  const pass = process.env.NAVER_MAIL_PASS || process.env.NUXT_NAVER_MAIL_PASS || ''

  if (!user || !pass) {
    throw new Error('Email credentials not configured')
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.naver.com',
    port: 465,
    secure: true,
    auth: {
      user,
      pass,
    },
  })

  return transporter.sendMail({
    from: `"귀족 문의" <${user}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
  })
}
