import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'unpropped-dexter-unwakefully.ngrok-free.dev',
      'proud-books-like.loca.lt'
    ]
  },
})
