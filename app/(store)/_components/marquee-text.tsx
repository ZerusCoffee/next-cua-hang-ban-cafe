"use client"

import { DotIcon } from "lucide-react"
import Marquee from "react-fast-marquee"

export default function MarqueeText() {
    return (
        <div className="w-full bg-[#FCF9EB] py-5 overflow-hidden">
            <Marquee
                speed={100}
                gradient={false}
                className="select-none"
            >
                <div className="flex items-center">

                    <TickerItem text="From A Leading Local Espresso Chain" />
                    <Separator />
                    <TickerItem text="Artisan Roasted Daily" />
                    <Separator />
                    <TickerItem text="Single Origin Specialists" />
                    <Separator />
                    <TickerItem text="Brewed With Passion" />
                    <Separator />

                </div>
            </Marquee>
        </div>
    )
}

function TickerItem({ text }: { text: string }) {
    return (
        <span className="mx-8 text-[15px] font-semibold tracking-[0.22em] uppercase text-[rgb(114,87,76)]">
            {text}
        </span>
    )
}

function Separator() {
    return (
        <DotIcon size={55} className="text-[rgb(114,87,76)]" />
    )
}