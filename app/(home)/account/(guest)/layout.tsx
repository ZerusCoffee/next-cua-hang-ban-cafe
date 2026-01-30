import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  if (token) {
    redirect("/account"); 
  }

  return <>{children}</>;
}