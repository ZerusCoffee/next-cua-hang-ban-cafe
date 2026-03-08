import { Suspense } from "react";
import About from "./components/about";
import BannerCarousel from "./components/banner-slider";
import MarqueeText from "./components/marquee-text";
import ProductSliderSkeleton from "@/components/product/product-silder-skeleton";
import Feature from "./components/feature";
import Newest from "./components/newest";
import Gallery from "./components/gallery";
import { Metadata } from "next";


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

      <Suspense fallback={<ProductSliderSkeleton />}>
        <Newest />
      </Suspense>

      <Gallery />
    </div>
  );
}
