import axios from "@/config/axios";
import { Address } from "@/types/address.type";
import { addressSchema } from "@/validation/addressSchema";
import { AxiosError } from "axios";
import useSWR from "swr";
import z from "zod";

interface Ward {
  name: string;
  code: string;
  division_type: string;
  codename: string;
  province_code: string;
  district_code: string;
}
interface Province {
  name: string;
  code: string;
  division_type: string;
  codename: string;
  phone_code: string;
  wards: Ward[];
}

interface ProvinceResponse {
  message: string;
  data: Province[];
}

interface WardResponse {
  message: string;
  data: Ward[];
}

export function useProvinces() {
  const { data, error, isLoading, mutate } = useSWR<ProvinceResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/address/provinces`,
  );
  return { provinces: data?.data as Province[], error, isLoading, mutate };
}

export function useWards(province_code: string | null | undefined) {
  const { data, error, isLoading, mutate } = useSWR<WardResponse>(
    province_code
      ? `${process.env.NEXT_PUBLIC_API_URL}/address/wards/${province_code}`
      : null,
  );
  return { wards: data?.data as Ward[], error, isLoading, mutate };
}

export function useAddress() {
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/address`,
  );
  return { addresses: data?.data as Address[], error, isLoading, mutate };
}

export function useDefaultAddress() {
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/address/default`,
  );
  return { address: data?.data as Address, error, isLoading, mutate };
}

export function createAddress(data: z.infer<typeof addressSchema>) {
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/address`, data)
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
}

export function getAddressById(id: string) {
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/address/${id}`)
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
}

export function updateAddress(data: z.infer<typeof addressSchema>, id: number) {
  return axios
    .put(`${process.env.NEXT_PUBLIC_API_URL}/address/${id}`, data)
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
}

export function deleteAddress(id: number) {
  return axios
    .delete(`${process.env.NEXT_PUBLIC_API_URL}/address/${id}`)
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
}

// chac deo can
export function setDefaultAddressById(id: string) {
  return axios
    .patch(`${process.env.NEXT_PUBLIC_API_URL}/address/${id}/set-default`)
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
}
