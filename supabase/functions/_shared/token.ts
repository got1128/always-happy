// Signed, expiring review links: base64url(payload).base64url(HMAC-SHA256).

const enc = new TextEncoder();
const b64u = (bytes: ArrayBuffer | Uint8Array) =>
  btoa(String.fromCharCode(...new Uint8Array(bytes))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const fromB64u = (s: string) =>
  Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4)), (c) => c.charCodeAt(0));

export type ReviewToken = { a: string; v: number; r: string; e: number };

const key = () => {
  const secret = Deno.env.get('REVIEW_TOKEN_SECRET') ?? '';
  if (secret.length < 32) throw new Error('REVIEW_TOKEN_SECRET is missing or shorter than 32 characters');
  return crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
};

export async function signReviewToken(applicationId: string, version: number, reviewer: string, days = 14) {
  const payload: ReviewToken = { a: applicationId, v: version, r: reviewer, e: Date.now() + days * 86400_000 };
  const body = b64u(enc.encode(JSON.stringify(payload)));
  const sig = await crypto.subtle.sign('HMAC', await key(), enc.encode(body));
  return `${body}.${b64u(sig)}`;
}

export async function verifyReviewToken(token: unknown): Promise<ReviewToken | null> {
  if (typeof token !== 'string') return null;
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;
  try {
    const ok = await crypto.subtle.verify('HMAC', await key(), fromB64u(sig), enc.encode(body));
    if (!ok) return null;
    const payload = JSON.parse(new TextDecoder().decode(fromB64u(body))) as ReviewToken;
    return payload.e > Date.now() ? payload : null;
  } catch {
    return null;
  }
}
