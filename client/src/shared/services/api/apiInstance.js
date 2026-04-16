import axios from "axios";
import { refreshToken } from "@/features/index"
import { ENDPOINTS } from './apiEndpoint'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});


let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error)
    } else {
      promise.resolve();
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (err) => {

    const originalRequest = err.config;
    const isLoginAndRefreshRoute = originalRequest?.url.includes(ENDPOINTS.AUTH.LOGIN) || originalRequest?.url.includes(ENDPOINTS.AUTH.REFRESH);

    if (err.response?.status === 401 && !originalRequest._retry && !isLoginAndRefreshRoute) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => resolve(api(originalRequest)),
            reject
          });
        });
      }

      isRefreshing = true;

      try {

        await refreshToken()
        processQueue(null)
        return api(originalRequest);

      } catch (refreshErr) {

        processQueue(refreshErr);
        window.location.href = "/auth/login";
        return Promise.reject(refreshErr);

      } finally {
        isRefreshing = false;
      };

    };
    return Promise.reject(err);
  }
);