import api from "@/config/axios";
import {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "@/validation/auth.schema";
import { AxiosError } from "axios";
import { z } from "zod";

export const login = async (data: z.infer<typeof loginSchema>) => {
  return api
    .post(`/auth/login`, data)
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
};

export const register = async (data: z.infer<typeof registerSchema>) => {
  return api
    .post(`/auth/register`, data)
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
};

export const loginGoogle = async (code: string) => {
  return api
    .post(`/auth/google`, { code })
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
};
export const sendEmailForgotPassword = async (email: string) => {
  return api
    .post(`/auth/send-mail-forgot-password`, {
      email,
    })
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
};

export const resetPassword = async (
  data: z.infer<typeof resetPasswordSchema> & { email: string; token: string },
) => {
  return api
    .post(`/auth/reset-password`, data)
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
};

export const logout = async () => {
  return api
    .post("/auth/logout")
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
};
