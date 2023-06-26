import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {string} from "yup";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server : {
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
