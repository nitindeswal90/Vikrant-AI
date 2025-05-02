import path from "path";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    svgr() // Add the svgr plugin to handle SVG files as React components
  ],

  resolve: {
    alias: {
      "@": path.resolve("./src"), // Updated for better readability
    },
  },
});
