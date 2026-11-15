import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0b0c0e", surface: "#111317", raised: "#16191e",
        fg: "#e6e6e3", muted: "#8b9099", faint: "#5b606a",
        accent: "#a5b4fc", ok: "#8fcfa3", warm: "#dcbf92",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        blink: { "0%,49%": { opacity: "1" }, "50%,100%": { opacity: "0" } },
      },
      animation: { marquee: "marquee 40s linear infinite", blink: "blink 1.1s step-end infinite" },
    },
  },
  plugins: [],
};
export default config;
