"use client";

import axios from "@/config/axios";
import { ReactNode } from "react";
import { SWRConfig } from "swr";

interface SWRProviderProps {
  children: ReactNode;
}

export const SWRProvider = ({ children }: SWRProviderProps) => {
  return (
    <SWRConfig
      value={{
        fetcher: (url) => axios.get(url).then((res) => res.data),
        revalidateOnFocus: false, // không refetch khi đổi tab/quay lại tab
        revalidateOnReconnect: false, // không refetch khi mạng reconnect
        refreshInterval: 0, // không tự động refetch
        errorRetryCount: 0, // không tự động refetch khi fetch lỗi
      }}
    >
      {children}
    </SWRConfig>
  );
};
