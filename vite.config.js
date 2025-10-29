import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      // Proxy Gemini API requests
      "/api/gemini": {
        target: "https://generativelanguage.googleapis.com",
        changeOrigin: true,
        rewrite: (path) => {
          // Get API key from env
          const apiKey = process.env.VITE_GEMINI_API_KEY;
          return `/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`;
        },
        configure: (proxy, options) => {
          proxy.on("proxyReq", (proxyReq, req, res) => {
            // Modify the request to POST with correct headers
            if (req.method === "POST") {
              proxyReq.setHeader("Content-Type", "application/json");
            }
          });
        },
      },
    },
  },
});
