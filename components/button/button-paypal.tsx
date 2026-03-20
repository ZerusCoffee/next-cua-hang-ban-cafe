import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

export function PayPalPaymentButtons() {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        currency: "USD",
        intent: "capture",
        components: "buttons",
        enableFunding: "card", // bật Credit/Debit Cards
        disableFunding: "paylater,venmo",
      }}
    >
      <div className="mt-3 space-y-2">
        {/* Nút PayPal account + Credit Card */}
        <PayPalButtons
          style={{
            layout: "vertical",
            shape: "rect",
            label: "paypal",
            height: 40,
          }}
          fundingSource={undefined} // undefined = hiện tất cả (PayPal + Card)
          createOrder={async () => {
            console.log("Da hoan thanh don hang");
            return "Da hoan thanh don hang";
          }}
          onApprove={async (data) => {
            const res = await fetch("/api/paypal/capture", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderId: data.orderID }),
            });
            const result = await res.json();
            if (result.success) {
              // redirect hoặc show success
              alert("Thanh toán thành công!");
            }
          }}
          onError={(err) => {
            console.error("PayPal error:", err);
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
}
