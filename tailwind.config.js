/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },

      colors: {
        /* Brand system for Tetra-Core */
        brand: {
          dark: "#0B1B3F",     // Deep enterprise blue
          blue: "#1E3A8A",     // SaaS blue
          accent: "#F97316",   // Innovation orange
          light: "#F8FAFC",    // Soft white
          muted: "#94A3B8",    // Professional gray
        },

        /* Keep existing orange palette for buttons */
        orange: {
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
        },
      },
    },
  },

  plugins: [],
};
