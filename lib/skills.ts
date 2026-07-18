import "server-only";

import fs from "node:fs";
import path from "node:path";
import type { SkillMeta } from "./skill-meta";

export type { SkillMeta } from "./skill-meta";
export {
  formatInstalls,
  installCommand,
  stripFrontmatter,
} from "./skill-meta";

const skillsRoot = path.join(process.cwd(), "skills");

function walkMetaFiles(dir: string, found: string[] = []): string[] {
  if (!fs.existsSync(dir)) return found;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkMetaFiles(full, found);
    else if (entry.name === "meta.json") found.push(full);
  }
  return found;
}

export function getSkills(): SkillMeta[] {
  return walkMetaFiles(skillsRoot)
    .map((file) => JSON.parse(fs.readFileSync(file, "utf8")) as SkillMeta)
    .sort((a, b) => {
      const installDelta = (b.installs ?? 0) - (a.installs ?? 0);
      if (installDelta !== 0) return installDelta;
      return a.pathSlug.localeCompare(b.pathSlug);
    });
}

export function getSkill(pathSlug: string): SkillMeta | undefined {
  return getSkills().find((skill) => skill.pathSlug === pathSlug);
}

export function getSkillMarkdown(pathSlug: string): string {
  const file = path.join(skillsRoot, pathSlug, "SKILL.md");
  if (!fs.existsSync(file)) return "";
  return fs.readFileSync(file, "utf8");
}
