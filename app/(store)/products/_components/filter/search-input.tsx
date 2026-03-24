import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Search } from 'lucide-react'
import React from 'react'


type SearchInputProps = {
    searchValue: string,
    onSearchChange: (s: string) => void;
}

export default function SearchInput({ searchValue, onSearchChange }: SearchInputProps) {
    return (
        <div className="space-y-2 w-full">
            <Label htmlFor="search" className="text-sm font-medium text-gray-700">
                Tìm kiếm sản phẩm
            </Label>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                    id="search"
                    type="text"
                    placeholder="Nhập tên sản phẩm..."
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-9 pr-4 h-10 w-full border-gray-200 focus:border-amber-400 focus:ring-amber-400/20 transition-all duration-200"
                />
            </div>
        </div>
    )
}