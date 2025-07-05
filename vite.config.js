import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/taco1/', // 👈 nombre exacto del repo de GitHub
  plugins: [vue()]
})
