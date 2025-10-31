import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const formsApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, image/svg+xml",
  },
  timeout: 10000,
});

formsApi.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);
