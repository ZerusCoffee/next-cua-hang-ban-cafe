import { setJWTtoCookie } from "@/lib/cookie";
import { loginGoogle } from "@/services/auth";
import { useUser } from "@/services/user";
import { useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";

export const ButtonLoginGoogle = () => {
  const { mutate } = useUser();
  const route = useRouter();
  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const response = await loginGoogle(code);
      if (response.status == "success" && response?.data?.access_token) {
        await setJWTtoCookie(response.data.access_token);
        toast.success("Đăng nhập thành công");
        mutate();
        route.push("/");
      } else {
        toast.error(response.message);
      }
    },
    flow: "auth-code",
    ux_mode: "popup",
  });
  return (
    <Button
      variant="outline"
      type="button"
      className="cursor-pointer"
      onClick={googleLogin}
    >
      <Image
        src="/assets/svg/google-icon.svg"
        alt="Google Logo"
        width={24}
        height={24}
      />
      <span>Đăng nhập với Google</span>
    </Button>
  );
};
