import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from "@tailwindcss/vite";

const isDev = process.env.NODE_ENV === 'development';

const vitePWA = VitePWA({
  registerType: 'autoUpdate',
  injectRegister: 'auto',
  devOptions: {
    enabled: true,
  },
  manifest: {
    name: 'Ceiling Offline App',
    short_name: 'CeilingApp',
    description: 'Приложение для работы с потолками оффлайн',
    theme_color: '#ffffff',
    display: 'standalone',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  },
  workbox: {
    // В dev-режиме кэширование не нужно, чтобы не мешать разработке
    globPatterns: isDev ? [] : ['**/*.{js,css,html,png,svg,json}'],
    // Это ключевой момент для SPA!
    // Мы кэшируем index.html, чтобы при переходе на любой маршрут
    // офлайн, Service Worker возвращал именно его.
    navigateFallback: 'index.html',
    runtimeCaching: [
      {
        // Кэшируем шрифты Google Fonts
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365 // 1 год
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  }
});

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  plugins: [
    react(),
    tailwindcss(),
    vitePWA
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
    hmr: true,
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
});