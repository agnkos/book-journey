/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-accent": "rgb(var(--main-accent))",
        "main-accent-hover": "rgb(var(--main-accent-hover))",
        "home-bg": "rgb(var(--home-bg))",
        "link-active": "rgb(var(--link-active))",
        "link-active-hover": "rgb(var(--link-active-hover))",
        "text": "rgb(var(--text))",
        "text-faded": "rgb(var(--text-faded))",
        "light-bg": "rgb(var(--light-bg))",
        "light-objects": "rgb(var(--light-objects))",
      }
    },
  },
  plugins: [],
}