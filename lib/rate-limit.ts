// Simple in-memory rate limiter
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export async function rateLimit(identifier: string) {
  const now = Date.now()
  const windowMs = 2 * 60 * 1000 // 2 minutes
  const maxRequests = 10

  const record = rateLimitStore.get(identifier)

  if (!record || now > record.resetTime) {
    // First request or window expired
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    })
    return { success: true, remaining: maxRequests - 1 }
  }

  if (record.count >= maxRequests) {
    return { success: false, remaining: 0 }
  }

  // Increment count
  record.count++
  return { success: true, remaining: maxRequests - record.count }
}
