import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window',
  },
  // 别名路径的配置
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
