const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        slidein: 'slidein 1s linear infinite',
        tempo:'tempo infinite'


      },
      keyframes: {
        slidein: {
          '0%': {
            marginLeft: '100%',
            opacity: '0%'
          },
          '10%': {
            opacity: '100'
          },
          '90%': {
            opacity: '100'
          },
          '100%': {
            marginLeft: '0%',
            opacity: '0%'
          }

        },
        tempo: {
          '0%': {
            
            opacity: '20%',
          },
          '50%':{opacity:'100%',transform:'scale(120%)'
          },
          '100%': {
            
            opacity: '20%'
          }

        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}