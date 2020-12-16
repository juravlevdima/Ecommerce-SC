module.exports = {
  purge: ['./client/**/*.html', './client/**/*.jsx', './client/**/*.js'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    boxShadow: {
      ch: '0px 4px 6px 0 rgba(0, 0, 0, 0.5)'
    }
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'group-focus']
    }
  },
  plugins: []
}
