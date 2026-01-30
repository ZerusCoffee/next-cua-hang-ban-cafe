import { getJWTfromCookie } from "@/lib/cookie"; // Gọi hàm để lấy tokeprn
import axios from "axios";

axios.interceptors.request.use(async (config) => {
  const token = await getJWTfromCookie(); // Gọi hàm để lấy token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axios;
