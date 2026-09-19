// Server-side helpers for the api/ functions. Nothing here reaches the browser:
// the page only ever calls /api routes, and the key stays in the environment.
//
// Set APIVERVE_API_KEY in .env (local) or in your Vercel project's environment variables.
// Get a free key at https://dashboard.apiverve.com

// ============================================
// Rate limit
// Once deployed, anyone who finds this URL can call it with YOUR key.
// This caps each visitor at RATE_LIMIT requests per minute. It is kept in
// memory, so it resets on cold starts and isn't shared between instances:
// good enough for a demo. For production, use a shared store (e.g. Upstash
// Redis) or put the app behind your own auth.
// ============================================
const RATE_LIMIT = 10;
const WINDOW_MS = 60_000;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT;
}

/** A JSON error response. */
export const fail = (error, status = 400) => Response.json({ error }, { status });

/** Every route calls this first: it needs the key, and counts against the visitor's limit. */
export function guard(request) {
  if (!process.env.APIVERVE_API_KEY) {
    return fail('Missing APIVERVE_API_KEY. Add it to .env, or to your Vercel project’s environment variables, then redeploy.', 500);
  }
  const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'local';
  if (rateLimited(ip)) return fail('Too many requests. Wait a minute and try again.', 429);
  return null;
}

/**
 * Calls an APIVerve API and returns its data, or throws with its error message.
 * Pass query for a GET, json for a JSON POST, or form (FormData) for a file upload.
 */
export async function callApi(api, { query, json, form } = {}) {
  const url = `https://api.apiverve.com/v1/${api}${query ? `?${new URLSearchParams(query)}` : ''}`;
  const headers = { 'x-api-key': process.env.APIVERVE_API_KEY };
  if (json) headers['Content-Type'] = 'application/json';
  const res = await fetch(url, {
    method: json || form ? 'POST' : 'GET',
    headers,
    body: json ? JSON.stringify(json) : form
  });
  const body = await res.json().catch(() => null);
  if (!res.ok || body?.status !== 'ok') {
    const err = body?.error;
    const message = err?.missing ? `Missing: ${err.missing.join(', ')}` : typeof err === 'string' ? err : `APIVerve returned ${res.status}`;
    throw Object.assign(new Error(message), { status: res.status === 429 ? 429 : 502 });
  }
  return body.data;
}

/** Runs a handler body, turning a thrown callApi error into a JSON response. */
export async function respond(work) {
  try {
    return Response.json(await work());
  } catch (err) {
    return fail(err.message || 'Something went wrong', err.status || 500);
  }
}

/** A trimmed string, capped at max characters. */
export const str = (v, max) => String(v ?? '').trim().slice(0, max);
