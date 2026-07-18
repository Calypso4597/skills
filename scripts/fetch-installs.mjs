import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const skillsRoot = path.join(root, "skills");
const API = "https://skills.sh/api/search";

async function walkMetaFiles(dir, found = []) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return found;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walkMetaFiles(full, found);
    else if (entry.name === "meta.json") found.push(full);
  }
  return found;
}

async function search(query, attempt = 0) {
  const url = `${API}?q=${encodeURIComponent(query)}&limit=25`;
  const res = await fetch(url);
  if (res.status === 429 && attempt < 5) {
    const wait = 1500 * (attempt + 1);
    await new Promise((r) => setTimeout(r, wait));
    return search(query, attempt + 1);
  }
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

function pickInstalls(meta, results) {
  const user = meta.user.toLowerCase();
  const repo = meta.repo.toLowerCase();
  const sourceExact = `${user}/${repo}`;
  const name = meta.name.toLowerCase();
  const slug = meta.slug.toLowerCase();

  const scored = (results || []).map((s) => {
    const src = (s.source || "").toLowerCase();
    const sid = (s.skillId || s.name || "").toLowerCase();
    let score = 0;
    if (sid === name || sid === slug) score += 10;
    else if (sid.includes(name) || name.includes(sid)) score += 4;
    if (src === sourceExact) score += 8;
    else if (src.startsWith(`${user}/`)) score += 5;
    return { s, score };
  });

  scored.sort((a, b) => b.score - a.score || (b.s.installs || 0) - (a.s.installs || 0));
  const best = scored[0];
  if (!best || best.score < 10) return { installs: 0, match: null };
  return { installs: best.s.installs || 0, match: best.s };
}

const files = await walkMetaFiles(skillsRoot);
const report = [];

for (const file of files) {
  const meta = JSON.parse(await fs.readFile(file, "utf8"));
  try {
    const data = await search(meta.name);
    let { installs, match } = pickInstalls(meta, data.skills);
    if (!match && meta.slug !== meta.name) {
      const data2 = await search(meta.slug);
      ({ installs, match } = pickInstalls(meta, data2.skills));
    }
    meta.installs = installs;
    await fs.writeFile(file, `${JSON.stringify(meta, null, 2)}\n`);
    report.push({ pathSlug: meta.pathSlug, installs, match: match?.id ?? null });
    console.log(
      `${installs.toLocaleString().padStart(10)}  ${meta.pathSlug}${match ? "" : "  (unlisted)"}`,
    );
  } catch (error) {
    report.push({ pathSlug: meta.pathSlug, error: String(error) });
    console.error(`✗ ${meta.pathSlug}: ${error}`);
  }
  await new Promise((r) => setTimeout(r, 400));
}

await fs.writeFile(
  path.join(root, "scripts/.installs-report.json"),
  JSON.stringify(report, null, 2),
);

report.sort((a, b) => (b.installs || 0) - (a.installs || 0));
console.log("\nTop by installs:");
for (const row of report.filter((r) => r.installs).slice(0, 10)) {
  console.log(`  ${row.installs.toLocaleString()}  ${row.pathSlug}`);
}
