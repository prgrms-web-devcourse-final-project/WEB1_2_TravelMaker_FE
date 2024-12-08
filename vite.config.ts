import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tsconfigPaths()], // React 플러그인 활성화
    define: {
      __VITE_GOOGLE_KEY__: JSON.stringify(env.VITE_GOOGLE_KEY),
      __VITE_API_URL__: JSON.stringify(env.VITE_API_URL),
      __VITE_MSW_ENABLED__: JSON.stringify(env.VITE_MSW_ENABLED),
      __VITE_API_WS__: JSON.stringify(env.VITE_API_WS),
      __VITE_APP_URL__: JSON.stringify(env.VITE_APP_URL),
    },
    assetsInclude: ["./src/assets/fonts/Ticketing-Regular.otf"],
    server: {
      proxy: {
        "/room": {
          target: env.VITE_API_WS,
          changeOrigin: true,
          ws: true,
        },
      },
    },
  };
});
