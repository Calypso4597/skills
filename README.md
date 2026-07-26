# Skills

![Skills](./public/og.png)

Design, frontend, and design-engineering skills for humans and agents.

More on [skills.sanmid.com](https://skills.sanmid.com)

A curated catalog of community skills. Each page links to the upstream repo and shows the install command.

## Install

```bash
npx skills add https://github.com/<author>/<repo> --skill <skill-name>
```

Examples:

```bash
npx skills add emilkowalski/skills
npx skills add jakubkrehel/skills
npx skills add index-how/vocabulary
npx skills add ibelick/ui-skills
```

## Develop

```bash
cp .env.example .env.local
# set CENTRAL_LICENSE_KEY from https://iconists.co/central
npm install
npm run sync
npm run dev
```

## Add a skill

1. Append an entry to `curated-seed.json`
2. Run `npm run sync`
3. Commit the generated files under `skills/<author>/<slug>/`

Skill bodies stay attributed to their upstream authors.

## License

The Skills site (this repository) is licensed under the [MIT license](./LICENSE).

Curated skill content remains under each upstream project's license and attribution.
