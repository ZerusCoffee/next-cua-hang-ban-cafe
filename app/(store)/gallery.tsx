'use client'

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Gallery() {
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const gridRef = useRef<HTMLDivElement>(null);


    const setImageRef = (index: number) => (el: HTMLDivElement | null) => {
        imageRefs.current[index] = el;
    };

    const images = [
        { src: "/assets/images/about_1.webp", alt: "ZERUS CAFFE 1", id: 1 },
        { src: "/assets/images/about_2.jpg", alt: "ZERUS CAFFE 2", id: 2 },
        { src: "/assets/images/about_3.jpg", alt: "ZERUS CAFFE 3", id: 3 },
        { src: "/assets/images/about_4.jpg", alt: "ZERUS CAFFE 4", id: 4 },
        { src: "/assets/images/about_5.jpg", alt: "ZERUS CAFFE 5", id: 5 },
    ];


    useGSAP(() => {
        if (gridRef.current) {
            gsap.fromTo(gridRef.current,
                {
                    y: 100,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top bottom-=100",
                        end: "bottom center",
                        toggleActions: "play none none reverse",
                    },
                    stagger: 0.5
                }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section className="py-24 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
                {/* Grid Images - Layout theo yêu cầu */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-3 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]"
                >
                    {/* Hàng 1 */}
                    {/* Ảnh 1 - Cột 1 */}
                    <div
                        ref={setImageRef(0)}
                        className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer col-span-1 row-span-1"
                    >
                        <Image
                            src={images[0].src}
                            alt={images[0].alt}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    </div>

                    {/* Ảnh 5 - Cột 2 (hàng 1 và 2) */}
                    <div
                        ref={setImageRef(4)}
                        className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer col-span-1 row-span-2"
                    >
                        <Image
                            src={images[4].src}
                            alt={images[4].alt}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Ảnh 2 - Cột 3 */}
                    <div
                        ref={setImageRef(1)}
                        className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer col-span-1 row-span-1"
                    >
                        <Image
                            src={images[1].src}
                            alt={images[1].alt}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    </div>

                    {/* Hàng 2 */}
                    {/* Ảnh 4 - Cột 1 */}
                    <div
                        ref={setImageRef(3)}
                        className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer col-span-1 row-span-1"
                    >
                        <Image
                            src={images[3].src}
                            alt={images[3].alt}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Khoảng trống ở cột 2 đã được ảnh 5 chiếm */}

                    {/* Ảnh 3 - Cột 3 */}
                    <div
                        ref={setImageRef(2)}
                        className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer col-span-1 row-span-1"
                    >
                        <Image
                            src={images[2].src}
                            alt={images[2].alt}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    </div>
                </div>
            </div>
        </section>
    )
}
