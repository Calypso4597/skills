import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@/components/icons";
import * as FadeIn from "@/components/motion/staggers/fade";
import { SkillCardGrid } from "@/components/skill-card";
import { getSkills } from "@/lib/skills";
import { topicBySlug, topics, type TopicSlug } from "@/lib/topics";

export function generateStaticParams() {
  const skills = getSkills();
  const usedTopicSlugs = new Set<TopicSlug>();
  for (const skill of skills) {
    for (const topic of skill.topics) usedTopicSlugs.add(topic);
  }

  const params: { topic: string }[] = [];
  for (const topic of topics) {
    if (usedTopicSlugs.has(topic.slug)) {
      params.push({ topic: topic.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic: topicSlug } = await params;
  const topic = topicBySlug.get(topicSlug as TopicSlug);
  if (!topic) return {};
  return {
    title: `${topic.label} skills`,
    description: topic.description,
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic: topicSlug } = await params;
  const topic = topicBySlug.get(topicSlug as TopicSlug);
  if (!topic) notFound();

  const skills = getSkills().filter((skill) => skill.topics.includes(topic.slug));

  return (
    <FadeIn.Container>
      <FadeIn.Item>
        <Link
          href="/skills"
          className="mb-6 inline-flex min-h-10 items-center gap-1.5 text-[13px] text-muted transition-opacity hover:text-foreground hover:opacity-100"
        >
          <ArrowLeft size={14} />
          <span>All skills</span>
        </Link>
      </FadeIn.Item>

      <FadeIn.Item>
        <h1 className="text-balance text-[16px] font-medium text-foreground">
          {topic.label}
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">{topic.description}</p>
        <p className="mt-2 text-[13px] tabular-nums text-muted">{skills.length} skills</p>
      </FadeIn.Item>

      <FadeIn.Item>
        <div className="mt-8">
          <SkillCardGrid skills={skills} />
        </div>
      </FadeIn.Item>
    </FadeIn.Container>
  );
}
