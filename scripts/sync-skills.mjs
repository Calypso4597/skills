import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const seedPath = path.join(root, "curated-seed.json");
const skillsRoot = path.join(root, "skills");

const seed = JSON.parse(await fs.readFile(seedPath, "utf8"));
const results = [];

for (const skill of seed) {
  const dir = path.join(skillsRoot, skill.user, skill.slug);
  await fs.mkdir(dir, { recursive: true });
  const dest = path.join(dir, "SKILL.md");

  try {
    const res = await fetch(skill.rawUrl);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    let body = await res.text();

    if (body.startsWith("---")) {
      const end = body.indexOf("\n---", 3);
      if (end !== -1) {
        let fm = body.slice(4, end);
        if (!/^author:/m.test(fm)) fm += `\nauthor: ${skill.user}`;
        if (!/^source:/m.test(fm)) {
          fm += `\nsource: https://github.com/${skill.user}/${skill.repo}`;
        }
        if (!/^homepage:/m.test(fm)) fm += `\nhomepage: ${skill.githubUrl}`;
        body = `---${fm}\n---${body.slice(end + 4)}`;
      }
    }

    await fs.writeFile(dest, body);
    // Preserve installs from a prior fetch-installs run when present
    let installs = 0;
    try {
      const prev = JSON.parse(
        await fs.readFile(path.join(dir, "meta.json"), "utf8"),
      );
      if (typeof prev.installs === "number") installs = prev.installs;
    } catch {
      // first sync
    }

    await fs.writeFile(
      path.join(dir, "meta.json"),
      `${JSON.stringify(
        {
          slug: skill.slug,
          name: skill.name,
          user: skill.user,
          repo: skill.repo,
          rawUrl: skill.rawUrl,
          githubUrl: skill.githubUrl,
          description: skill.description,
          topics: skill.topics,
          pathSlug: `${skill.user}/${skill.slug}`,
          installs,
        },
        null,
        2,
      )}\n`,
    );
    results.push({ ok: true, slug: `${skill.user}/${skill.slug}` });
    console.log(`✓ ${skill.user}/${skill.slug}`);
  } catch (error) {
    results.push({
      ok: false,
      slug: `${skill.user}/${skill.slug}`,
      error: String(error),
    });
    console.error(`✗ ${skill.user}/${skill.slug}: ${error}`);
  }
}

await fs.mkdir(path.join(root, "scripts"), { recursive: true });
await fs.writeFile(
  path.join(root, "scripts/.sync-report.json"),
  JSON.stringify(results, null, 2),
);

const ok = results.filter((r) => r.ok).length;
console.log(`\nSynced ${ok}/${results.length}`);
if (ok !== results.length) process.exitCode = 1;
