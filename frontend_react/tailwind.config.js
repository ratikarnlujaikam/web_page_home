/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto', 'Arial', 'sans-serif'],
        'serif': ['Merriweather', 'serif'],
      },
      colors: {
        'header-bg': '#ffffff',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#00cbff",
          "secondary": "#ff0000",
          "accent": "#00c06c",
          "neutral": "#351c19",
          "base-100": "#e6ffff",
          "info": "#0074af",
          "success": "#00ba00",
          "warning": "#ff8d00",
          "error": "#ff778a",
        },
      },
    ],
  },
}
