import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // "@/..." points at src/ (shadcn-style imports)
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})
