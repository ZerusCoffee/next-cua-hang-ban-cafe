import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

type CategoryButtonType = {
    label: string,
    handleClick: () => void,
    isSelect: boolean
}

export default function CategoryButton({ label, handleClick, isSelect }: CategoryButtonType) {
    return (
        <Button
            variant="ghost"
            onClick={handleClick}
            className={cn(
                // Kích thước đồng đều
                "h-12 w-32 md:w-40",
                "shrink-0",
                "relative overflow-hidden",
                "transition-all duration-300",
                "hover:scale-105",

                // Style cao bồi minimal sáng
                "border-2",
                "font-sans",
                "tracking-wide",
                "font-semibold",
                "cursor-pointer",

                // Trạng thái
                isSelect ? [
                    "bg-amber-500",
                    "dark:bg-amber-600",
                    "border-amber-600",
                    "dark:border-amber-500",
                    "text-white",
                    "shadow-lg shadow-amber-200/50",
                    "dark:shadow-amber-900/30",
                    "hover:bg-amber-600",
                    "dark:hover:bg-amber-700",
                    "hover:shadow-xl hover:shadow-amber-300/50",
                ] : [
                    "bg-amber-100/80",
                    "dark:bg-amber-950/40",
                    "border-amber-400",
                    "dark:border-amber-700",
                    "text-amber-900",
                    "dark:text-amber-200",
                    "hover:bg-amber-200",
                    "dark:hover:bg-amber-900/60",
                    "hover:border-amber-500",
                    "hover:shadow-md hover:shadow-amber-200/30",
                ],

                // Bo góc
                "rounded-lg",

                // Animation cơ bản
                "active:scale-95",
            )}
        >
            {/* Hiệu ứng shimmer khi hover */}
            <div className={cn(
                "absolute inset-0 -translate-x-full",
                "bg-linear-to-r from-transparent via-white/30 to-transparent",
                "transition-transform duration-700",
                "group-hover:translate-x-full"
            )} />

            {/* Hiệu ứng glow khi selected */}
            {isSelect && (
                <div className="absolute inset-0 animate-pulse bg-amber-400/20 rounded-lg" />
            )}

            <span className={cn(
                "relative z-10",
                "text-sm md:text-base",
                "truncate text-center block w-full",
                "transition-all duration-300",
                isSelect ? "drop-shadow-sm" : "",
            )}>
                {label}
            </span>
        </Button>
    );
}