import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardHeaderRow,
  CardTitle,
} from "@/components/ui/card";
import { formatInstalls, type SkillMeta } from "@/lib/skill-meta";

function SkillCard({ skill }: { skill: SkillMeta }) {
  const installsLabel = formatInstalls(skill.installs);

  return (
    <Link
      href={`/skills/${skill.pathSlug}`}
      className="block min-w-0 transition-opacity hover:opacity-100"
    >
      <Card className="overflow-hidden py-0">
        <CardHeader className="min-w-0 gap-3 border-0 p-5">
          <CardHeaderRow className="items-center gap-3">
            <CardTitle className="min-w-0 flex-1 text-balance">{skill.name}</CardTitle>
            <div className="flex shrink-0 items-center gap-2">
              <Image
                src={`https://github.com/${skill.user}.png?size=64`}
                alt=""
                width={20}
                height={20}
                className="size-5 rounded-full outline outline-1 outline-black/10"
              />
              <span className="text-[12px] text-foreground">{skill.user}</span>
            </div>
          </CardHeaderRow>
          <CardDescription className="line-clamp-2 text-[13px] leading-[150%] text-muted">
            {skill.description}
          </CardDescription>
          {installsLabel ? (
            <p className="text-[12px] tabular-nums text-muted">{installsLabel} installs</p>
          ) : null}
        </CardHeader>
      </Card>
    </Link>
  );
}

export function SkillCardGrid({ skills }: { skills: SkillMeta[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {skills.map((skill) => (
        <SkillCard key={skill.pathSlug} skill={skill} />
      ))}
    </div>
  );
}
