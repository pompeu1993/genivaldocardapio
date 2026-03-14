import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    build: {
      sourcemap: 'hidden',
    },
    server: {
      proxy: {
        '/supabase': {
          target: env.VITE_SUPABASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/supabase/, ''),
          secure: false,
        },
      },
    },
    plugins: [
      react(),
      tsconfigPaths()
    ],
  }
})
