/* @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0E0F1A",
        surface: "#161832",
        surface2: "#1E2145",
        marquee: "#E8B14C",
        velvet: "#C4453A",
        paper: "#F1EDE4",
        muted: "#9497B5",
        line: "rgba(241,237,228,0.12)",
      },
      fontFamily: {
        display: ["'Bebas Neue'", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};