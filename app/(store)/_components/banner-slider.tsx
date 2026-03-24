"use client"

import * as React from "react"
import Image from "next/image"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

export default function BannerCarousel() {
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: false })
    )

    const banners = [
        {
            id: 1,
            image: "/assets/images/slide_1_img.jpg",
            alt: "Slider 1",
            width: 1920,
            height: 600
        },
        {
            id: 2,
            image: "/assets/images/slide_2_img.jpg",
            alt: "Slider 2",
            width: 1920,
            height: 600
        }
    ]

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
    )
}