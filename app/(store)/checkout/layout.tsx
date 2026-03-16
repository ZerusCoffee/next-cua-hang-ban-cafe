import CheckoutGuard from "@/guards/checkout-guard";

export default function CheckOutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CheckoutGuard>{children}</CheckoutGuard>;
}
