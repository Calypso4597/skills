import type { TopicSlug } from "./topics";

export type SkillMeta = {
  slug: string;
  name: string;
  user: string;
  repo: string;
  rawUrl: string;
  githubUrl: string;
  description: string;
  topics: TopicSlug[];
  pathSlug: string;
  installs?: number;
};

export function formatInstalls(count = 0): string {
  if (!count || count <= 0) return "";
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return String(count);
}

export function installCommand(skill: SkillMeta): string {
  return `npx skills add https://github.com/${skill.user}/${skill.repo} --skill ${skill.name}`;
}

export function stripFrontmatter(markdown: string): string {
  if (!markdown.startsWith("---")) return markdown;
  const end = markdown.indexOf("\n---", 3);
  if (end === -1) return markdown;
  return markdown.slice(end + 4).trim();
}
