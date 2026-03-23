import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import React from 'react'

type PriceSliderProps = {
    priceRange: [number, number]
    setPriceRange: (value: [number, number]) => void; // Sửa ở đây
    maxPrice: number
}

export default function PriceSlider({ priceRange, setPriceRange, maxPrice }: PriceSliderProps) {
    return (
        <div className="space-y-2 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
                <Label htmlFor="price-range" className="text-sm font-medium">
                    Khoảng giá
                </Label>
                <span className="text-sm text-amber-600 font-medium">
                    {priceRange[0].toLocaleString()}đ - {priceRange[1].toLocaleString()}đ
                </span>
            </div>
            <Slider
                id="price-range"
                min={0}
                max={maxPrice}
                step={5000}
                value={priceRange}
                onValueChange={setPriceRange}
                className="py-2"
            />
        </div>
    )
}
