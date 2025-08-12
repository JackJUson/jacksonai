import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

export const rateLimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(10, '2 m'),
  analytics: true,
  prefix: 'chat-rate-limit',
});
