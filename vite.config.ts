import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/powerlifting-calculator/", // Set the base path for GitHub Pages
});
