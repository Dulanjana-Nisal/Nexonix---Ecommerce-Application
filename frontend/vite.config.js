import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,         // Expose to the local network inside Docker
    port: 5173,
    watch: {
      usePolling: true, // Forces Docker to pick up file changes on Windows/macOS
    }
  }
})
