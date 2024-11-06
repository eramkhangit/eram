import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    external: ['sweetalert2', '@material-tailwind/react']
  },
  server: {
    host: '0.0.0.0'
  },

});
