import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        "background-elevated": "hsl(var(--background-elevated))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Neon Colors
        cyan: "hsl(var(--cyan))",
        magenta: "hsl(var(--magenta))",
        yellow: "hsl(var(--yellow))",
        // Mood Colors
        "mood-melancholy": "hsl(var(--mood-melancholy))",
        "mood-anger": "hsl(var(--mood-anger))",
        "mood-joy": "hsl(var(--mood-joy))",
        "mood-fear": "hsl(var(--mood-fear))",
        "mood-love": "hsl(var(--mood-love))",
        "mood-neutral": "hsl(var(--mood-neutral))",
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        tamil: ['Noto Sans Tamil', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { 
            boxShadow: "0 0 10px hsl(180 100% 50% / 0.3), 0 0 20px hsl(180 100% 50% / 0.2)",
          },
          "50%": { 
            boxShadow: "0 0 20px hsl(180 100% 50% / 0.6), 0 0 40px hsl(180 100% 50% / 0.4)",
          },
        },
        "scanline": {
          from: { top: "0", opacity: "1" },
          to: { top: "100%", opacity: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glitch": {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" },
        },
        "waveform-bar": {
          "0%, 100%": { transform: "scaleY(0.3)" },
          "50%": { transform: "scaleY(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "scanline": "scanline 0.4s ease-out forwards",
        "float": "float 3s ease-in-out infinite",
        "glitch": "glitch 0.3s ease-in-out",
        "waveform": "waveform-bar 0.5s ease-in-out infinite",
      },
      boxShadow: {
        brutal: "4px 4px 0px hsl(0 0% 0%)",
        "brutal-lg": "6px 6px 0px hsl(0 0% 0%)",
        "glow-cyan": "0 0 20px hsl(180 100% 50% / 0.5)",
        "glow-magenta": "0 0 20px hsl(300 100% 50% / 0.5)",
        "glow-yellow": "0 0 20px hsl(75 100% 50% / 0.5)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
