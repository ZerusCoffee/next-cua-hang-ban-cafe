import { baseUrl } from "@/constants/const";
import { productService } from "@/services/product-service";
import { MetadataRoute } from "next";

export default async function sitemap() : Promise<MetadataRoute.Sitemap> {
    const productData = await productService.getProducts({limit: 100});
    const products = productData.data?.items || []

    const productPages: MetadataRoute.Sitemap = products.map((product) => (
        {
            url: `${baseUrl}/${product.slug}`,
            changeFrequency: 'daily',
            priority: 0.7,
            lastModified: `${product.updatedAt}`
        }
    ))

    return [
        {
            url: `${baseUrl}`,
            changeFrequency: 'weekly',
            priority: 1
        },

        {
            url: `${baseUrl}/products`,
            changeFrequency: 'weekly',
            priority: 0.8
        },
        
        ...productPages
        
    ]
}