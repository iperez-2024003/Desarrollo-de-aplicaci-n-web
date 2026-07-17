import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Puerto propio para no chocar con los otros frontends del proyecto
    // (auth y tasks usan el 5173).
    port: 5175,
    open: true,
  },
});
