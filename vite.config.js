import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import eslint from "vite-plugin-eslint";
import preactPlugin from "@preact/preset-vite";

export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [preactPlugin(), svgr(), eslint()],
});
