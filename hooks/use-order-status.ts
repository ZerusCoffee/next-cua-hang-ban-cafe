import { getJWTfromCookie } from "@/lib/cookie";
import { useUser } from "@/services/user";
import Pusher from "pusher-js";
import { useEffect } from "react";

interface OrderStatusData {
  order_id: number;
  order_number: string;
  status: string;
}

export function useOrderStatus(
  onStatusChange: (data: OrderStatusData) => void,
) {
  const { user } = useUser();

  useEffect(() => {
    if (!user?.id) return;

    Pusher.logToConsole = true;

    let pusher: Pusher;

    const init = async () => {
      const token = await getJWTfromCookie();
      if (!token) return;

      pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
        authEndpoint: `${process.env.NEXT_PUBLIC_API_URL}/broadcasting/auth`,
        auth: {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      });

      const channel = pusher.subscribe(`private-orders.${user.id}`);
      channel.bind("App\\Events\\OrderStatusUpdated", onStatusChange);
    };

    init();

    return () => pusher?.disconnect();
  }, [user?.id]);
}
