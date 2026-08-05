import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import app from './app.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Serve frontend static assets from dist folder
app.use('/*', serveStatic({ root: './dist' }))

// Fallback all non-API paths to index.html (for React SPA routing)
app.get('*', (c, next) => {
  if (c.req.path.startsWith('/api')) {
    return next()
  }
  return serveStatic({ path: './dist/index.html' })(c, next)
})

const port = process.env.PORT || 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port: Number(port)
})
