/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.{html,js}'],
  theme: {
    screens: {
      sm: '375px',
      md: '480px',
      lg: '768px',
      xl: '976px'
    },

    extend: {
      colors: {
        // primary
        purple: 'hsl(259, 100%, 65%)',
        lightRed: 'hsl(0, 100%, 67%)',

        // neutral
        white: 'hsl(0, 0%, 100%)',
        offWhite: 'hsl(0, 0%, 94%)',
        lightGrey: 'hsl(0, 0%, 86%)',
        smokeyGrey: 'hsl(0, 1%, 44%)',
        offBlack: 'hsl(0, 0%, 8%)'
      }
    },
  },
  plugins: [],
}

