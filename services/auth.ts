import {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "@/validation/authSchema";
import axios, { AxiosError } from "axios";
import { z } from "zod";

export const login = (data: z.infer<typeof loginSchema>) => {
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, data)
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
};

export const register = (data: z.infer<typeof registerSchema>) => {
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, data)
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
};

export const loginGoogle = (code: string) => {
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, { code })
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
};

export const sendEmailForgotPassword = (email: string) => {
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/send-mail-forgot-password`, {
      email,
    })
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
};

export const resetPassword = (
  data: z.infer<typeof resetPasswordSchema> & { email: string; token: string },
) => {
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, data)
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
};
