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
        // Sin esto, un service worker nuevo se instala pero se queda
        // "esperando" hasta que se cierren todas las pestañas/instancias
        // de la app antes de activarse — en una PWA instalada eso puede
        // tardar días. Con skipWaiting + clientsClaim, la nueva versión
        // (con sus fixes) toma el control en cuanto termina de instalarse.
        skipWaiting: true,
        clientsClaim: true,
        globPatterns: ['**/*.{js,css,html,png,svg,ico,webp}'],
        navigateFallback: '/index.html',
      },
    }),
  ],
})
