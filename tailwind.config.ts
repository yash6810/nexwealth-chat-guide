import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
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
        // Keep the nexwealth colors
        nexwealth: {
          blue: {
            DEFAULT: "#0A2463",
            dark: "#081A4F"
          },
          teal: {
            DEFAULT: "#247BA0", 
            dark: "#1E6887"
          },
          lightTeal: {
            DEFAULT: "#5DD9C1",
            dark: "#4AC2AB"
          },
          gold: {
            DEFAULT: "#FFD166",
            dark: "#FFBF33"
          },
          neutral: {
            DEFAULT: "#FAF9F6",
            dark: "#1A1F2C"
          }
        }
      },
      // Add theme-specific background gradients
      backgroundImage: {
        "gradient-light": "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        "gradient-dark": "linear-gradient(135deg, #232526 0%, #414345 100%)"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    }
  },
  plugins: [require("tailwindcss-animate")]
} satisfies Config;
