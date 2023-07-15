import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
  ],
  server : {
    open: "https://donfilm.net",
    proxy : {
      "/api/v1" : {
        target : "https://donfilm.net",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/v1/, "https://donfilm.net/api/v1")
      },
    }
  },
})
