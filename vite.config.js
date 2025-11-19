import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Add this 'server' block to allow cross-origin requests from other Replit URLs
  server: {
    allowedHosts: "all",
  },
});
