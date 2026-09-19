import { guard, callApi, respond, fail, str } from '../lib/apiverve.js';

/** POST /api/sentiment { text }: whether the text reads positive, negative or neutral, and how strongly. */
export async function POST(request) {
  const blocked = guard(request);
  if (blocked) return blocked;

  const body = await request.json().catch(() => ({}));
  const text = str(body.text, 2000);
  if (!text) return fail('Enter some text to analyze');

  return respond(() => callApi('sentimentanalysis', { json: { text } }));
}
