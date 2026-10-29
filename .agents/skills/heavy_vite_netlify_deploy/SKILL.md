---
name: heavy_vite_netlify_deploy
description: Workaround runbook for deploying heavy Vite builds to Netlify that exceed the 15-minute timeout.
---

# Deploying Heavy Vite Apps to Netlify

When deploying this project to Netlify, standard `npm run build` commands will swap memory excessively or exceed the 15-minute free-tier timeout.

Follow these exact steps to deploy without timing out:

1. **Build locally with expanded RAM:**
   ```bash
   NODE_OPTIONS="--max-old-space-size=8192" npm run build
   ```
2. **Bypass the cloud build:**
   Update `netlify.toml` to instantly deploy the local build:
   ```toml
   [build]
     command = "echo 'Deploying prebuilt dist...'"
     publish = "dist"
   ```
3. **Strip secrets:** Remove any untracked or nested sub-builds (e.g., `dist/legaleagle`) from the generated `dist/` folder to prevent GitHub Push Protection from blocking the commit.
4. **Un-ignore:** Ensure `dist/` is removed from `.gitignore`.
5. **Commit and Push:** Commit the `dist/` directory directly to the `main` branch. Netlify will deploy the prebuilt files in seconds.
