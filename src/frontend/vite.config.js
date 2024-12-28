import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import environment from 'vite-plugin-environment';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

export default defineConfig({
  build: {
    emptyOutDir: true,
    rollupOptions: {
      
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
      },
    },
    // headers: {
    //   'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; connect-src 'self' http://localhost:* https://icp0.io https://*.icp0.io https://icp-api.io; img-src 'self' data: http://dummy-images.com/; style-src * 'unsafe-inline'; style-src-elem * 'unsafe-inline'; font-src *; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests;",
    // },
  },
  plugins: [
    react(),
    environment("all", { prefix: "CANISTER_" }),
    environment("all", { prefix: "DFX_" }),
  ],
  resolve: {
    alias: [
      {
        '@dfinity/auth-client': fileURLToPath(new URL('../node_modules/@dfinity/auth-client/dist/auth-client.cjs.js', import.meta.url)),
        '@dfinity/agent': fileURLToPath(new URL('../node_modules/@dfinity/agent/dist/agent.cjs.js', import.meta.url)),
        find: "declarations",
        replacement: fileURLToPath(
          new URL("../declarations", import.meta.url)
        ),
      },
    ],
  },
});
