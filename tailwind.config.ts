// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        kaluna: {
          // Brand core (dari guideline)
          pink: "#DEA9B6", // :contentReference[oaicite:3]{index=3}
          green: "#427949", // :contentReference[oaicite:4]{index=4}
          navy: "#224670", // :contentReference[oaicite:5]{index=5}

          // Neutral tambahan (untuk “warm minimalist”)
          cream: "#FAF7F2",
          sand: "#EFE7DD",
          ink: "#111827",
          muted: "#6B7280",
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
