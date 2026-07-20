/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'


// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#f7f9fc',
          surface: '#ffffff',
          primary: '#00695c',
          secondary: '#455a64',
          error: '#b3261e',
          info: '#0288d1',
          success: '#2e7d32',
          warning: '#ed6c02',
        },
      },
    },
  },
})
