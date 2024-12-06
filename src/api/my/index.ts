import axios from "axios";
import { setupAxiosInterceptors } from "@pages/Login/setupAxiosInterceptors";

const token = localStorage.getItem("accessToken") || undefined;

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: "/api", // 기본 URL
  headers: {
    "Content-Type": "application/json",
  },
});

setupAxiosInterceptors(token);

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiClient;
