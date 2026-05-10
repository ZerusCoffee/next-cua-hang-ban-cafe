"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Category } from "@/types/category.type";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function About({ categories }: { categories: Category[] }) {
    const textRefs = useRef<(HTMLDivElement | null)[]>([]);
    const router = useRouter();

    const sectionRef = useRef<HTMLDivElement>(null);
    const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);

    useGSAP(() => {
        // Animation cho text section chính
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
                        start: "top bottom",
                        end: "bottom center",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });

        // Animation cho title "Thực đơn đa dạng"
        if (titleRef.current) {
            gsap.fromTo(titleRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        // Animation cho description
        if (descRef.current) {
            gsap.fromTo(descRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    delay: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        // Stagger animation cho các button - chỉ chạy khi có buttons
        if (buttonsRef.current.length > 0) {
            gsap.fromTo(buttonsRef.current,
                {
                    opacity: 0,
                    scale: 0.8,
                    y: 30
                },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: {
                        each: 0.05,
                        from: 'center',
                        grid: 'auto'
                    },
                    ease: "circ.in",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [categories]); // Thêm categories vào dependencies để re-run khi có thay đổi

    const setTextRef = (index: number) => (el: HTMLDivElement | null) => {
        textRefs.current[index] = el;
    };

    const handleSelectCategory = async (categoryId: number) => {
        const params = new URLSearchParams();
        if (categoryId)
            params.set('categoryId', categoryId.toString());
        router.push(`/products?${params.toString()}`);
    };

    return (
        <main className="bg-white">
            {/* Text Section */}
            <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
                <div className="relative z-10 text-center px-4 w-full">
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

                    {/** Category Section */}
                    <div ref={sectionRef} className="w-full mt-20">
                        <h2
                            ref={titleRef}
                            className="text-3xl md:text-4xl font-serif italic text-center
                                       text-amber-800 dark:text-amber-600 tracking-wide"
                        >
                            Thực đơn đa dạng
                        </h2>
                        <p
                            ref={descRef}
                            className="text-center text-sm text-stone-500 dark:text-stone-400 mt-2 font-light tracking-wider"
                        >
                            lựa chọn của bạn
                        </p>
                        {categories.length > 0 && (
                            <ScrollArea type='always' className="w-full py-2">
                                <div className="flex justify-center items-center gap-3 py-2">
                                    {categories.map((cat, index) => (
                                        <Button
                                            key={cat.slug}
                                            ref={el => { buttonsRef.current[index] = el; }}
                                            onClick={() => handleSelectCategory(cat.id)}
                                            className="w-40 h-12 md:w-48 md:h-15 text-sm font-medium tracking-wide
                                                       rounded-full transition-all duration-300 cursor-pointer
                                                       bg-linear-to-br from-amber-100 to-orange-100
                                                       dark:from-amber-900/40 dark:to-orange-900/30
                                                       border border-amber-400/50 dark:border-amber-600/50
                                                       text-stone-700 dark:text-stone-200
                                                       hover:from-amber-200 hover:to-orange-200
                                                       dark:hover:from-amber-800/60 dark:hover:to-orange-800/50
                                                       hover:border-amber-500
                                                       hover:scale-105 active:scale-95"
                                        >
                                            {cat.name}
                                        </Button>
                                    ))}
                                </div>
                                <ScrollBar orientation="horizontal" className="opacity-100" />
                            </ScrollArea>
                        )}
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:inline">
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
                        Cà phê không chỉ là thức uống, mà còn là nguồn cảm hứng bất tận
                    </p>

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