import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import { libInjectCss } from "vite-plugin-lib-inject-css";

export default defineConfig({
  plugins: [react(), libInjectCss()],
  root: "src",
  test: {
    environment: "happy-dom",
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "./src/index.ts"),
      name: "photo-metadata-extractor",
      fileName: (format) => `photo-metadata-extractor.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
