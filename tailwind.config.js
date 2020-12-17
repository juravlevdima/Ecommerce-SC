module.exports = {
  purge: ['./client/**/*.html', './client/**/*.jsx', './client/**/*.js'],
  theme: {
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
