import { getJWTfromCookie, removeJWTfromCookie } from "@/lib/cookie";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const token = await getJWTfromCookie();
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
    // Nếu API trả về 401 (Unauthorized) hoặc 403 (Forbidden)
    // Nghĩa là token hết hạn hoặc người dùng không tồn tại
    if (error.response?.status === 401 || error.response?.status === 403) {
      await removeJWTfromCookie();

      // Kiểm tra nếu đang ở trình duyệt thì mới redirect
      if (typeof window !== "undefined") {
        // Xóa sạch cache SWR nếu cần (tùy chọn)
        // window.location.reload() hoặc chuyển hướng thẳng về login
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
