import { Category } from "@/types/category.type";
import { ChevronDown } from "lucide-react";

export default function CategorySection({
    category,
    children
}: {
    category: Category;
    children?: React.ReactNode; // Thêm children optional

}) {
    return (
        <section className="relative py-8 first:pt-0 last:pb-0 border-b border-amber-100 last:border-0">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div>
                        <h2 className="text-2xl font-bold text-amber-800">
                            {category.name}
                        </h2>
                        <p className="text-sm text-amber-600 flex items-center gap-1">
                            <span>Cuộn để khám phá</span>
                            <ChevronDown className="w-4 h-4 animate-bounce" />
                        </p>
                    </div>
                </div>
            </div>

            {children}
        </section>
    );
}