import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";


type DescriptionCardProps = {
    productName: string,
    category: string,
    shortDescription: string,
    price: number,
    description: string
}


export default function DescriptionCard({ productName, category, shortDescription, price, description }: DescriptionCardProps) {
    return (
        <Card className="border-green-100 shadow-lg h-full flex flex-col">
            <CardContent className="p-6 flex flex-col h-full">
                {/* Product Title */}
                <div className="mb-4">
                    <Badge variant="outline" className="mb-2 text-green-600 border-green-200 bg-green-50">
                        {category}
                    </Badge>
                    <h1 className="text-3xl lg:text-4xl font-bold text-green-800">
                        {productName}
                    </h1>
                </div>

                {/* Short Description */}
                <p className="text-sm text-muted-foreground mb-4 italic border-l-2 border-green-300 pl-3">
                    {shortDescription}
                </p>

                {/* Price */}
                <div className="bg-green-50 rounded-lg p-4 border border-green-100 mb-6">
                    <span className="text-sm text-green-600 block mb-1">Giá ban đầu</span>
                    <span className="text-3xl font-bold text-green-800">
                        {formatPrice(price)}
                    </span>
                </div>

                <Separator className="bg-green-100 mb-4" />

                {/* Detailed Description */}
                <div className="flex-1">
                    <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                        <span className="w-1 h-5 bg-green-500 rounded-full"></span>
                        Mô tả chi tiết
                    </h3>
                    <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                        <p>{description || "Sản phẩm này không có mô tả chi tiết"} </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
