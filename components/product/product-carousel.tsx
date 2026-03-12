import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import ProductCard from "./product-card"
import { ProductCardType } from "@/types/product.type"


export default function ProductCarousel({ products, option }: { products: ProductCardType[], option?: number }) {
    return (
        <div className="relative px-10">
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
                            className={`pl-4 basis-1/2 md:basis-1/3 ${option ? `lg:basis-1/${option}` : 'lg:basis-1/5'}`}
                        >
                            <ProductCard
                                product={product}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious className="left-0 opacity-50 -translate-x-1/2 h-10 w-10 rounded-full bg-white border border-gray-200 shadow-md hover:opacity-100 cursor-pointer" />
                <CarouselNext className="right-0 opacity-50 translate-x-1/2 h-10 w-10 rounded-full bg-white border border-gray-200 shadow-md hover:opacity-100 cursor-pointer" />
            </Carousel>
        </div >
    )
}
