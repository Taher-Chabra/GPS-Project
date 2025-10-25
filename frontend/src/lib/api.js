import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, image/svg+xml",
  },
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
   console.log(API_BASE_URL)
    return Promise.reject(error);
  }
);
