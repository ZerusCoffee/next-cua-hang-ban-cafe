import axios from "@/config/axios";
import { User } from "@/types/user.type";
import {
  changePasswordSchema,
  updateProfileSchema,
} from "@/validation/userSchema";
import { AxiosError } from "axios";
import useSWR from "swr";
import z from "zod";

export function useUser() {
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
  );
  return {
    mutate,
    user: data?.data as User,
    error,
    isLoading,
  };
}
export const changePassword = (data: z.infer<typeof changePasswordSchema>) => {
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/change-password`, data)
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
};

export const updateProfile = (data: z.infer<typeof updateProfileSchema>) => {
  return axios
    .put(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, data)
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
};
