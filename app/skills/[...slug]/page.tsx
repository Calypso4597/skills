import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import { Github } from "@/components/icons";
import { CopyCommand } from "@/components/copy-command";
import * as FadeIn from "@/components/motion/staggers/fade";
import { SkillCardGrid } from "@/components/skill-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  getSkill,
  getSkillMarkdown,
  getSkills,
  installCommand,
  stripFrontmatter,
} from "@/lib/skills";

export function generateStaticParams() {
  return getSkills().map((skill) => ({
    slug: skill.pathSlug.split("/"),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pathSlug = slug.join("/");
  const skill = getSkill(pathSlug);
  if (!skill) return {};
  return {
    title: skill.name,
    description: skill.description,
  };
}

export default async function SkillPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const pathSlug = slug.join("/");

  if (slug[0] === "topic") notFound();

  const skill = getSkill(pathSlug);
  if (!skill) notFound();

  const raw = getSkillMarkdown(skill.pathSlug);
  const unsafeHtml = marked.parse(stripFrontmatter(raw), { async: false }) as string;
  const html = DOMPurify.sanitize(unsafeHtml);
  const skillTopicSet = new Set(skill.topics);
  const related = getSkills()
    .filter(
      (entry) =>
        entry.pathSlug !== skill.pathSlug &&
        (entry.user === skill.user ||
          entry.topics.some((topic) => skillTopicSet.has(topic))),
    )
    .slice(0, 6);
  const command = installCommand(skill);

  return (
    <FadeIn.Container>
      <FadeIn.Item>
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/skills">All skills</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{skill.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </FadeIn.Item>

      <FadeIn.Item>
        <header className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <Image
                src={`https://github.com/${skill.user}.png?size=64`}
                alt=""
                width={20}
                height={20}
                className="size-5 rounded-full outline outline-1 outline-black/10"
              />
              <span className="text-[13px] text-muted">{skill.user}</span>
            </div>
            <h1 className="mt-3 text-balance text-[22px] font-medium tracking-[0.01em] text-foreground">
              {skill.name}
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              {skill.description}
            </p>
          </div>
          <a
            href={skill.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex size-10 shrink-0 items-center justify-center text-muted transition-[color,opacity,transform] duration-150 ease-out hover:text-foreground hover:opacity-100 active:scale-[0.96]"
            aria-label="View skill source on GitHub"
          >
            <Github size={24} />
          </a>
        </header>
      </FadeIn.Item>

      <FadeIn.Item>
        <section className="mt-8">
          <h2 className="mb-3 text-[15px] font-normal text-muted">Install</h2>
          <CopyCommand command={command} />
        </section>
      </FadeIn.Item>

      <FadeIn.Item>
        <div
          className="prose-skill mt-10 border-t border-border pt-8"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </FadeIn.Item>

      {related.length > 0 ? (
        <FadeIn.Item>
          <section className="mt-14">
            <h2 className="mb-2 text-[15px] font-normal text-muted">Related</h2>
            <SkillCardGrid skills={related} />
          </section>
        </FadeIn.Item>
      ) : null}
    </FadeIn.Container>
  );
}
