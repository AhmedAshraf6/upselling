module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        grayColor: '#B2B2B2',
      },

      fontFamily: {
        primary: 'Arian',
      },
    },
    screens: {
      sm: '576px',
      md: '767px',
      lg: '992px',
      xl: '1200px',
      xxl: '1400px',
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#91268F',
          secondary: '#9A9A9A',
          black: '#000',
          'base-100': '#ffffff',
        },
      },
    ],
  },
};
