# Skills

Community design, frontend, and design-engineering skills — hosted at [skills.sanmid.com](https://skills.sanmid.com).

Next.js app on Vercel, styled like [sanmid.com](https://sanmid.com) / [fluxapp.dev](https://fluxapp.dev): Inter, light mode, Central Icons.

## Develop

```bash
cp .env.example .env.local
# set CENTRAL_LICENSE_KEY from https://iconists.co/central
export CENTRAL_LICENSE_KEY=...   # required for Central Icons install
npm install
npm run sync   # refresh skills/ from curated-seed.json
npm run dev
```

## Add a skill

1. Append an entry to `curated-seed.json`
2. Run `npm run sync`
3. Commit the generated files under `skills/<author>/<slug>/`

## Install a skill locally

```bash
npx skills add https://github.com/<author>/<repo> --skill <skill-name>
```

Each skill page shows the exact upstream install command.

## Deploy

Deploy to Vercel and point `skills.sanmid.com` at the project.
