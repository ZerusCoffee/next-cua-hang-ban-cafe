// components/product/product-slider-skeleton.tsx
'use client'

import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductSliderSkeletonProps {
    title?: string;
    subtitle?: string;
    showViewAll?: boolean;
}

export default function ProductSliderSkeleton({
    title = "Sản phẩm nổi bật",
    subtitle = "BEST SELLER",
    showViewAll = true
}: ProductSliderSkeletonProps) {
    return (
        <div className='my-4'>
            <div className="w-full py-5">
                {/* Tiêu đề skeleton */}
                <div className="px-6 mb-10">
                    <div className="flex items-center gap-4">
                        <Skeleton className="flex-1 h-1" />
                        <div className="text-center space-y-2">
                            <Skeleton className="h-6 w-24 mx-auto" />
                            <Skeleton className="h-10 w-64 mx-auto" />
                        </div>
                        <Skeleton className="flex-1 h-1" />
                    </div>
                </div>

                {/* Carousel skeleton */}
                <div className="relative px-10">
                    <Carousel
                        opts={{
                            align: "start",
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4 my-1">
                            {Array.from({ length: 8 }).map((_, index) => (
                                <CarouselItem
                                    key={index}
                                    className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4"
                                >
                                    <div className="space-y-3">
                                        {/* Image skeleton */}
                                        <Skeleton className="w-full h-48 rounded-lg" />
                                        {/* Rating skeleton */}
                                        <div className="flex gap-1">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Skeleton key={i} className="w-3 h-3 rounded-full" />
                                            ))}
                                        </div>
                                        {/* Title skeleton */}
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                        {/* Price skeleton */}
                                        <div className="flex justify-between items-center">
                                            <Skeleton className="h-6 w-20" />
                                            <Skeleton className="h-8 w-8 rounded-full" />
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        <CarouselPrevious className="left-0 opacity-50 -translate-x-1/2 h-10 w-10" />
                        <CarouselNext className="right-0 opacity-50 translate-x-1/2 h-10 w-10" />
                    </Carousel>
                </div>

                {/* View all link skeleton */}
                {showViewAll && (
                    <div className="flex justify-center mt-8">
                        <Skeleton className="h-6 w-40" />
                    </div>
                )}
            </div>
        </div>
    )
}