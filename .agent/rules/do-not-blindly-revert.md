# Rule: Trust HEAD and User Backups over Hallucinated Artifacts

When asked to restore a "perfect version" or "working state" of a project:
1. **Never blindly revert to an old git commit** without verifying its date and contents against the user's recent work.
2. **Check for user-created backups** (e.g., `old_*.jsx`, `backup_*`, etc.) in the project root or relevant directories. Users often manually stash their preferred states.
3. **Verify Artifact Validity**: Do not trust artifacts like `version_history.md` without cross-referencing `git log` and the actual codebase. Agents can hallucinate or document the wrong commit hash.
4. **Preserve Current Progress**: Do not run destructive commands like `rm -rf` on active directories and overwrite them with old commits, as this destroys weeks of user progress.
5. **Directly Patch Visuals**: If a user complains about missing visual elements (e.g., "missing stadium," "missing doc scanner"), first check if they can be implemented directly rather than assuming they exist in a mythical previous commit.
