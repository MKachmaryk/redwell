module.exports = {
  purge: [],
  theme: {
    extend: {
      backgroundColor: theme => ({
        'button': '#1b2834',
        'sidebar-header': '#2c3e50',
        'sidebar-content': '#1e212a',
        'auth-phone-input': '#e8f0fe',
        'preview-file-title': '#6a81a4'
      }),
      borderRadius: theme => ({
        'xl': '1rem',
        '2xl': '2rem'
      }),
      textColor: theme => ({
        'auth-form': '#212529',
        'preview': '#7d7c8e'
      }),
      width: theme => ({
        '33': '8.25rem',
        'pdf-thumbnail': '8.8rem'
      })
    }
  },
  variants: {},
  plugins: []
}
