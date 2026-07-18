"use client";

import { useEffect, useRef } from "react";

const DESIGN_SKILLS_ANSI_SHADOW = `
██████╗ ███████╗███████╗██╗ ██████╗ ███╗   ██╗    ███████╗██╗  ██╗██╗██╗     ██╗     ███████╗
██╔══██╗██╔════╝██╔════╝██║██╔════╝ ████╗  ██║    ██╔════╝██║ ██╔╝██║██║     ██║     ██╔════╝
██║  ██║█████╗  ███████╗██║██║  ███╗██╔██╗ ██║    ███████╗█████╔╝ ██║██║     ██║     ███████╗
██║  ██║██╔══╝  ╚════██║██║██║   ██║██║╚██╗██║    ╚════██║██╔═██╗ ██║██║     ██║     ╚════██║
██████╔╝███████╗███████║██║╚██████╔╝██║ ╚████║    ███████║██║  ██╗██║███████╗███████╗███████║
╚═════╝ ╚══════╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝    ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝
`.trim();

function readNumber(styles: CSSStyleDeclaration, name: string, fallback: number) {
  const value = parseFloat(styles.getPropertyValue(name));
  return Number.isFinite(value) ? value : fallback;
}

export function DesignSkillsWordmark() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const el = preRef.current;
    if (!wrap || !el) return;

    const fit = () => {
      el.style.transform = "none";
      wrap.style.height = "auto";
      const natural = el.scrollWidth;
      const available = wrap.clientWidth;
      if (natural <= 0 || available <= 0) return;
      const scale = Math.min(1, available / natural);
      el.style.transform = `scale(${scale})`;
      el.style.transformOrigin = "left top";
      wrap.style.height = `${el.scrollHeight * scale}px`;
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = preRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    let last = performance.now();
    let offset = 0;

    const tick = (now: number) => {
      const rootStyles = getComputedStyle(document.documentElement);
      const playState = rootStyles.getPropertyValue("--wordmark-play-state").trim();
      const direction = rootStyles.getPropertyValue("--wordmark-direction").trim();
      const duration = Math.max(0.1, readNumber(rootStyles, "--wordmark-duration", 8));
      const sizePct = Math.max(100, readNumber(rootStyles, "--wordmark-size", 200));

      if (playState !== "paused") {
        const dt = Math.min(0.05, (now - last) / 1000);
        const tile = Math.max(1, el.offsetWidth * (sizePct / 100));
        const dir = direction === "reverse" ? -1 : 1;
        // Wrap continuously — never restart a CSS keyframe cycle
        offset = (offset + dir * (dt / duration) * tile) % tile;
        if (offset < 0) offset += tile;
        el.style.backgroundPosition = `${-offset}px 50%`;
      }

      last = now;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={wrapRef} className="relative max-w-full overflow-hidden">
      <h1 className="sr-only">Design Skills</h1>
      <pre
        ref={preRef}
        aria-hidden
        className="wordmark-rainbow inline-block select-none whitespace-pre font-fira"
      >
        {DESIGN_SKILLS_ANSI_SHADOW}
      </pre>
    </div>
  );
}
