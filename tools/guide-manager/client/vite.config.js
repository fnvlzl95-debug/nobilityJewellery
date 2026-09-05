import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  root: path.resolve(__dirname),
  plugins: [react()],
  build: { outDir: 'dist', emptyOutDir: true },
  server: {
    host: '127.0.0.1',
    port: 5174,
    proxy: { '/api': 'http://127.0.0.1:8788', '/generated-images': 'http://127.0.0.1:8788' },
  },
})
