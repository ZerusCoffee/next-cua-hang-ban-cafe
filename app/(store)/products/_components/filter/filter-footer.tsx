import { Button } from '@/components/ui/button'
import React from 'react'

type FilterFooterProps = {
    handleReset: () => void,
    handleApplyFilters: () => void;
}

export default function FilterFooter({ handleReset, handleApplyFilters }: FilterFooterProps) {
    return (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-4 pt-3 border-t">
            <Button
                variant="outline"
                onClick={handleReset}
                className="w-full sm:w-auto order-2 sm:order-1 cursor-pointer"
            >
                Đặt lại
            </Button>
            <Button
                onClick={handleApplyFilters}
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 order-1 sm:order-2 cursor-pointer"
            >
                Áp dụng
            </Button>
        </div>
    )
}
