import BannerCarousel from "./banner-slider";
import { Metadata } from "next";
import MarqueeText from "./marquee-text";
import Gallery from "./gallery";
import About from "./about";

export const metadata: Metadata = {
  title: "Trang chủ | Zerus Coffee",
};

export default function HomePage() {
  return (
    <div>
      <BannerCarousel />
      <MarqueeText />
      <About />
      <Gallery />
    </div>
  );
}
