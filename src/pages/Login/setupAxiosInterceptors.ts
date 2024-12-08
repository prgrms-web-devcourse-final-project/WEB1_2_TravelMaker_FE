import axios from "axios";
import { httpClient } from "@api/fetch";

export const setupAxiosInterceptors = (token?: string) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    // `httpClient` Axios 인스턴스의 Authorization 헤더 설정
    httpClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  axios.interceptors.response.use(
    (response) => {
      // 성공 응답은 그대로 반환
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      // 서버가 토큰 만료 에러를 반환할 경우 처리
      if (
        error.response?.status === 401 && // 401 Unauthorized 상태코드
        error.response?.data?.accessToken // 새로운 토큰이 응답에 포함된 경우
      ) {
        const newAccessToken = error.response.data.accessToken;

        // 새로운 액세스 토큰을 로컬 스토리지에 저장
        localStorage.setItem("accessToken", newAccessToken);

        // Axios 헤더에 새로운 토큰 설정
        axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // 원래 요청 재시도
        return axios(originalRequest);
      }

      // 다른 에러는 그대로 반환
      return Promise.reject(error);
    }
  );
};
