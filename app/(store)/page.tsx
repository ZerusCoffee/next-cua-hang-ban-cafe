import { Suspense } from "react";
import About from "./_components/about";
import BannerCarousel from "./_components/banner-slider";
import MarqueeText from "./_components/marquee-text";
import ProductSliderSkeleton from "@/components/product/product-silder-skeleton";
import Feature from "./_components/feature";
import Newest from "./_components/newest";
import Gallery from "./_components/gallery";
import { categoryService } from "@/services/category-service";


export default async function HomePage() {

  const { data: categories } = await categoryService.getAllCategory();

  return (
    <div className="overflow-hidden">
      <BannerCarousel />
      <MarqueeText />
      <About
        categories={categories || []}
      />
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
