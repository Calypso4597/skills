export type TopicSlug =
  | "accessibility"
  | "motion"
  | "systems"
  | "visual"
  | "interaction"
  | "performance"
  | "craft"
  | "taste"
  | "frontend"
  | "architecture"
  | "tooling"
  | "video"
  | "nextjs"
  | "remotion"
  | "testing"
  | "typography";

export type Topic = {
  slug: TopicSlug;
  label: string;
  description: string;
};

export const topics: Topic[] = [
  {
    slug: "craft",
    label: "Craft",
    description:
      "Polish, optical detail, and the invisible work that makes UI feel finished.",
  },
  {
    slug: "taste",
    label: "Taste",
    description: "Visual judgment, restraint, and anti-generic aesthetic direction.",
  },
  {
    slug: "visual",
    label: "Visual",
    description: "Layout, hierarchy, color, and composition systems.",
  },
  {
    slug: "motion",
    label: "Motion",
    description: "Animation, transitions, and interaction timing.",
  },
  {
    slug: "interaction",
    label: "Interaction",
    description: "Microinteractions, feedback, and stateful UI behavior.",
  },
  {
    slug: "frontend",
    label: "Frontend",
    description: "Implementation patterns for production web interfaces.",
  },
  {
    slug: "accessibility",
    label: "Accessibility",
    description: "Inclusive interfaces, semantics, and usable defaults.",
  },
  {
    slug: "performance",
    label: "Performance",
    description: "Rendering cost, animation budgets, and React/Next speed.",
  },
  {
    slug: "systems",
    label: "Systems",
    description: "Design systems, component libraries, and scalable structure.",
  },
  {
    slug: "nextjs",
    label: "Next.js",
    description: "React and Next.js architecture and performance skills.",
  },
  {
    slug: "remotion",
    label: "Remotion",
    description: "Programmatic video and motion with Remotion.",
  },
  {
    slug: "video",
    label: "Video",
    description: "Motion graphics and code-driven video workflows.",
  },
  {
    slug: "tooling",
    label: "Tooling",
    description: "Agent routing, install flows, and workflow utilities.",
  },
  {
    slug: "architecture",
    label: "Architecture",
    description: "How skills compose and how agents should choose context.",
  },
  {
    slug: "testing",
    label: "Testing",
    description: "Review, critique, and verification of UI quality.",
  },
  {
    slug: "typography",
    label: "Typography",
    description: "Type systems, wrapping, and text hierarchy.",
  },
];

export const topicBySlug = new Map(topics.map((topic) => [topic.slug, topic]));
