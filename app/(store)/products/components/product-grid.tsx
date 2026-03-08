'use client'
import ProductCard from '@/components/product/product-card';
import { ProductCardType } from '@/types/product.type';

interface ProductGridProps {
    products: ProductCardType[];
    className?: string;
}

export default function ProductGrid({ products, className = '' }: ProductGridProps) {

    return (
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 ${className}`}>
            {products.map((product) => (
                <ProductCard key={product.sku} product={product} />
            ))}
        </div>
    );
}