/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      color:{
        primary: '#fafafa',
        accent: '#d4d4d8',
        white: '#ffffff',
        sky: {
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7'
        },
        zinc: {
          400: '#a1a1aa'
        },
        rose: {
          400: '#fb7185',
          500: '#f43f5e'
        },
        secondary: '#393e46',
        dark: '#222831'
      }
    },
    
  },
  plugins: [],
}
