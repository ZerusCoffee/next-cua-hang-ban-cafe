"use client";

import { useCart } from "@/hooks/use-cart";

export default function CheckoutGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { cart, isLoading } = useCart();

  if (isLoading) return null;
  if (!cart?.items?.length) {
    return null;
  }

  return <>{children}</>;
}
