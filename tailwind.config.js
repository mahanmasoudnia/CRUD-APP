/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,tsx,}"],
  theme: {
    extend: {
      colors: {
        orange: "#F26322",
        orange_hover: "#ed530e",
        orange_active: "#d54b0d",
      },
      container: {
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },

        center: true,
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    theme: false,
  },
};
