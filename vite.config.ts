import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          'admin': [
            './src/Admin/AdminLogin.tsx',
            './src/Admin/AdminMain.tsx',
          ],
          'vendor': [
            '@supabase/supabase-js',
            'react-quilljs',
            'quill',
          ],
        },
      },
    },
  },
})