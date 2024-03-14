/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-accent": "rgb(var(--main-accent))",
        "lighter-accent": "rgb(var(--lighter-accent))",
        "main-accent-hover": "rgb(var(--main-accent-hover))",
        "home-bg": "rgb(var(--home-bg))",
        "link-active": "rgb(var(--link-active))",
        "link-active-hover": "rgb(var(--link-active-hover))",
        "text": "rgb(var(--text))",
        "text-faded": "rgb(var(--text-faded))",
        "light-bg": "rgb(var(--light-bg))",
        "light-objects": "rgb(var(--light-objects))",
        "danger": "rgb(var(--danger))",
        "danger-hover": "rgb(var(--danger-hover))",
      },
      height: {
        screen: ['100vh', '100svh']
      }
    },
    fontFamily: {
      sans: ['Poppins', ...defaultTheme.fontFamily.sans]
    }
  },
  plugins: [],
}