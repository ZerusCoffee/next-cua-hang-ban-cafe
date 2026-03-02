import BannerCarousel from "./banner-slider";
import { Metadata } from "next";
import MarqueeText from "./marquee-text";

export const metadata: Metadata = {
  title: "Trang chủ | Zerus Coffee",
};

export default function HomePage() {
  return (
    <div>
      <BannerCarousel />
      <MarqueeText />
    </div>
  );
}
