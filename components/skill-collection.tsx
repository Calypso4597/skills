"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Pan } from "@/components/icons";
import { SkillCardGrid } from "@/components/skill-card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import type { SkillMeta } from "@/lib/skill-meta";

type SkillCollectionProps = {
  skills: SkillMeta[];
  featured: SkillMeta[];
  showSeeAll?: boolean;
};

export function SkillCollection({
  skills,
  featured,
  showSeeAll = true,
}: SkillCollectionProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return featured;
    return skills.filter((skill) => {
      const haystack = [
        skill.name,
        skill.description,
        skill.user,
        skill.pathSlug,
        ...skill.topics,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [featured, query, skills]);

  const searching = query.trim().length > 0;

  return (
    <section className="mt-10">
      <Command
        shouldFilter={false}
        className="mb-6 shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.2),0px_2px_4px_0px_rgba(0,0,0,0.04)]"
      >
        <CommandInput
          value={query}
          onValueChange={setQuery}
          placeholder="Search skills…"
        />
        {searching ? (
          <CommandList>
            <CommandEmpty>No skills found.</CommandEmpty>
            <CommandGroup heading="Skills">
              {filtered.map((skill) => (
                <CommandItem
                  key={skill.pathSlug}
                  value={`${skill.name} ${skill.user} ${skill.description}`}
                  onSelect={() => router.push(`/skills/${skill.pathSlug}`)}
                >
                  <Image
                    src={`https://github.com/${skill.user}.png?size=64`}
                    alt=""
                    width={20}
                    height={20}
                    className="size-5 rounded-full outline outline-1 outline-black/10"
                  />
                  <span className="min-w-0 flex-1 truncate font-medium">{skill.name}</span>
                  <span className="shrink-0 text-muted">{skill.user}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        ) : null}
      </Command>

      <div className="mb-3 flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-2 text-balance text-[15px] font-normal text-foreground">
          <Pan size={16} />
          <span className="tabular-nums">
            Skills ({searching ? filtered.length : featured.length}
            {searching ? ` of ${skills.length}` : ""})
          </span>
        </h2>
        {showSeeAll ? (
          <Link
            href="/skills"
            className="inline-flex min-h-10 items-center text-[13px] text-muted underline-offset-4 transition-opacity hover:text-foreground hover:underline hover:opacity-100"
          >
            See all
          </Link>
        ) : null}
      </div>

      <SkillCardGrid skills={filtered} />
    </section>
  );
}
