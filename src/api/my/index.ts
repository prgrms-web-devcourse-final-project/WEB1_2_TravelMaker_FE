import axios from "axios";

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: "/api", // 기본 URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
