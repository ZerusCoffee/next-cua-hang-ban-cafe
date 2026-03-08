import ProductCarousel from "@/components/product/product-carousel"
import { productService } from "@/services/product-service";
import Link from "next/link"



export default async function Feature() {
    const res = await productService.getFeatured();

    if (!res.data) {
        return null;
    }

    return (
        <div className='sm:my-10 md:my-15'>
            <div className="w-full py-5">
                {/* Tiêu đề */}
                <div className="px-6 mb-10">
                    <div className="flex items-center gap-4">
                        <div className="flex-1 h-1 bg-linear-to-r from-transparent to-orange-200"></div>
                        <div className="text-center">
                            <span className="text-lg text-orange-400 font-medium">BEST SELLER</span>
                            <h2 className="text-2xl md:text-4xl font-serif font-bold text-amber-800 mt-1">
                                Sản phẩm nổi bật
                            </h2>
                        </div>
                        <div className="flex-1 h-1 bg-linear-to-l from-transparent to-orange-200"></div>
                    </div>
                </div>

                {/* Carousel */}
                <ProductCarousel
                    products={res.data ?? []}
                />

                <Link
                    href={'/products'}
                    className="flex items-center justify-center gap-2 text-amber-600 hover:text-amber-800 hover:font-bold font-medium transition-colors duration-300 mt-8 group"
                >
                    <span>Xem tất cả sản phẩm</span>
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>
        </div>
    )
}
