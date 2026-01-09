// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        kaluna: {
          // Brand core (dari guideline)
          pink: "#e6a2b6",
          green: "#3f7d55",
          navy: "#224670",
          coral: "#f08c6a",
          sun: "#f6c56e",
          sky: "#6cb4d9",

          // Neutral tambahan (untuk “warm minimalist”)
          cream: "#fff7ef",
          sand: "#f2e6d8",
          ink: "#1a1c24",
          muted: "#6b7280",
          line: "rgba(17,24,39,0.10)",
        },
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(17, 24, 39, 0.08)",
        lift: "0 14px 40px rgba(17, 24, 39, 0.12)",
      },
    },
  },
  plugins: [],
} satisfies Config;
