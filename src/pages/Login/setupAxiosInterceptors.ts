import axios from "axios";
import { httpClient, setDefaultsHeaderAuth } from "@api/fetch";
import { authLocalStorage } from "@api/authLocalStorage";

export const setupAxiosInterceptors = (token?: string) => {
  if (token) {
    setDefaultsHeaderAuth(token);
  }

  httpClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // 401 에러이고 재시도하지 않은 요청인 경우에만 처리
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // 토큰 갱신 요청
          const response = await httpClient.post("/auth/refresh");
          const newAccessToken = response.data.accessToken;

          // 새 토큰 저장 및 헤더 설정
          authLocalStorage.set({ accessToken: newAccessToken });
          setDefaultsHeaderAuth(newAccessToken);

          // 원래 요청 재시도
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return axios(originalRequest);
        } catch (refreshError) {
          // 토큰 갱신 실패시 로그아웃 처리
          authLocalStorage.remove();

          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};
