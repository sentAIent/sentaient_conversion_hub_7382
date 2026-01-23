# Fixing GitHub Authentication (SSH Method)

Since GitHub key/password is invalid, we will use an **SSH Key**. This is secure and permanent.

### Step 1: Generate Key
Run this in your terminal:
```bash
ssh-keygen -t ed25519 -C "bl.nb.ca@gmail.com"
```
(Press Enter for all prompts: file location, no passphrase).

### Step 2: Copy Key
Run this to copy the new key to your clipboard:
```bash
pbcopy < ~/.ssh/id_ed25519.pub
```

### Step 3: Add to GitHub
1. Open this link: [https://github.com/settings/ssh/new](https://github.com/settings/ssh/new)
2. **Title**: `MacBook Pro 2026`
3. **Key**: Paste the key (Command+V)
4. Click **Add SSH Key**

### Step 4: Switch Remote & Push
Back in your terminal (in `sentaient_conversion_hub_7382`):
```bash
cd /Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382
git remote set-url origin git@github.com:sentAIent/sentaient_conversion_hub_7382.git
git push origin main
```
