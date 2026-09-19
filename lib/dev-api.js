// Local development only. Runs the api/ functions the way Vercel does, so `npm run dev`
// works without the Vercel CLI. Vercel ignores this file: it deploys api/ on its own.
import { Readable } from 'node:stream';

/**
 * Handles an /api/<name> request with api/<name>.js.
 * load(path) imports a module by its project path, e.g. '/api/price.js'.
 */
export async function handleApi(req, res, load) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const name = url.pathname.slice('/api/'.length).replace(/\/$/, '');
  let handler;
  if (/^[a-z0-9-]+$/.test(name)) {
    try {
      handler = (await load(`/api/${name}.js`))[req.method];
    } catch {
      handler = undefined;
    }
  }
  if (!handler) {
    res.writeHead(404, { 'Content-Type': 'application/json' }).end(JSON.stringify({ error: 'Not found' }));
    return;
  }
  const hasBody = req.method !== 'GET' && req.method !== 'HEAD';
  const request = new Request(url, {
    method: req.method,
    headers: Object.entries(req.headers).filter(([, v]) => typeof v === 'string'),
    body: hasBody ? Readable.toWeb(req) : undefined,
    duplex: 'half'
  });
  const response = await handler(request);
  res.writeHead(response.status, Object.fromEntries(response.headers));
  res.end(Buffer.from(await response.arrayBuffer()));
}
