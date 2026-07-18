import type { Metadata } from "next";
import Link from "next/link";
import * as FadeIn from "@/components/motion/staggers/fade";
import { SkillCollection } from "@/components/skill-collection";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getSkills } from "@/lib/skills";

export const metadata: Metadata = {
  title: "All skills",
  description:
    "Browse every curated design, frontend, and design-engineering skill in the collection.",
};

export default function SkillsIndexPage() {
  const skills = getSkills();

  return (
    <FadeIn.Container>
      <FadeIn.Item>
        <section>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>All skills</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="sr-only">All skills</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            <span className="tabular-nums">{skills.length}</span> community skills across
            design engineering, frontend craft, motion, and systems.
          </p>
        </section>
      </FadeIn.Item>
      <FadeIn.Item>
        <SkillCollection skills={skills} featured={skills} showSeeAll={false} />
      </FadeIn.Item>
    </FadeIn.Container>
  );
}
