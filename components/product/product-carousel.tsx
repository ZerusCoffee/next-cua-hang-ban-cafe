import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import ProductCard from "./product-card"
import { ProductCardType } from "@/types/product.type"


export default function ProductCarousel({ products }: { products: ProductCardType[] }) {
    return (
        <div className="relative px-2 lg:px-10">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-4 my-1">
                    {products.map((product) => (
                        <CarouselItem
                            key={product.id + `_${product.sku}`}
                            className={`pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5`}                        >
                            <ProductCard
                                product={product}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious className="hidden md:flex left-0 opacity-50 -translate-x-1/2 h-10 w-10 rounded-full bg-white border border-gray-200 shadow-md hover:opacity-100 cursor-pointer" />
                <CarouselNext className="hidden md:flex right-0 opacity-50 translate-x-1/2 h-10 w-10 rounded-full bg-white border border-gray-200 shadow-md hover:opacity-100 cursor-pointer" />
            </Carousel>
        </div >
    )
}
