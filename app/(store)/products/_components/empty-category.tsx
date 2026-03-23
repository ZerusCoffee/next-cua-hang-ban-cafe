import { Coffee } from 'lucide-react'

export default function EmptyCategory() {
    return (
        <div className="text-center py-16">
            <div className="inline-block p-6 bg-amber-50 rounded-full mb-4">
                <Coffee className="w-12 h-12 text-amber-300" />
            </div>
            <h3 className="text-lg font-medium text-amber-800 mb-2">
                Chưa có sản phẩm
            </h3>
        </div>
    )
}
