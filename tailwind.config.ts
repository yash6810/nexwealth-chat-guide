
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
        // Light Mode Colors
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
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
} satisfies Config;

