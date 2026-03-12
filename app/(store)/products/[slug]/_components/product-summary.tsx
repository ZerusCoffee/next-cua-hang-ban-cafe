'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { OptionState } from '@/hooks/use-option'
import { formatPrice } from '@/lib/utils'
import { OptionGroup } from '@/types/option.type'
import { Heart, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useState } from 'react'


type ProductSummaryType = {
    basePrice: number,
    optionState: OptionState,
    optionGroups: OptionGroup[]
}

export default function ProductSummary({ basePrice, optionState, optionGroups }: ProductSummaryType) {

    const [quantity, setQuantity] = useState(1)

    const handleDecrease = () => {
        if (quantity === 1) return;
        setQuantity(prev => prev - 1)
    }

    const optionPrice = Object.entries(optionState).reduce((total, [groupId, value]) => {

        const gid = Number(groupId)
        const group = optionGroups.find(g => g.groupId === gid)

        if (!group) return total

        if (!Array.isArray(value)) {
            const option = group.options.find(o => o.id === value.id)
            if (!option) return 0;
            return total + (Number(option.additionalPrice) || 0)
        }

        return total + value.reduce((sum, optionId) => {
            const option = group.options.find(o => o.id === optionId.id)
            return sum + (Number(option?.additionalPrice) || 0)
        }, 0)

    }, 0)


    const totalPerOne = Number(basePrice) + Number(optionPrice)

    return (
        <Card className="border-green-100 shadow-lg bg-linear-to-br from-white to-green-50/30">
            <CardContent className="p-6 h-full flex flex-col">
                <h3 className="font-semibold text-green-800 mb-4">Đơn hàng của bạn</h3>

                {/* Total Price */}
                <div className="bg-linear-to-r from-green-600 to-emerald-600 rounded-lg p-4 text-white shadow-md mb-6">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-sm opacity-90">Tổng tiền</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                        <span className="text-2xl font-bold">{formatPrice(totalPerOne * quantity)}</span>
                        <span className="text-xs opacity-90">Cho {quantity} sản phẩm</span>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="space-y-2 text-sm mb-6 flex-1">
                    <div className="flex justify-between text-muted-foreground">
                        <span>Giá cơ bản:</span>
                        <span className="font-medium text-green-700">{formatPrice(basePrice)}</span>
                    </div>

                    {Object.entries(optionState).map(([groupId, value]) => {

                        const gid = Number(groupId)

                        const group = optionGroups.find(g => g.groupId === gid)
                        if (!group) return null

                        // single option
                        if (!Array.isArray(value)) {
                            const option = group.options.find(o => o.id === value.id)
                            if (!option || Number(option.additionalPrice) === 0) return null
                            return (
                                <div key={gid} className="flex justify-between text-muted-foreground">
                                    <span>{group.groupName} {option.value} : </span>
                                    <span className="font-medium text-green-700">
                                        +{formatPrice(option.additionalPrice)}
                                    </span>
                                </div>
                            )
                        }

                        // multiple option
                        else {

                            return value.map(op => {
                                <>{group.groupName}</>
                                const option = group.options.find(o => o.id === op.id)
                                if (!option) return null
                                return (
                                    <div key={option.id} className="flex justify-between text-muted-foreground">
                                        <span>{option.value}</span>
                                        <span className="font-medium text-green-700">
                                            +{formatPrice(option.additionalPrice)}
                                        </span>
                                    </div>
                                )
                            })
                        }

                    })}
                    <Separator className="bg-green-100 my-2" />
                    <div className="flex justify-between font-medium">
                        <span>Tạm tính:</span>
                        <span className="text-green-700">{formatPrice(totalPerOne)}</span>
                    </div>
                </div>

                {/* Quantity and Actions */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-green-700">Số lượng:</span>
                        <div className="flex items-center border border-green-200 rounded-lg bg-white">
                            <Button
                                variant="ghost" size="icon" className="h-8 w-8 text-green-600 hover:bg-green-50 hover:text-green-700"
                                onClick={handleDecrease}
                            >
                                <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-10 text-center font-medium text-sm text-green-800">{quantity}</span>
                            <Button
                                variant="ghost" size="icon" className="h-8 w-8 text-green-600 hover:bg-green-50 hover:text-green-700"
                                onClick={() => setQuantity(prev => prev + 1)}
                            >
                                <Plus className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>

                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white gap-2 shadow-md hover:shadow-lg">
                        <ShoppingBag className="h-4 w-4" />
                        Thêm vào giỏ hàng
                    </Button>

                    <Button variant="outline" className="w-full border-green-200 hover:border-green-400 hover:bg-green-50 gap-2">
                        <Heart className="h-4 w-4 text-green-600" />
                        Yêu thích
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
