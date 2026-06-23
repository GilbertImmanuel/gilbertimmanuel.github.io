import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Force a single React instance — `motion/react` (first used in Reveal.jsx) was
  // resolving a second copy, triggering "Invalid hook call".
  resolve: { dedupe: ['react', 'react-dom'] },
})
