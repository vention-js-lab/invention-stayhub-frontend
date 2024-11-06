import process from "node:process";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { checker } from "vite-plugin-checker";

export default defineConfig(({ mode }) => {
  const envPrefix = ["VITE", "APP_PORT"];
  const viteLoadedEnv = loadEnv(mode, __dirname, envPrefix);
  process.env = Object.assign(process.env, viteLoadedEnv);

  const devPort = parseInt(process.env.APP_PORT || "3000", 10);

  return {
    build: {
      emptyOutDir: true,
    },
    optimizeDeps: {
      exclude: ["node_modules/.cache"],
    },
    envPrefix: envPrefix,
    plugins: [
      react(),
      tsconfigPaths({
        projects: ["./tsconfig.json", "./tsconfig.app.json"],
      }),
      checker({
        enableBuild: true,
        typescript: true,
        eslint: false,
        root: process.cwd(),
        overlay: {
          initialIsOpen: false,
          position: "br",
        },
      }),
    ],
    server: {
      port: devPort,
      strictPort: true,
    },
  };
});
