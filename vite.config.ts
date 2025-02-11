import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  build: {
    outDir: "build",
    cssCodeSplit: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        panel: "src/panel.ts",
        "side-panel": "src/side-panel.ts",
        devtools: "src/devtools.ts",
        options: "src/options.ts",
        popup: "src/popup.ts",
        background: "src/background.ts",
        inject: "src/inject.ts",
      },
      output: {
        format: "es",
        entryFileNames: "[name].js",
        assetFileNames(assetInfo) {
          if ((assetInfo.names[0] as any).endsWith(".css")) {
            return "[name].css"; // 自定义 CSS 输出路径
          }
          return "assets/[name].[hash].[ext]";
        },
      },
    },
  },
  resolve: {
    alias: {
      "@panel": "/src/panel",
      "@option": "/src/option",
      "@popup": "/src/popup",
      "@": "/src",
    },
  },
});
