// components/cart/CartItemComponent.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useDebouncedCartUpdate } from "@/hooks/useDebouncedCartUpdate";
import { formatPrice } from "@/lib/utils";
import { CartItem } from "@/validation/cart.schema";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

interface CartItemComponentProps {
  item: CartItem; // Dùng type từ schema
  onUpdate: () => void;
  onRemove: (itemKey: string) => void;
}

export const CartItemComponent = ({
  item,
  onUpdate,
  onRemove,
}: CartItemComponentProps) => {
  const { quantity, increment, decrement, isUpdating } = useDebouncedCartUpdate(
    {
      itemKey: item.item_key,
      initialQuantity: item.quantity,
      onSuccess: onUpdate,
    },
  );

  const imageSrc = item.image || "/assets/images/logo.jpg";

  return (
    <div className="flex gap-4 bg-white p-4 rounded-lg border">
      <div className="w-24 h-24 relative shrink-0">
        <Image
          src={`${imageSrc}`}
          alt={item.product_name}
          fill
          className="object-cover rounded"
          unoptimized
        />
      </div>

      <div className="flex-1">
        <h3 className="font-medium">{item.product_name}</h3>
        <p className="text-sm text-gray-500">SKU: {item.product_sku}</p>

        {item.options && item.options.length > 0 && (
          <div className="text-sm text-gray-600 mt-1">
            {item.options.map((opt, idx) => (
              <div key={idx}>
                {opt.group_name}: {opt.option_value}
                {opt.additional_price > 0 &&
                  ` (+${formatPrice(opt.additional_price)})`}
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-3">
          <span className="font-semibold text-green-600">
            {formatPrice(item.unit_price)}
          </span>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={decrement}
              disabled={isUpdating || quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>

            <span className="w-12 text-center">{quantity}</span>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={increment}
              disabled={isUpdating}
            >
              <Plus className="h-3 w-3" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-500 hover:text-red-600"
              onClick={() => onRemove(item.item_key)}
              disabled={isUpdating}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {isUpdating && (
          <p className="text-xs text-blue-500 mt-1">Đang cập nhật...</p>
        )}
      </div>
    </div>
  );
};
