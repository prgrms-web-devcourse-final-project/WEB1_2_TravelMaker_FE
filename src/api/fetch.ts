import axios from "axios";

const isDevelopment = import.meta.env.MODE === "development";

export const baseURL = import.meta.env.VITE_API_URL;

export const httpClient = axios.create({
  baseURL: isDevelopment ? undefined : baseURL,
  withCredentials: true,
});
