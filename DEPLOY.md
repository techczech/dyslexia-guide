---
title: dyslexia-guide Pages preview deployment
date: 2026-11-19
register: FOR AGENTS
---

# Pages preview deployment

Planned Cloudflare Pages project: `dyslexia-guide`. Preview unavailable: project creation was refused on 19 November 2026 because the account has reached its Pages project quota (Cloudflare error 8000027). The intended address is https://dyslexia-guide.pages.dev/ .
Production canonical and citation URL: https://dyslexiaguide.edutools.fyi/ .
This phase attaches no custom domains and changes no DNS or Cloud Run services.

From a clean checkout with no build secrets:

```sh
npm install
npm run build
env -u CLOUDFLARE_API_TOKEN CLOUDFLARE_ACCOUNT_ID=b6ae5bced06492ee6f0c8f92776804da npx wrangler@4 pages deploy dist --project-name dyslexia-guide --branch main
```

When creating a missing project with Wrangler 4.165, use `pages project create <name> --production-branch main --force` to target the original Pages API. Once the project exists, omit `--force` from deploy commands. The project's pages.dev address is for review only; production switching requires separate approval.

No server-held AI key is required by this app.
