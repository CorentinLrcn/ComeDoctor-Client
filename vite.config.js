import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({ registerType: 'autoUpdate', manifest: {"name":"comedoctor-client","short_name":"comedoctor-client","start_url":"/","display":"standalone","background_color":"#ffffff","lang":"en","scope":"/"} }),],
})
