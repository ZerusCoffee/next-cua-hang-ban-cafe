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
      alt: "Zerus Coffee Banner 1",
    },
    {
      id: 2,
      image: "/assets/images/slide_3_img.jpg",
      alt: "Zerus Coffee Banner 2",
    },
    {
      id: 3,
      image: "/assets/images/slide_4_img.jpg",
      alt: "Zerus Coffee Banner 3",
    },
    {
      id: 4,
      image: "/assets/images/slide_5_img.jpg",
      alt: "Zerus Coffee Banner 4",
    },
  ];

  return (
    <div className="w-full bg-stone-50 overflow-hidden">
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
              {/* Responsive height and better scaling */}
              <div className="relative w-full h-112.5 sm:h-137.5 md:h-162.5 lg:h-200 xl:h-225">
                <Image
                  src={banner.image}
                  alt={banner.alt}
                  fill
                  sizes="100vw"
                  className="object-cover object-center transition-transform duration-2000 hover:scale-105"
                  priority={banner.id === 1}
                  unoptimized
                />

                {/* Gradient Overlay to handle header contrast and "overlap" feel */}
                <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-transparent opacity-60 pointer-events-none"></div>

                {/* Subtle bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-stone-50/50 to-transparent pointer-events-none"></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
