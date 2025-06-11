import { resolve } from "node:path";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }), 
    viteReact(), 
    tailwindcss()
  ],
  test: {
    globals: true,
    environment: "jsdom",
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  // Ensure proper base path for production
  base: '/',
  // Make sure assets are properly handled
  build: {
    assetsDir: 'assets',
    // Ensure _redirects file is copied
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },
  // Preview server configuration (for testing builds locally)
  preview: {
    port: 4173,
    // This helps test SPA routing locally
    historyApiFallback: true
  }
});