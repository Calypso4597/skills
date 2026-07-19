"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 150,
      damping: 19,
      mass: 1.2,
    },
  },
};

function Container({ children, className }: React.HTMLProps<HTMLDivElement>) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={["overflow-x-clip", className].filter(Boolean).join(" ")}
    >
      {children}
    </motion.div>
  );
}

function Item({ children }: { children: React.ReactNode }) {
  return <motion.div variants={item}>{children}</motion.div>;
}

export { Container, Item };
