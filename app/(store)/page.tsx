import BannerCarousel from "./banner-slider";
import { Metadata } from "next";
import MarqueeText from "./marquee-text";
import Gallery from "./gallery";
import About from "./about";
import Feature from "./feature";
import { Suspense } from "react";
import ProductSliderSkeleton from "@/components/product/product-silder-skeleton";
import Newest from "./newest";

export const metadata: Metadata = {
  title: "Trang chủ | Zerus Coffee",
};

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <BannerCarousel />
      <MarqueeText />
      <About />
      <Suspense fallback={<ProductSliderSkeleton />}>
        <Feature />
      </Suspense>

      <Suspense>
        <Newest />
      </Suspense>

      <Gallery />
    </div>
  );
}
