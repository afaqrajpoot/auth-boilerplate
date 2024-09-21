import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const basenameProd = "/react-auth-boilerplate";

export default defineConfig(({ command }) => {
  const isProd = command === "build";

  return {
    base: isProd ? basenameProd : "",
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      global: {
        basename: isProd ? basenameProd : "",
      },
    },
  };
});
