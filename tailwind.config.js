/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx,cjs,mjs,cts,mts}",],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(rgba(27, 30, 36, 0), rgb(27, 30, 36) 84.21%)',
      },
    },
  },
  plugins: [],
}

