/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "src/**/*.{js,jsx}"],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: "1rem",
    },
    fontFamily: {
      display: "Work Sans, ui-serif, Georgia, Cambria, Times New Roman, Times, serif",
      body: "Inter, ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
    },
  },
  plugins: [require("daisyui"), require("tailwindcss-animate")],
  daisyui: {
    themes: ["cmyk"],
  },
};
