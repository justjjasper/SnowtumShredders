import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
    },
    colors: {
      primary: 'white',
      secondary: 'black'
    },
    fontFamily: {
      'calibre': ['"Calibre"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'Sans-serif'],
      'holtwood': ["'Holtwood One SC'", '"Helvetica Neue"', 'Helvetica', 'Arial', 'Sans-serif'],
    },
    screens: {
      'xsm': '560px',
      //=> @media (min-width: 560px) aka smallest browser screen
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    zIndex: {
      '40': '40',
      '50': '50',
      '9999': '9999'
    }
  },
  plugins: [],
}
export default config
