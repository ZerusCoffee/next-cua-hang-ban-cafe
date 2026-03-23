'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { OptionAction, OptionState } from '@/hooks/use-option'
import { formatPrice } from '@/lib/utils'
import { OptionGroup } from '@/types/option.type'
import { Coffee } from 'lucide-react'

type OptionCardType = {
    optionGroups: OptionGroup[]
    optionState: OptionState
    dispatch: React.Dispatch<OptionAction>

}

export default function OptionCard({ optionGroups, optionState, dispatch }: OptionCardType) {
    return (
        <Card className={`border-amber-300 shadow-lg lg:col-span-2 ${optionGroups.length === 0 && 'hidden md:block'}`}>
            <CardContent className="p-6">
                <h3 className="font-semibold text-amber-900 mb-4 flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-amber-700" />
                    Tùy chọn sản phẩm
                </h3>

                {optionGroups.length === 0
                    ?
                    (<div className="flex items-center justify-center min-h-80 ">
                        <h3 className="text-sm font-medium text-gray-500 text-center">
                            Sản phẩm không có tùy chọn
                        </h3>
                    </div>)
                    :
                    (<div className="space-y-4">
                        {optionGroups.map((group) => {
                            const groupId = group.groupId
                            const max = group.max;
                            return (
                                <div className='space-y-5' key={group.groupId}>
                                    <span className="text-sm font-medium text-amber-800 flex items-center gap-1">
                                        {group.groupName} {group.type === 'multiple' && `(Chọn tối đa : ${group.max})`}
                                    </span>



                                    <div
                                        className={`
                                        grid gap-2
                                        ${group.options.length <= 2 ? 'grid-cols-2' : ''}
                                        ${group.options.length === 3 ? 'grid-cols-3' : ''}
                                        ${group.options.length >= 4 ? 'grid-cols-1 md:grid-cols-3' : ''}
                                    `}
                                    >
                                        {group.options.map((option) => {

                                            const selected = optionState[groupId]

                                            const isSelected =
                                                selected === option ||
                                                (Array.isArray(selected) && selected.includes(option))

                                            return (
                                                <Button
                                                    key={`option_${option.id}`}
                                                    variant={isSelected ? "default" : "outline"}
                                                    className={
                                                        `cursor-pointer ${isSelected
                                                            ? "bg-amber-500/95 hover:bg-amber-600 text-black border-amber-500 font-medium shadow-md"
                                                            : "border-amber-300 text-amber-900 hover:border-amber-600 hover:bg-amber-100 w-full"
                                                        }`
                                                    }
                                                    onClick={() =>
                                                        dispatch({
                                                            type: "SELECT_OPTION",
                                                            groupId: group.groupId,
                                                            option: option,
                                                            selectionType: group.type,
                                                            max: max
                                                        })
                                                    }
                                                >
                                                    {option.value} {option.additionalPrice > 0 && ` +${formatPrice(option.additionalPrice)}`}
                                                </Button>
                                            )
                                        })}
                                    </div>
                                    <Separator className="bg-amber-300" />
                                </div>
                            )
                        }
                        )}
                    </div>)}
            </CardContent>
        </Card >
    )
}