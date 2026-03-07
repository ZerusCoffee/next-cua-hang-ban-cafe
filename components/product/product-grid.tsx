import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import ProductCard from "./product-card"

export default function ProductGrid() {
    return (
        <div className="w-full py-2 my-4">
            {/* Tiêu đề */}
            <div className="px-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    Sản phẩm nổi bật
                </h2>
            </div>

            {/* Carousel với buttons ở 2 bên */}
            <div className="relative px-10">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <CarouselItem
                                key={index}
                                className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5"
                            >
                                <ProductCard />
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <CarouselPrevious className="left-0 -translate-x-1/2 h-10 w-10 rounded-full bg-white border border-gray-200 shadow-md hover:bg-green-600 hover:text-white" />
                    <CarouselNext className="right-0 translate-x-1/2 h-10 w-10 rounded-full bg-white border border-gray-200 shadow-md hover:bg-green-600 hover:text-white" />
                </Carousel>
            </div>
        </div>
    )
}