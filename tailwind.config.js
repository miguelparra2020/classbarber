/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,astro}", // Asegúrate de incluir todos los archivos relevantes
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        customColor1: '#060606',
        customColor2: '#292c30',
        customColor3: '#535a61',
        customColor4: '#889496',
        customColor5: '#c3d0d5',
        customColor6: '#f2f7f9',
        customColor7: '#F9FAFB',
        customColor8: '#1E293B',
      },
    },
  },
  plugins: [],
}

