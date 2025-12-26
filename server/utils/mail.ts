import nodemailer from 'nodemailer'

const config = useRuntimeConfig()

const transporter = nodemailer.createTransport({
  host: 'smtp.naver.com',
  port: 465,
  secure: true,
  auth: {
    user: config.naverMailUser,
    pass: config.naverMailPass,
  },
})

interface MailOptions {
  to: string
  subject: string
  html: string
}

export async function sendMail(options: MailOptions) {
  return transporter.sendMail({
    from: `"귀족 문의" <${config.naverMailUser}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
  })
}
