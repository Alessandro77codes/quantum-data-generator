/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0D1117",
        cardCustom: "#161B22",
        quantum: "#0605AB",
        quantumHover: "#1426EA",
        neon: "#00FF66",
        txtPrimary: "#FFFFFF",
        txtSecondary: "#B3B8C5",
      },
    },
  },
  plugins: [],
}