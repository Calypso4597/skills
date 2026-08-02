"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Checkmark, Clipboard } from "@/components/icons";

async function copyText(text: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Fall through to legacy copy
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);
  const ok = document.execCommand("copy");
  document.body.removeChild(textarea);
  if (!ok) throw new Error("Copy failed");
}

const iconVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};

export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  const reducedMotion = useReducedMotion();

  async function onCopy() {
    try {
      await copyText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-base border border-border bg-white px-3 py-2.5">
      <code className="min-w-0 flex-1 overflow-x-auto text-[13px] text-foreground">
        {command}
      </code>
      <button
        type="button"
        onClick={onCopy}
        className="relative inline-flex size-10 shrink-0 items-center justify-center text-muted transition-[color,opacity,transform] duration-150 ease-out hover:text-foreground hover:opacity-100 active:scale-[0.96]"
        aria-label={copied ? "Copied install command" : "Copy install command"}
      >
        <span className="relative flex size-[18px] items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="check"
                className="absolute inset-0 flex items-center justify-center"
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { duration: 0.15, ease: "easeOut" }
                }
              >
                <Checkmark size={18} className="pointer-events-none" />
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                className="absolute inset-0 flex items-center justify-center"
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { duration: 0.15, ease: "easeOut" }
                }
              >
                <Clipboard size={18} className="pointer-events-none" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </button>
    </div>
  );
}
