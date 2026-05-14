import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    /**
     * cloudflared / ngrok / etc. envían Host=*.trycloudflare.com; Vite 6+ lo bloquea por defecto.
     * Solo aplica en dev (`npm run dev`), no en `vite preview` salvo que lo configures igual.
     */
    allowedHosts: true,
    /** Handler local (POC Java) escucha en PORT; por defecto 8080. Si usas PORT=9000, cambia el target. */
    /*   proxy: {
      '/convenios': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    }, */
  },
});
