import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import babel from "@rollup/plugin-babel";

const path = require("path");

export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "Utsubo-events",
      fileName: (format) => `utsubo-events.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled into your library
      external: ["react"],
      plugins: [babel({ babelHelpers: "bundled" })],
    },
  },
});