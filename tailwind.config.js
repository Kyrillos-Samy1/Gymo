/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "300px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "1xl": "1420px",
        "2xl": "1550px"
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};
