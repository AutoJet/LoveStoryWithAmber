import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: Replace 'YOUR_REPO_NAME' with your actual GitHub repository name
  // Example: If your repo is 'love-timeline', this should be '/love-timeline/'
  base: '/YOUR_REPO_NAME/',
})