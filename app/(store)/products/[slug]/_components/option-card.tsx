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
        <Card className={`border-green-100 shadow-lg lg:col-span-2 ${optionGroups.length === 0 && 'hidden md:block'}`}>
            <CardContent className="p-6">
                <h3 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
                    <Coffee className="w-4 h-4" />
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
                                    <span className="text-sm font-medium text-green-700 flex items-center gap-1">
                                        {group.groupName} {group.type === 'multiple' && `(Chọn tối đa : ${group.max})`}
                                    </span>



                                    <div
                                        className={`
                                        grid gap-2
                                        ${group.options.length <= 2 ? 'grid-cols-2' : ''}
                                        ${group.options.length === 3 ? 'grid-cols-3' : ''}
                                        ${group.options.length >= 4 ? 'grid-cols-2 md:grid-cols-3' : ''}
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
                                                            ? "bg-green-600 hover:bg-green-700 w-full"
                                                            : "border-green-200 text-green-700 hover:border-green-400 hover:bg-green-50 w-full"
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
                                    <Separator className="bg-green-100" />
                                </div>
                            )
                        }
                        )}
                    </div>)}
            </CardContent>
        </Card >
    )
}
