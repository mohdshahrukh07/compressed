import axios from "axios";
import { refreshAccessToken } from "./auth";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true,
});

// 🔹 Add Access Token automatically to every request
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 🔹 Handle 401 errors and try refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const newUser = await refreshAccessToken();
      if (newUser) {
        // Retry failed request
        error.config.headers.Authorization = `Bearer ${sessionStorage.getItem("access_token")}`;
        return api.request(error.config);
      } else {
        // Refresh failed → redirect to login
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
