# Agent Rules: Git & Deployment

## Deployment Protocol
- **NEVER** run `git push` or trigger a production deployment unless specifically and explicitly asked by the USER (e.g., "push this to main" or "deploy the current changes").
- Answering the question "Where is this deployed?" should **ONLY** result in providing the URL or the current deployment status, not a new push.
- Always confirm with the USER before merging branches or pushing to remote repositories.

## Documentation
- If a push is authorized, document it in the `task.md`.
- If a push was accidental (UNAUTHORIZED), acknowledge it immediately and provide instructions for a rollback if needed.
