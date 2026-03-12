import { productService } from '@/services/product-service';
import { Card, CardContent } from '@/components/ui/card';
import ImagesCard from './_components/images-card';
import DescriptionCard from './_components/description-card';
import ActionSection from './_components/action-section';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  console.log(slug)
  const productData = await productService.getProductBySlug(slug)

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

        {/* Related Products */}
        <div className="mt-6">
          <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-green-500 rounded-full"></span>
            Có thể bạn cũng thích
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="border-green-100 hover:shadow-lg transition-all cursor-pointer group overflow-hidden">
                <CardContent className="p-4">
                  <div className="aspect-square bg-linear-to-br from-green-50 to-emerald-50 rounded-lg mb-3 overflow-hidden">
                    <div className="w-full h-full bg-green-100/50 group-hover:scale-105 transition-transform duration-300"></div>
                  </div>
                  <h4 className="font-medium text-sm text-green-800">Pecan Latte</h4>
                  <p className="text-xs text-green-600">45.000đ</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}