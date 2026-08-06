import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'icon-16.png',
        'icon-32.png',
        'icon-180.png',
        'apple-touch-icon.png',
        'og-image.png',
      ],
      manifest: {
        name: 'Viaje a Japón — Septiembre 2026',
        short_name: 'Japón 2026',
        description: 'Guía del viaje a Japón, septiembre 2026',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#1D3557',
        theme_color: '#1D3557',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
        navigateFallback: '/index.html',
        runtimeCaching: [
          {
            // Fotos de las guías (Wikimedia). Una vez vistas quedan
            // guardadas, así siguen disponibles sin conexión en Japón.
            urlPattern: /^https:\/\/upload\.wikimedia\.org\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'wikimedia-images',
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 90 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Respuestas de la API de Wikipedia (qué imagen corresponde
            // a cada lugar).
            urlPattern: /^https:\/\/en\.wikipedia\.org\/w\/api\.php.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'wikipedia-api',
              expiration: { maxEntries: 40, maxAgeSeconds: 60 * 60 * 24 * 90 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
})
