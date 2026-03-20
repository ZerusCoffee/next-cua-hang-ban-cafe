import Footer from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import LayoutWrapper from "@/components/layout/layout-wrapper";
import { SWRProvider } from "@/components/provider/swr-provider";
import BusinessSchema from "@/components/schema/business-schema";
import { Toaster } from "@/components/ui/sonner";
import { baseUrl } from "@/constants/const";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Tiệm Cafe Zerus",
    default: "Cà phê, Trà, Trà Sữa 24/7 Giao Nhanh | Tiệm Cafe Zerus",
  },

  description:
    "Dù là nắng sớm hay đêm muộn, Zerus luôn đồng hành cùng bạn bằng những ly cà phê thơm nồng và trà sữa ngọt ngào. Đặt ngay để Zerus ship tận tay món nước yêu thích của bạn chỉ trong tích tắc!",
  keywords: ["Cà phê", "Trà đậm vị", "Matcha", "Nước Uống", "Đặt Nước Online"],
  openGraph: {
    title: "Cà phê, Trà, Trà Sữa 24/7 Giao Nhanh | Tiệm Cafe Zerus",
    description:
      "Dù là nắng sớm hay đêm muộn, Zerus luôn đồng hành cùng bạn bằng những ly cà phê thơm nồng và trà sữa ngọt ngào. Đặt ngay để Zerus ship tận tay món nước yêu thích của bạn chỉ trong tích tắc!",
    url: `${baseUrl}`,
    siteName: "Tiệm Cà Phê Zerus",
    images: {
      url: "/logo_og.png",
      width: 1200,
      height: 630,
      alt: "Cà Phê Zerus",
    },
    locale: "vi-VN",
    phoneNumbers: "0938441235",
    emails: "zeruscoffee@gmail.com",
    type: "website",
    countryName: "Việt Nam",
  },
  alternates: {
    canonical: `${baseUrl}`,
  },
  metadataBase: new URL(`${baseUrl}`),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <BusinessSchema />
      </head>
      <body className={`antialiased`}>
        <SWRProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <LayoutWrapper>
              {children}
              <Analytics />
            </LayoutWrapper>
            <Footer />
          </div>
          <Toaster position="bottom-right" closeButton />
        </SWRProvider>
      </body>
    </html>
  );
}
