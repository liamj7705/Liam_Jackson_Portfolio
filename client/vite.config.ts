import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Sub-path the site is served from when deployed
  base: '/Liam_Jackson_Portfolio/',

  server: {
    // During development, forward API and auth requests to the Express server
    proxy: {
      '/api': 'http://localhost:3000',
      '/auth': 'http://localhost:3000',
    },
  },
})
