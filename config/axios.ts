import { getJWTfromCookie, removeJWTfromCookie } from "@/lib/cookie";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const token = await getJWTfromCookie(); // Gọi hàm để lấy token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error);
    if (error.response.status === "403") {
      await removeJWTfromCookie();
    }
    return Promise.reject(error);
  },
);

export default api;
