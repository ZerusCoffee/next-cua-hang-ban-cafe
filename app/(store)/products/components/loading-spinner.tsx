import { Coffee } from 'lucide-react'
import ProductGridSkeleton from './product-grid-skeleton'

export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            {/* Spinner */}
            <div className="relative">
                <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Coffee className="w-5 h-5 text-amber-400 animate-pulse" />
                </div>
            </div>

            {/* Loading text */}
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-amber-600">
                    Đang tải thêm sản phẩm
                </span>
                <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce" />
                </div>
            </div>

            {/* Skeleton preview */}
            <div className="w-full mt-4">
                <ProductGridSkeleton count={4} />
            </div>
        </div>
    )
}
