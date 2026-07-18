# Skills site

Next.js app for **skills.sanmid.com**: curated community skill catalog with hosted `SKILL.md` files.

## Source of truth

- `curated-seed.json` — curated registry (urls, topics, descriptions)
- `skills/<author>/<slug>/SKILL.md` — synced skill bodies
- `skills/<author>/<slug>/meta.json` — metadata consumed at build time
- `scripts/sync-skills.mjs` — refreshes local skill files from upstream

## Commands

- `npm run sync` — pull latest skill markdown from upstream repos
- `npm run dev` — local Next.js server
- `npm run build` — production build

## Conventions

- Prefer community skills with clear attribution
- Keep install commands pointing at the **upstream** GitHub repo
- Homepage brand is **Skills**
- Light mode only; Inter + Central Icons (Iconists)
- Stack mirrors sanmid.com / flux-site (Next.js on Vercel)
