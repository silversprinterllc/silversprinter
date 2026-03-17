import { Resend } from 'resend'

export const getResend = () => new Resend(process.env.RESEND_API_KEY)
export const FROM_EMAIL = process.env.FROM_EMAIL || 'hello@silversprinter.com'
