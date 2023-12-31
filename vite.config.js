import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/assets/styles/scss/variables.scss";`
        }
      },
      postcss: { plugins: [autoprefixer()] }
    },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
