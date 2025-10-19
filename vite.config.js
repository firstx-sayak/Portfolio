import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Restricting optimiseDeps ensures only the handful of icons in use are prebundled, preventing Vite from caching the full Lucide catalog.
  optimizeDeps: {
    include: [
      'lucide-react/dist/esm/icons/brain.js',
      'lucide-react/dist/esm/icons/database.js',
      'lucide-react/dist/esm/icons/zap.js',
      'lucide-react/dist/esm/icons/mail.js',
      'lucide-react/dist/esm/icons/message-square.js',
      'lucide-react/dist/esm/icons/user.js',
      'lucide-react/dist/esm/icons/chevron-down.js',
    ],
    exclude: ['lucide-react'],
  },
  // Turning off dev CSS sourcemaps avoids embedding enormous inline maps that were inflating the HMR heap.
  css: {
    devSourcemap: false,
  },
})
