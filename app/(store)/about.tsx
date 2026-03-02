"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
    const textRefs = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        textRefs.current.forEach((el) => {
            if (!el) return;

            gsap.fromTo(el,
                {
                    y: 100,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top bottom-=150",
                        end: "bottom center",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const setTextRef = (index: number) => (el: HTMLDivElement | null) => {
        textRefs.current[index] = el;
    };

    return (
        <main className="bg-white">
            {/* Text Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/coffee-beans-bg.jpg"
                        alt="Coffee beans background"
                        fill
                        className="object-cover opacity-20"
                    />
                </div>

                <div className="relative z-10 text-center px-4">
                    <h1
                        ref={setTextRef(0)}
                        className="text-6xl md:text-8xl font-black text-amber-900 mb-4 tracking-tight"
                    >
                        ZERUS COFFEE
                    </h1>
                    <p
                        ref={setTextRef(1)}
                        className="text-xl md:text-2xl text-amber-700 max-w-2xl mx-auto font-light mb-8"
                    >
                        Nghệ thuật tạo nên những giọt cà phê hoàn hảo
                    </p>

                    <div className="space-y-2">
                        <p className="text-sm text-amber-600 tracking-[0.3em] uppercase">
                            Est. 2020
                        </p>
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-12 h-px bg-amber-300"></div>
                            <span className="text-amber-700 text-sm">Since 2020</span>
                            <div className="w-12 h-px bg-amber-300"></div>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-amber-700 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-amber-700 rounded-full mt-2 animate-pulse"></div>
                    </div>
                </div>
            </section>

            {/* Sub Section */}
            <section className="py-16 px-4 bg-amber-50">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Quote */}
                    <p
                        ref={setTextRef(2)}
                        className="text-lg md:text-xl text-gray-700 italic mb-6 relative"
                    >
                        <span className="text-4xl text-amber-300 font-serif absolute -left-8 -top-4"> {`"`}</span>
                        Cà phê không chỉ là thức uống, mà còn là nguồn cảm hứng bất tận
                        <span className="text-4xl text-amber-300 font-serif absolute -right-8 -bottom-4">{`"`}</span>
                    </p>

                    {/*  */}
                    <div className="space-y-2 text-sm text-gray-500">
                        <p>Mỗi tách cà phê là một câu chuyện</p>
                        <p className="flex items-center justify-center gap-2">
                            <span className="w-8 h-px bg-amber-300"></span>
                            <span>ZERUS COFFEE</span>
                            <span className="w-8 h-px bg-amber-300"></span>
                        </p>
                    </div>

                    <div className="flex justify-center gap-2 mt-6">
                        <div className="w-1.5 h-1.5 bg-amber-300 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                    </div>

                    <p className="mt-6 text-xs uppercase tracking-[0.3em] text-amber-700 font-semibold">
                        Tinh hoa cà phê Việt
                    </p>
                </div>
            </section>

        </main>
    );
}