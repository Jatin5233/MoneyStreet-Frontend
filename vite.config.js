import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   build: {
    outDir: 'build', // change this to whatever you want (e.g., 'dist', 'public', etc.)
  },
})
