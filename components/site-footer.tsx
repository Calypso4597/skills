import { Github } from "@/components/icons";

export function SiteFooter() {
  return (
    <footer className="mt-16 flex items-center justify-between gap-4 border-t border-border pt-6 text-[13px] text-muted">
      <p>
        Community design, frontend, and design-engineering skills.{" "}
        <a
          className="underline underline-offset-4 hover:opacity-100"
          href="https://sanmid.com"
          target="_blank"
          rel="noreferrer"
        >
          sanmid.com
        </a>
      </p>
      <a
        className="inline-flex size-10 items-center justify-center transition-[color,opacity,transform] duration-150 ease-out hover:text-foreground hover:opacity-100 active:scale-[0.96]"
        href="https://github.com/Calypso4597/skills"
        target="_blank"
        rel="noreferrer"
        aria-label="Skills on GitHub"
      >
        <Github size={24} />
      </a>
    </footer>
  );
}
