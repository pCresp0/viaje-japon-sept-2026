import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/viaje-japon-sept-2026/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png'],
      manifest: {
        name: 'Viaje a Japón — Sept 2026',
        short_name: 'Japón 2026',
        description: 'Guía del viaje a Japón, septiembre 2026',
        start_url: '/viaje-japon-sept-2026/',
        scope: '/viaje-japon-sept-2026/',
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
        navigateFallback: '/viaje-japon-sept-2026/index.html',
      },
    }),
  ],
})
