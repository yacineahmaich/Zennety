import axios, { AxiosError } from "axios";
import app from "./app";

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
  },
  // withCredentials: true,
});

api.interceptors.request.use((request) => {
  const token = localStorage.getItem(app.tokenName);
  if (token) request.headers.Authorization = `Bearer ${token}`;

  return request;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      return Promise.reject(error.response.data);
    }

    if (error.request) {
      return Promise.reject(error.request);
    }

    return Promise.reject("Something went wrong! Please try again");
  }
);
