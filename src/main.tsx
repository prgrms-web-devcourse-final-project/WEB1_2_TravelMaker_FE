import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import router from "./routes";
import { CustomThemeProvider } from "@common/styles/ThemeProvider.tsx";
import { store } from "@common/redux/store.ts";
import { UserProvider } from "@pages/My/contexts/UserContext.tsx";
import { setDefaultsHeaderAuth } from "@api/fetch.ts";
import { setupAxiosInterceptors } from "@pages/Login/setupAxiosInterceptors.ts";

// 로컬 스토리지에서 토큰 가져오기
const token = localStorage.getItem("accessToken");

if (token) {
  setDefaultsHeaderAuth(token); // Axios 기본 헤더에 토큰 추가
}
// Axios Interceptors 초기화
setupAxiosInterceptors();

const enableMocking = async () => {
  if (process.env.NODE_ENV !== "development" || import.meta.env.VITE_MSW_ENABLED !== "true") {
    return;
  }

  const { worker } = await import("./api/mocks/browser.ts");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
};

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <CustomThemeProvider>
      <ReduxProvider store={store}>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </ReduxProvider>
    </CustomThemeProvider>
  );
});
