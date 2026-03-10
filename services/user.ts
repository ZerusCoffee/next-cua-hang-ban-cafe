import api from "@/config/axios";
import { User } from "@/types/user.type";
import {
  changePasswordSchema,
  updateProfileSchema,
} from "@/validation/user.schema";
import { AxiosError } from "axios";
import useSWR from "swr";
import z from "zod";

export function useUser() {
  const { data, error, isLoading, mutate } = useSWR(`/auth/profile`);
  return {
    mutate,
    user: data?.data as User,
    error,
    isLoading,
  };
}
export const changePassword = async (
  data: z.infer<typeof changePasswordSchema>,
) => {
  return api
    .put(`/auth/change-password`, data)
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
};

export const updateProfile = async (
  data: z.infer<typeof updateProfileSchema>,
) => {
  return api
    .put(`/auth/profile`, data)
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
};

export const updateAvatar = async (data: FormData) => {
  return api
    .put(`/auth/avatar`, data)
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
};