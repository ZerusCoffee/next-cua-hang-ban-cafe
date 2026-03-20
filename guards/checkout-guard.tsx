"use client";

import { useCart } from "@/hooks/use-cart";
import { notFound } from "next/navigation";

export default function CheckoutGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { cart } = useCart();

  if (!cart?.items?.length) {
    return null;
  }

  return <>{children}</>;
}
