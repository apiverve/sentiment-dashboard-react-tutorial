import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { handleApi } from './lib/dev-api.js'

// In development, /api/* runs the same functions Vercel deploys from api/.
function apiRoutes() {
  return {
    name: 'api-routes',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url.startsWith('/api/')) return next()
        handleApi(req, res, (path) => server.ssrLoadModule(path)).catch(next)
      })
    }
  }
}

export default defineConfig(({ mode }) => {
  // Read from .env for the api/ functions only. No VITE_ prefix, so it never reaches the page.
  process.env.APIVERVE_API_KEY ??= loadEnv(mode, process.cwd(), 'APIVERVE_').APIVERVE_API_KEY
  return { plugins: [react(), apiRoutes()] }
})
