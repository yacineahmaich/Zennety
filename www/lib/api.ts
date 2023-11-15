import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
  },
  withCredentials: true,
});

export const csrf = () =>
  api.get("/sanctum/csrf-cookie", {
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
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
