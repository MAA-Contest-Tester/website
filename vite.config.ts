import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: "REACT_APP_",
  server: {
    host: "localhost",
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@lib": path.resolve(__dirname, "src", "lib"),
      "@components": path.resolve(__dirname, "src", "components"),
      "@data": path.resolve(__dirname, "src", "data"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          firebase: [
            "firebase/app",
            "firebase/analytics",
            "firebase/firestore",
            "firebase/auth",
          ],
        },
      },
    },
  },
});
