"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import * as React from "react";

export default function BannerCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  );

  const banners = [
    {
      id: 1,
      image: "/assets/images/slide_1_img.jpg",
      alt: "Slider 1",
      width: 1920,
      height: 600,
    },
    {
      id: 2,
      image: "/assets/images/slide_3_img.jpg",
      alt: "Slider 2",
      width: 1920,
      height: 600,
    },
    {
      id: 3,
      image: "/assets/images/slide_4_img.jpg",
      alt: "Slider 3",
      width: 1920,
      height: 600,
    },
    {
      id: 4,
      image: "/assets/images/slide_5_img.jpg",
      alt: "Slider 4",
      width: 1920,
      height: 600,
    },
  ];

  return (
    <div className="w-full bg-white">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id} className="basis-full p-0">
              <div className="relative w-full h-85 md:h-200">
                <Image
                  src={banner.image}
                  alt={banner.alt}
                  fill
                  className="object-cover"
                  priority={banner.id === 1}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
