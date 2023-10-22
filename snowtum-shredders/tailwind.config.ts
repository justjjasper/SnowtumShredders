import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
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
        primary: 'white',
        secondary: 'black'
      },
      fontFamily: {
        'calibre': ['"Calibre"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'Sans-serif'],
        'holtwood': ["'Holtwood One SC'", '"Helvetica Neue"', 'Helvetica', 'Arial', 'Sans-serif'],
      },
    },
    screens: {
      'max-lg': { 'max': '1024px'}
      // => @media (max-width: 1024px) { ... }
    },
  plugins: [],
}
export default config
