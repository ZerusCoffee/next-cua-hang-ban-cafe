import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category } from "@/types/category.type";

type CategorySelectsProps = {
    categories: Category[],
    category?: string, // Optional
    setCategory: (value: string) => void
}

export default function CategorySelects({
    categories,
    category = 'all', // Default value
    setCategory
}: CategorySelectsProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium">
                Danh mục
            </Label>
            <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                    <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Tất cả danh mục</SelectItem>
                    {categories.map((cat) => (
                        <SelectItem value={`${cat.id}`} key={cat.id}>
                            {cat.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
