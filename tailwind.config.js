/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBlue: '#C2DEDC',
        lightBeige: '#ECE5C7',
        darkBeige: '#CDC2AE',
        darkBlue: '#116A7B',
      },
    },
  },
  plugins: [],
}

