import { ChevronDown } from 'lucide-react'

export default function TriggerBar() {
    return (
        <div className="flex flex-col items-center justify-center group cursor-pointer">
            <div className="flex items-center gap-3 text-amber-400 group-hover:text-amber-600 transition-colors">
                <ChevronDown className="w-5 h-5 animate-bounce group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">
                    Cuộn để xem thêm
                </span>
                <ChevronDown className="w-5 h-5 animate-bounce group-hover:scale-110 transition-transform" />
            </div>

            {/* Progress bar */}
            <div className="w-48 h-1 bg-amber-100 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full animate-progress" />
            </div>
        </div>
    )
}
