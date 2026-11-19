---
title: dyslexia-guide Pages preview deployment
date: 2026-11-19
register: FOR AGENTS
---

# Pages preview deployment

Cloudflare Pages project: `dyslexia-guide`. Preview: https://dyslexia-guide.pages.dev/ .
Production canonical and citation URL: https://dyslexiaguide.edutools.fyi/ .
This phase attaches no custom domains and changes no DNS or Cloud Run services.

From a clean checkout with no build secrets:

```sh
npm install
npm run build
env -u CLOUDFLARE_API_TOKEN CLOUDFLARE_ACCOUNT_ID=b6ae5bced06492ee6f0c8f92776804da npx wrangler@4 pages deploy dist --project-name dyslexia-guide --branch main --force
```

Wrangler 4.165 requires `--force` to use the original Pages API directly instead of delegating to Workers. The project's pages.dev address is for review only; production switching requires separate approval.

No server-held AI key is required by this app.
