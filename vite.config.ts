import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages(https://<user>.github.io/overwatch-world-archive/)용 base 경로.
// 로컬 dev는 루트(/)에서 그대로 동작한다.
export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? '/overwatch-world-archive/' : '/',
  plugins: [react()],
}))
