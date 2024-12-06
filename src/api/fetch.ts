import axios from "axios";

export const baseURL = import.meta.env.VITE_API_URL;

export const httpClient = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

/**
 * HTTP 클라이언트의 전역 Authorization 헤더를 구성한다.
 *
 * @param token 사용자 토큰정보
 */
export const setDefaultsHeaderAuth = (token: string) => {
  httpClient.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const token = localStorage.getItem("accessToken");

if (token) {
  setDefaultsHeaderAuth(token);
}
