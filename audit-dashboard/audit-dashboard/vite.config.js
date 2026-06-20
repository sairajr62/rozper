import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/audit/' : '/',
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
  optimizeDeps: {
    include: ['xlsx'],
  },
  build: {
    outDir: 'dist',
    commonjsOptions: {
      include: [/xlsx/, /node_modules/],
    },
  },
}))
