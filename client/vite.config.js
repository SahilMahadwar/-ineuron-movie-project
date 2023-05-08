import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import jsconfigPaths from "vite-jsconfig-paths";
import eslint from "vite-plugin-eslint";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  // https://vitejs.dev/config/
  return defineConfig({
    plugins: [react(), jsconfigPaths(), eslint()],
    envDir:
      process.env.NODE_ENV === "development"
        ? path.join(__dirname, "../")
        : path.join(__dirname, "./"),
  });
};
