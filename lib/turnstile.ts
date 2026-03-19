export async function verifyTurnstileToken(
  token: string | undefined,
  secret: string,
  remoteip?: string
): Promise<boolean> {
  const t = token?.trim();
  if (!t) return false;
  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", t);
  if (remoteip) body.set("remoteip", remoteip);
  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
        signal: AbortSignal.timeout(10_000),
      }
    );
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export function turnstileRequired(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY?.trim());
}
