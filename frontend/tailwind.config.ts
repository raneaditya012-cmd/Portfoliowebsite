import type { Config } from "tailwindcss";

/* Design system
   Spacing: Tailwind's 4pt scale, used in 8pt steps (2, 4, 6, 8, 12, 16, 24).
   Radius:  one value (8px) for every container and control.
   Elevation: 1px borders only; a single shadow for the command palette overlay.
   Colour: neutrals plus one accent. */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      bg: "#0c0c0d",
      surface: "#131314",
      line: "#26262a",
      fg: "#ededec",
      white: "#ffffff",
      muted: "#a3a3a9",
      accent: "#e5a550",
      ok: "#7cc496",
    },
    borderRadius: { none: "0", DEFAULT: "8px", full: "9999px" },
    fontSize: {
      xs: ["12px", "16px"],
      sm: ["14px", "20px"],
      base: ["16px", "24px"],
      lg: ["18px", "28px"],
      xl: ["24px", "32px"],
      "2xl": ["32px", "40px"],
      "3xl": ["48px", "52px"],
      "4xl": ["64px", "68px"],
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: { overlay: "0 16px 48px rgba(0,0,0,.5)" },
    },
  },
  plugins: [],
};
export default config;
