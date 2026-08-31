import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Portfolio/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        xo: 'xo.html',
      },
    },
  },
})
