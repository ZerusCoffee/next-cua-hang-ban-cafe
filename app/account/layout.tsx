import { AccountHeader } from "@/components/account/account-header";
import { AccountSidebar } from "@/components/account/account-sidebar";
import { FloatingOffer } from "@/components/account/floating-offer";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white relative">
      <AccountHeader />
      <div className="container mx-auto px-4 py-8 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <AccountSidebar />
          <div className="lg:col-span-3">{children}</div>
        </div>
      </div>
      <FloatingOffer />
    </div>
  );
}
