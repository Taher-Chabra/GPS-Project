import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_GPS_BASE_URL;

export const gpsApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
  },
  timeout: 10000,
});

gpsApi.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);
