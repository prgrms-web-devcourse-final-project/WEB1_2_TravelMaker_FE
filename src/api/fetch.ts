import axios from "axios";

const isDevelopment = import.meta.env.MODE === "development";

export const baseURL = import.meta.env.VITE_API_URL;

export const httpClient = axios.create({
  baseURL: isDevelopment ? undefined : baseURL,
});

export const token = localStorage.getItem("accessToken");
if (token) {
  httpClient.defaults.headers.common.Authorization = `Bearer ${token}`;
}
