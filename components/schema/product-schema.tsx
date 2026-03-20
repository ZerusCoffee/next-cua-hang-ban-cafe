import { baseUrl } from "@/constants/const";
import type { Product as ProductType } from "@/types/product.type";
import { Product, WithContext } from "schema-dts";

export default function ProductSchema({ product }: { product: ProductType }) {
    const jsonLd: WithContext<Product> = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.shortDescription || product.description?.slice(0, 160),
        image: product.images?.[0] || "/logo-og.png",
        sku: `ZERUS-${product.id}`,
        brand: {
            "@type": "Brand",
            name: "Tiệm Cà Phê Zerus",
        },
        offers: {
            "@type": "Offer",
            url: `${baseUrl}/products/${product.slug}`,
            priceCurrency: "VND",
            price: product.price,
            availability: product.inStock
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            itemCondition: "https://schema.org/NewCondition",
            priceValidUntil: "2026-12-31",
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}