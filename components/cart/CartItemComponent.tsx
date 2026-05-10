"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDebouncedCartUpdate } from "@/hooks/useDebouncedCartUpdate";
import { formatPrice, hasImage } from "@/lib/utils";
import { CartItem } from "@/validation/cart.schema";
import { Loader2, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface CartItemComponentProps {
  item: CartItem;
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

  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);

  const imageSrc = hasImage(item.image || "")
    ? item.image
    : "/assets/images/mask-img.png";

  return (
    <div className="group relative flex flex-col md:flex-row md:items-center gap-6 p-6 transition-all hover:bg-stone-50/50">
      {/* Product Image */}
      <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0 bg-stone-100 rounded-2xl overflow-hidden shadow-sm border border-stone-100">
        <Image
          src={`${imageSrc}`}
          alt={item.product_name}
          fill
          className="object-cover transition-transform group-hover:scale-110"
          unoptimized
        />
        {isUpdating && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-[#D94E28]" />
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-gray-900 line-clamp-1 group-hover:text-[#D94E28] transition-colors uppercase tracking-tight italic">
            {item.product_name}
          </h3>
          <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
            SKU: {item.product_sku}
          </p>
        </div>

        {item.options && item.options.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {item.options.map((opt, idx) => (
              <div
                key={idx}
                className="bg-stone-100/80 px-2 py-1 rounded-lg text-[10px] font-bold text-stone-500 uppercase tracking-tighter text-nowrap"
              >
                {opt.group_name}:{" "}
                <span className="text-stone-900">{opt.option_value}</span>
                {opt.additional_price > 0 && (
                  <span className="text-[#D94E28] ml-1">
                    (+{formatPrice(opt.additional_price)})
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 md:hidden flex items-center justify-between">
          <span className="text-[#D94E28] font-black text-lg">
            {formatPrice(item.unit_price)}
          </span>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center gap-3 bg-stone-100/50 p-1 rounded-2xl border border-stone-100">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-xl hover:bg-white hover:text-[#D94E28] shadow-none"
          onClick={decrement}
          disabled={isUpdating || quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>

        <span className="w-10 text-center text-sm font-black text-gray-900 tabular-nums">
          {quantity}
        </span>

        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-xl hover:bg-white hover:text-[#D94E28] shadow-none"
          onClick={increment}
          disabled={isUpdating}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Total Price (Desktop) */}
      <div className="hidden md:block w-32 text-right">
        <p className="text-lg font-black text-gray-900 tracking-tighter italic tabular-nums">
          {formatPrice(item.unit_price * quantity)}
        </p>
        <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-1 tabular-nums">
          {formatPrice(item.unit_price)} / sp
        </p>
      </div>

      {/* Remove Button */}
      <div className="absolute top-4 right-4 md:static md:w-10 flex justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 text-stone-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
          onClick={() => setIsRemoveDialogOpen(true)}
          disabled={isUpdating}
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>

      {/* Remove Confirmation Dialog */}
      <AlertDialog
        open={isRemoveDialogOpen}
        onOpenChange={setIsRemoveDialogOpen}
      >
        <AlertDialogContent className="rounded-[2rem] border-0 shadow-2xl p-8">
          <AlertDialogHeader>
            <div className="p-4 bg-rose-50 rounded-2xl w-fit mx-auto mb-4">
              <Trash2 className="h-8 w-8 text-rose-500" />
            </div>
            <AlertDialogTitle className="text-2xl font-black uppercase italic tracking-tighter text-center">
              Xóa sản phẩm?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center font-medium text-stone-500 mt-2 leading-relaxed">
              Bạn có chắc chắn muốn xóa{" "}
              <span className="text-stone-900 font-bold">
                &quot;{item.product_name}&quot;
              </span>{" "}
              khỏi giỏ hàng?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-8 sm:justify-center gap-3">
            <AlertDialogCancel className="rounded-xl font-bold uppercase tracking-widest text-[10px] px-8 h-12 border-2">
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onRemove(item.item_key);
                setIsRemoveDialogOpen(false);
              }}
              className="bg-rose-500 hover:bg-rose-600 rounded-xl font-bold uppercase tracking-widest text-[10px] px-8 h-12 shadow-lg shadow-rose-200 border-0 text-white"
            >
              Đồng ý xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
