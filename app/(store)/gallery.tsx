'use client'

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Gallery() {
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const gridRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

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
        // Animation cho text
        if (textRef.current) {
            gsap.fromTo(textRef.current,
                {
                    y: 50,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top bottom-=50",
                        end: "bottom center",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        }

        // Animation cho grid
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
                {/* Phần content phía trên gallery */}
                <div ref={textRef} className="text-center mb-12">
                    {/* Subtitle nhỏ */}
                    <span className="inline-block text-lg font-semibold text-emerald-600 uppercase tracking-[0.2em] mb-3">
                        Không gian ZERUS
                    </span>

                    {/* Tiêu đề chính */}
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Câu chuyện được kể qua <span className="text-emerald-600">từng khung hình</span>
                    </h2>

                    {/* Mô tả */}
                    <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                        Những khoảnh khắc đẹp nhất tại ZERUS CAFFE - nơi hương vị cà phê hòa quyện cùng không gian
                        và những câu chuyện đầy cảm hứng.
                    </p>

                    {/* Đường kẻ trang trí */}
                    <div className="flex justify-center gap-2 mt-6">
                        <div className="w-12 h-1 bg-emerald-500 rounded-full"></div>
                        <div className="w-4 h-1 bg-emerald-300 rounded-full"></div>
                        <div className="w-2 h-1 bg-emerald-200 rounded-full"></div>
                    </div>
                </div>

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
                        {/* Thêm text nhẹ khi hover */}
                        <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-sm font-medium">Không gian ấm cúng</p>
                        </div>
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
                        <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-sm font-medium">Góc thư giãn yêu thích</p>
                        </div>
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
                        <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-sm font-medium">Những tách cà phê nghệ thuật</p>
                        </div>
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
                        <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-sm font-medium">Kết nối yêu thương</p>
                        </div>
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
                        <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-sm font-medium">Khoảnh khắc bình yên</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}