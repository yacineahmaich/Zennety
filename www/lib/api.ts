import _axios from "axios";

export const api = _axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
  },
  withCredentials: true,
});

export const csrf = () => api.get("/sanctum/csrf-cookie");
