import Stripe from 'stripe'

export const getStripe = () =>
  new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-02-25.clover',
    typescript: true,
  })
