import { productService } from '@/services/product-service';
import ImagesCard from './_components/images-card';
import DescriptionCard from './_components/description-card';
import ActionSection from './_components/action-section';
import ProductCarousel from '@/components/product/product-carousel';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  console.log(slug)
  const productData = await productService.getProductBySlug(slug)

  const relatedProducts = await productService.getRelatedProducts(slug);

  const product = productData.data;
  if (!product) return;

  const images = product.images.length > 0 ? product.images : [
    '/assets/images/mask-img.png',
    '/assets/images/mask-img.png',
    '/assets/images/mask-img.png',
    '/assets/images/mask-img.png',
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50/50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-6 lg:py-8">
        {/* Breadcrumb */}
        <div className="mb-4 text-sm text-muted-foreground">
          Trang chủ / {product.category.name} / {product.name}
        </div>


        {/* Row 1: Image Card + Description Card - equal height */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* Image Card */}
          <ImagesCard
            images={images}
            productName={product.name}
          />

          {/* Description Card - equal height with Image Card */}
          <DescriptionCard
            productName={product.name}
            category={product.category.name}
            price={product.price}
            shortDescription={product.shortDescription}
            description={product.description}
          />
        </div>

        {/* Row 2: Options Card + Order Card - full width */}
        <ActionSection
          product={product}
        />
      </div>

      {/* Related Products */}
      <div className="my-6 px-8">
        <h3 className="text-xl font-bold text-amber-800 mb-4 flex items-center gap-2">
          <span className="w-1 h-10 bg-amber-500 rounded-full"></span>
          Có thể bạn cũng thích
        </h3>
        <ProductCarousel
          products={relatedProducts.data || []}
          option={5}
        />
      </div>
    </div>
  );
}