import twilio from 'twilio'

export const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID || 'ACplaceholder00000000000000000000',
  process.env.TWILIO_AUTH_TOKEN || 'placeholder_auth_token_build_only'
)

export const TWILIO_FROM = process.env.TWILIO_FROM_NUMBER!
