import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        'process.env.MAPBOX_ACCESS_TOKEN': JSON.stringify(process.env.MAPBOX_ACCESS_TOKEN),
    },
    server: {
        host: true, // Needed for Docker
        port: 3006,
        strictPort: true,
    }
})
