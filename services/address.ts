import api from "@/config/axios";
import { Address } from "@/types/address.type";
import { addressSchema } from "@/validation/address.schema";
import { AxiosError } from "axios";
import useSWR, { mutate } from "swr";
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
  const { data, error, isLoading, mutate } =
    useSWR<ProvinceResponse>(`/address/provinces`);
  return { provinces: data?.data as Province[], error, isLoading, mutate };
}

export function useWards(province_code: string | null | undefined) {
  const { data, error, isLoading, mutate } = useSWR<WardResponse>(
    province_code ? `/address/wards/${province_code}` : null,
  );
  return { wards: data?.data as Ward[], error, isLoading, mutate };
}

export function useAddress() {
  const { data, error, isLoading, mutate } = useSWR(
    'address',
    () => api.get('/address').then(res => res.data)
  );

  return {
    addresses: data?.data as Address[],
    error,
    isLoading,
    mutate
  };
}

export function useDefaultAddress() {
  const { data, error, isLoading, mutate } = useSWR(
    '/address/default',
    (url) => api.get(url).then(res => res.data)
  );

  return { address: data?.data as Address, error, isLoading, mutate };
}

export async function createAddress(data: z.infer<typeof addressSchema>) {
  return api
    .post(`/address`, data)
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
}

export async function getAddressById(id: string) {
  return api
    .post(`/address/${id}`)
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
}

export async function updateAddress(
  data: z.infer<typeof addressSchema>,
  id: number,
) {
  return api
    .put(`/address/${id}`, data)
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
}

export async function deleteAddress(id: number) {
  return api
    .delete(`/address/${id}`)
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
}

// chac deo can
export async function setDefaultAddressById(id: string) {
  return api
    .patch(`/address/${id}/set-default`)
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
}

export function useDeleteAddress() {

  const deleteAddressById = async (id: number) => {
    await deleteAddress(id);

    await Promise.all([
      mutate('/address'),
      mutate('/address/default')
    ]);
  };

  return { deleteAddressById };
}