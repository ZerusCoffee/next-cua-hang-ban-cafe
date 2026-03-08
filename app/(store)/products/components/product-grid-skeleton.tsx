// components/product/product-grid-skeleton.tsx
interface ProductGridSkeletonProps {
    count?: number;
    className?: string;
}

export default function ProductGridSkeleton({ count = 8, className = '' }: ProductGridSkeletonProps) {
    return (
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 ${className}`}>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
                    {/* Image skeleton */}
                    <div className="relative h-36 sm:h-40 md:h-48 bg-linear-to-r from-gray-200 to-gray-300 animate-pulse" />

                    {/* Content skeleton */}
                    <div className="p-3 sm:p-4 space-y-3">
                        {/* Rating skeleton */}
                        <div className="flex items-center gap-1">
                            <div className="flex gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div key={i} className="w-3 h-3 bg-gray-300 rounded-full animate-pulse" />
                                ))}
                            </div>
                            <div className="w-12 h-3 bg-gray-300 rounded animate-pulse ml-1" />
                        </div>

                        {/* Title skeleton */}
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-300 rounded animate-pulse w-full" />
                            <div className="h-4 bg-gray-300 rounded animate-pulse w-2/3" />
                        </div>

                        {/* Description skeleton */}
                        <div className="space-y-2">
                            <div className="h-3 bg-gray-200 rounded animate-pulse w-full" />
                            <div className="h-3 bg-gray-200 rounded animate-pulse w-4/5" />
                        </div>

                        {/* Price and button skeleton */}
                        <div className="flex items-center justify-between pt-2">
                            <div className="space-y-1">
                                <div className="h-5 bg-gray-300 rounded animate-pulse w-16" />
                                <div className="h-3 bg-gray-200 rounded animate-pulse w-12" />
                            </div>
                            <div className="h-8 w-8 bg-gray-300 rounded-full animate-pulse" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}