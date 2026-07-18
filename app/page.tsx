import * as FadeIn from "@/components/motion/staggers/fade";
import { SkillCollection } from "@/components/skill-collection";
import { DesignSkillsWordmark } from "@/components/wordmark";
import { getSkills } from "@/lib/skills";

export default function HomePage() {
  const skills = getSkills();
  const displayed = skills.slice(0, 16);

  return (
    <FadeIn.Container>
      <FadeIn.Item>
        <section>
          <DesignSkillsWordmark />
          <p className="mt-6 w-full text-[24px] leading-[150%] text-muted">
            A curated collection of community design, frontend, and design-engineering
            skills for humans and agents.
          </p>
        </section>
      </FadeIn.Item>
      <FadeIn.Item>
        <SkillCollection skills={skills} featured={displayed} />
      </FadeIn.Item>
    </FadeIn.Container>
  );
}
