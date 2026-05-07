export interface PayPalCreateOrderResponse {
  status: "success" | "error";
  message?: string;
  data?: {
    order_id: string; // PayPal Order ID cho popup
    total: number; // tổng tiền VND
  };
}

export interface PayPalCaptureResponse {
  status: "success" | "error";
  message?: string;
  details?: {
    id: string;
    status: string;
    order_number?: string; // thêm nếu backend trả về
    payer: {
      name: {
        given_name: string;
        surname: string;
      };
      email_address: string;
    };
    purchase_units: Array<{
      payments: {
        captures: Array<{
          id: string;
          status: string;
          amount: {
            currency_code: string;
            value: string;
          };
        }>;
      };
    }>;
    [key: string]: unknown;
  };
}

// ── Detail dùng chung cho callback onSuccess ─────────────────────
export interface PayPalCaptureDetails {
  id: string;
  status: string;
  order_number?: string;
  payer?: {
    name?: {
      given_name?: string;
      surname?: string;
    };
    email_address?: string;
  };
  [key: string]: unknown;
}
