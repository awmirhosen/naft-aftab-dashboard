import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
  ],
  server : {
    open: "https://demo.aftabor.com",
    proxy : {
      "/api/v1" : {
        target : "https://demo.aftabor.com",
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api\/v1/, "https://demo.aftabor.com")
      },
    }
  },
})
