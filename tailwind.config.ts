import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages//*.{ts,tsx}",
    "./components//*.{ts,tsx}",
    "./app//*.{ts,tsx}",
    "./src//*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px'
      }
    },
    extend: {}
  },
  plugins: [],
} satisfies Config;
