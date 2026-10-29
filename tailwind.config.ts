import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#0F172A",
        accent: "#10B981",
        navy: {
          "50": "#EEF2FF",
          "900": "#0F172A",
          "950": "#020617",
        },
        mint: {
          "400": "#34D399",
          "500": "#10B981",
          "600": "#059669",
        },
      },
      fontFamily: {
        sans: ["Pretendard", "Noto Sans KR", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        card: "0 4px 20px -2px rgb(0 0 0 / 0.08)",
        cardHover: "0 8px 30px -4px rgb(0 0 0 / 0.15)",
        glow: "0 0 20px rgba(16, 185, 129, 0.3)",
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        slideUp: "slideUp 0.4s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(16, 185, 129, 0.2)" },
          "50%": { boxShadow: "0 0 30px rgba(16, 185, 129, 0.5)" },
        },
      },
    },
  },
  plugins: [],
}

export default config
