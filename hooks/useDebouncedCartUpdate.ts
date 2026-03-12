// hooks/useDebouncedCartUpdate.ts
"use client";

import { updateItemQuantity } from "@/services/cart";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "react-haiku";
import { toast } from "sonner";

interface UseDebouncedCartUpdateProps {
  itemKey: string;
  initialQuantity: number;
  onSuccess?: () => void;
}

export const useDebouncedCartUpdate = ({
  itemKey,
  initialQuantity,
  onSuccess,
}: UseDebouncedCartUpdateProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isUpdating, setIsUpdating] = useState(false);

  // Dùng ref để track trạng thái update
  const isUpdatingRef = useRef(false);

  const debouncedQuantity = useDebounce(quantity, 500);

  // Wrap onSuccess với useCallback để tránh thay đổi không cần thiết
  const stableOnSuccess = useCallback(() => {
    onSuccess?.();
  }, [onSuccess]);

  useEffect(() => {
    // Nếu đang update thì không làm gì
    if (isUpdatingRef.current) return;

    // Nếu quantity giống initial thì không làm gì
    if (debouncedQuantity === initialQuantity) return;

    const updateCart = async () => {
      isUpdatingRef.current = true;
      setIsUpdating(true);

      try {
        await updateItemQuantity(itemKey, debouncedQuantity);
        stableOnSuccess();
      } catch (error) {
        toast.error(`Cập nhật thất bại: ${error}`);
        // Rollback về giá trị cũ
        setQuantity(initialQuantity);
      } finally {
        isUpdatingRef.current = false;
        setIsUpdating(false);
      }
    };

    updateCart();
  }, [debouncedQuantity, initialQuantity, itemKey, stableOnSuccess]); // Thêm đầy đủ dependencies

  // Reset state khi initialQuantity thay đổi
  useEffect(() => {
    setQuantity(initialQuantity);
    isUpdatingRef.current = false;
    setIsUpdating(false);
  }, [initialQuantity]);

  const increment = useCallback(() => {
    setQuantity((prev) => prev + 1);
  }, []);

  const decrement = useCallback(() => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  const updateDirect = useCallback((newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  }, []);

  return {
    quantity,
    isUpdating,
    increment,
    decrement,
    updateDirect,
  };
};
