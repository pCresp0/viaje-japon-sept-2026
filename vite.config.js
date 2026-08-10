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
        theme_color: '#4d1c1e',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Sin esto, un service worker nuevo se instala pero se queda
        // "esperando" hasta que se cierren todas las pestañas/instancias
        // de la app antes de activarse — en una PWA instalada eso puede
        // tardar días. Con skipWaiting + clientsClaim, la nueva versión
        // (con sus fixes) toma el control en cuanto termina de instalarse.
        skipWaiting: true,
        clientsClaim: true,
        globPatterns: ['**/*.{js,css,html,png,svg,ico,webp}'],
        navigateFallback: '/index.html',
        runtimeCaching: [
          {
            // Teselas del mapa (CartoDB). CacheFirst: una vez descargada
            // una tesela no hace falta volver a pedirla — el mapa de una
            // zona no cambia de un día para otro. Esto cubre dos casos:
            // 1) cualquier tesela que se vea alguna vez en la app queda
            //    guardada sola, sin que el usuario tenga que hacer nada;
            // 2) el botón "Descargar mapa sin conexión" de la pestaña
            //    Mapa, que precarga de golpe toda la zona del viaje.
            urlPattern: /^https:\/\/[a-d]\.basemaps\.cartocdn\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'map-tiles',
              expiration: { maxEntries: 3000, maxAgeSeconds: 60 * 60 * 24 * 180 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
})
