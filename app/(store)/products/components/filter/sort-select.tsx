import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

export default function SorSelect({ sortBy, setSortBy }: { sortBy: string, setSortBy: (v: string) => void }) {
    return (
        <div className="space-y-2">
            <Label htmlFor="sort" className="text-sm font-medium">
                Sắp xếp theo
            </Label>
            <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort">
                    <SelectValue placeholder="Chọn kiểu sắp xếp" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="default">Mặc định</SelectItem>
                    <SelectItem value="price-asc">Giá: Thấp đến cao</SelectItem>
                    <SelectItem value="price-desc">Giá: Cao đến thấp</SelectItem>
                    <SelectItem value="newest">Mới nhất</SelectItem>
                    <SelectItem value="popular">Phổ biến</SelectItem>
                    <SelectItem value="sold">Bán chạy</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}
