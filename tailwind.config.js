/** @type {import('tailwindcss').Config} */
/**  @import url('https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap') */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'background': "url('/background.jpg')",
      },
      fontFamily: {
        'play': ['Play', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
