import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',

      includeAssets: [
        'img.png',
        'img1.png',
        'img2.jpg',
        'img3.avif',
        'robots.txt'
      ],

      workbox: {
        navigateFallback: '/index.html',
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,svg,avif,txt}'],

        // 🔥 AUMENTA EL LÍMITE PARA IMÁGENES PESADAS
        maximumFileSizeToCacheInBytes: 15 * 1024 * 1024 // 15MB
      },

      manifest: {
        name: 'Api de gastos',
        short_name: 'ApiGastos',
        description: 'Aplicacion Hecha Por Andres Fauricio Orrego Serna',
        start_url: '/',
        display: 'standalone',
        theme_color: '#ffffff',

        screenshots: [
          {
            src: '/img/img3.jpg',
            sizes: '540x720',
            type: 'image/jpeg',
            form_factor: 'narrow'
          },
          {
            src: '/img/img3.jpg',
            sizes: '1280x720',
            type: 'image/jpeg',
            form_factor: 'wide'
          }
        ],

        icons: [
          {
            src: '/img/img1.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/img/img.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})