"use client";
import CheckoutGuard from "@/guards/checkout-guard";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function CheckOutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        currency: "USD",
        intent: "capture",
        components: "buttons,messages",
        "enable-funding": "paylater",
      }}
    >
      <CheckoutGuard>{children}</CheckoutGuard>
    </PayPalScriptProvider>
  );
}
