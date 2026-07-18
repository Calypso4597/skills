import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          1: "var(--gray-1)",
          2: "var(--gray-2)",
          3: "var(--gray-3)",
          4: "var(--gray-4)",
          5: "var(--gray-5)",
          6: "var(--gray-6)",
          7: "var(--gray-7)",
          8: "var(--gray-8)",
          9: "var(--gray-9)",
          10: "var(--gray-10)",
          11: "var(--gray-11)",
          12: "var(--gray-12)",
        },
        mauve: {
          1: "var(--mauve-1)",
          2: "var(--mauve-2)",
          3: "var(--mauve-3)",
          4: "var(--mauve-4)",
          5: "var(--mauve-5)",
          6: "var(--mauve-6)",
          7: "var(--mauve-7)",
          8: "var(--mauve-8)",
          9: "var(--mauve-9)",
          10: "var(--mauve-10)",
          11: "var(--mauve-11)",
          12: "var(--mauve-12)",
        },
        background: "var(--bg)",
        foreground: "var(--fg)",
        muted: "var(--muted)",
        border: "var(--border)",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
        fira: ["Fira Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      borderRadius: {
        small: "var(--radius-small)",
        base: "var(--radius-base)",
        large: "var(--radius-large)",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".text-small": {
          fontSize: "12px",
          letterSpacing: "0.01px",
        },
        ".text-default": {
          fontSize: "14px",
          lineHeight: "150%",
          letterSpacing: "-0.09px",
        },
      });
    }),
  ],
};

export default config;
