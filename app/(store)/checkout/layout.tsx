import CheckoutGuard from "@/guards/checkout-guard";
import { PayPalProvider } from "@paypal/react-paypal-js/sdk-v6";
export default function CheckOutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PayPalProvider
      clientId="YOUR_CLIENT_ID"
      components={["paypal-payments"]}
      pageType="checkout"
    >
      <CheckoutGuard>{children}</CheckoutGuard>;
    </PayPalProvider>
  );
}
