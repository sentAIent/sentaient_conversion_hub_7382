---
name: netlify_nextjs_proxy
description: Prevents proxying to Netlify Next.js Edge apps
trigger: always_on
---

# Netlify Proxy Limitation

Netlify Edge cannot proxy (`status = 200` in `_redirects` or `netlify.toml`) requests to another Netlify Site that also uses Edge Functions (such as a Next.js App Router). Doing so results in a 500 Internal Server Error loop. 

If you are asked to map a Next.js app to a subpath of a Netlify site (e.g., `/autopilot/*`), you MUST either:
1. Use a hard HTTP Redirect (`status = 301`).
2. Transplant the pages directly into the root host application natively (e.g., porting the UI to Vite components).
3. Do not attempt to use `force = true` or `status = 200` to mask domains between Netlify Edge functions.
