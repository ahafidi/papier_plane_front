import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true, // https://testing-library.com/docs/react-testing-library/setup/#auto-cleanup-in-vitest
    environment: 'jsdom',
  },
})
