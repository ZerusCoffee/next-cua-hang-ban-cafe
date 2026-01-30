import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import Image from "next/image";

  interface ProductCardProps {
    product: {
      id: number;
      name: string;
      price: number;
      imageUrl: string;
    };
  }

  const ProductCard = ({ product }: ProductCardProps) => {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    }

    return (
      <Card className="flex flex-col">
        <CardHeader className="p-0">
          <div className="relative aspect-square w-full">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover rounded-t-lg"
            />
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-4">
          <CardTitle className="text-base font-semibold mb-2 h-12">
            {product.name}
          </CardTitle>
        </CardContent>
        <CardFooter className="p-4 flex justify-between items-center">
          <p className="text-sm font-bold text-primary">
            {formatPrice(product.price)}
          </p>
          <Button size="icon" variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  };

  export default ProductCard;
