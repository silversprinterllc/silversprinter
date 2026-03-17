import { Queue } from 'bullmq'

// BullMQ bundles its own ioredis — pass connection options directly to avoid type conflicts
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'
const url = new URL(redisUrl)

const connection = {
  host: url.hostname,
  port: Number(url.port) || 6379,
  password: url.password || undefined,
}

export const notificationQueue = new Queue('notifications', { connection })
export const postTripQueue = new Queue('post-trip', { connection })
export const balanceChargeQueue = new Queue('balance-charge', { connection })
export const invoiceGenerationQueue = new Queue('invoice-generation', { connection })
