import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: [
    "open-requirements-he-vi.trycloudflare.com",
    "localhost",
    "127.0.0.1"
  ], // allow Cloudflare Tunnel + local dev
  hmr: {
    clientPort: 443, // force HMR over HTTPS for tunnel
  },
  },
  build: {
    outDir: "build",
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
