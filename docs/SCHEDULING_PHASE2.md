# Phase 2: Google Calendar, email, and `integration_outbox`

Bookings are stored in **`public.appointments`**. Each insert triggers **`enqueue_integration_outbox`**, which creates a row in **`public.integration_outbox`** with:

- `payload.event` = `appointment_created`
- `payload.appointment_id`, `email`, `starts_at`, `ends_at`
- `status` = `pending`

## Recommended worker flow

1. **Poll or queue** on `integration_outbox` where `status in ('pending','failed')` and `attempts < N`.
2. For each row, load the full **`appointments`** row by `appointment_id`.
3. **Google Calendar**: create an event on the host’s calendar (OAuth user token or service account). Use `starts_at` / `ends_at` (timestamptz).
4. **Email**: notify the guest and/or host (Resend, SES, etc.). Include an ICS attachment or “Add to calendar” link if you want parity with Calendly.
5. On success, set `status = 'done'`. On failure, increment **`attempts`**, set **`last_error`**, set `status = 'failed'` (or leave `pending` for retry with backoff).

## Alternatives

- **Supabase Database Webhooks** on `appointments` INSERT to call an Edge Function or external HTTPS endpoint (same payload shape as you prefer).
- **Supabase Edge Function** scheduled via **pg_cron** to process the outbox table.

## Security

- Keep **`SUPABASE_SERVICE_ROLE_KEY`** only on the server (Next.js API routes, Edge Functions, or a trusted worker). Do not expose it in the browser.
- For Google, store refresh tokens encrypted (e.g. Vault, Supabase secrets) if using OAuth per host.

## Optional: Zapier / Make

`BOOKING_WEBHOOK_URL` (optional) still fires from **`POST /api/scheduling/book`** after a successful DB insert, for parallel automation.

## Abuse & spam (already in the app)

- **Honeypot** hidden field on the booking flow (`companyUrl` must be empty).
- **Per-IP rate limits**: stricter on **`POST /api/scheduling/book`**, lighter on **`GET /api/scheduling/slots`** (best-effort per server instance; pair with Turnstile for production).
- **Cloudflare Turnstile**: set **`TURNSTILE_SECRET_KEY`** and **`NEXT_PUBLIC_TURNSTILE_SITE_KEY`** — when the secret is set, the API rejects bookings without a valid token.
