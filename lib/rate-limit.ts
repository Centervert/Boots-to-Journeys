type Bucket = { count: number; resetAt: number };

const globalStore = globalThis as typeof globalThis & {
  __btjRateLimit?: Map<string, Bucket>;
};

const store = globalStore.__btjRateLimit ?? new Map<string, Bucket>();
globalStore.__btjRateLimit = store;

/**
 * Sliding-window style limiter (per server instance). Helps with casual abuse;
 * pair with Turnstile + honeypot for stronger protection.
 */
export function rateLimit(
  key: string,
  max: number,
  windowMs: number
): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = Date.now();
  let b = store.get(key);
  if (!b || now >= b.resetAt) {
    b = { count: 0, resetAt: now + windowMs };
    store.set(key, b);
  }
  if (b.count >= max) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((b.resetAt - now) / 1000)),
    };
  }
  b.count += 1;
  return { ok: true };
}
