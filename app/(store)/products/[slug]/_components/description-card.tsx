import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { Coffee } from "lucide-react";

type DescriptionCardProps = {
    productName: string,
    category: string,
    shortDescription: string,
    price: number,
    description: string
}

export default function DescriptionCard({
    productName,
    category,
    shortDescription,
    price,
    description
}: DescriptionCardProps) {
    return (
        <Card className="border-gray-200 shadow-lg h-full flex flex-col hover:shadow-xl transition-shadow">
            <CardContent className="p-6 flex flex-col h-full">
                {/* Product Title */}
                <div className="mb-4">
                    <Badge variant="outline" className="mb-2 text-orange-600 border-orange-200 bg-orange-50 hover:bg-orange-100">
                        {category}
                    </Badge>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                        {productName}
                    </h1>
                </div>

                {/* Short Description */}
                <p className="text-sm text-gray-600 mb-4 italic border-l-2 border-orange-400 pl-3">
                    {shortDescription}
                </p>

                {/* Price */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-6">
                    <span className="text-sm text-gray-500 block mb-1">Giá ban đầu</span>
                    <span className="text-3xl font-bold text-gray-900">
                        {formatPrice(price)}
                    </span>
                </div>

                <Separator className="bg-gray-200 mb-4" />

                {/* Detailed Description */}
                <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Coffee className="w-5 h-5 text-orange-500" />
                        Mô tả chi tiết
                    </h3>
                    <div className="text-sm text-gray-600 leading-relaxed space-y-3">
                        <p>{description || "Sản phẩm này không có mô tả chi tiết"}</p>

                    </div>
                </div>
            </CardContent>
        </Card>
    )
}