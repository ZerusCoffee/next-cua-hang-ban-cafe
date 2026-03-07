import Footer from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SWRProvider } from "@/components/provider/swr-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/layout/layout-wrapper";

export const metadata: Metadata = {
  title: "Zerus Coffee",
  description: "Order your favorite coffee online!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`antialiased`}>
        <SWRProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <LayoutWrapper>{children}</LayoutWrapper>
            <Footer />
          </div>
          <Toaster />
        </SWRProvider>
      </body>
    </html>
  );
}
