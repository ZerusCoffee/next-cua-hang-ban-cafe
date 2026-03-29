'use client'

import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import gsap from 'gsap'

export default function ImagesCard({ images, productName }: { images: string[], productName: string }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const imageRef = useRef<HTMLDivElement>(null)
    const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([])
    const counterRef = useRef<HTMLDivElement>(null)
    const prevButtonRef = useRef<HTMLButtonElement>(null)
    const nextButtonRef = useRef<HTMLButtonElement>(null)

    const goToPrevious = () => {
        if (!imageRef.current) return

        // Animate out
        gsap.to(imageRef.current, {
            opacity: 0,
            x: -30,
            scale: 0.95,
            duration: 0.25,
            ease: "power2.in",
            onComplete: () => {
                setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
                // Animate in
                gsap.fromTo(imageRef.current,
                    { opacity: 0, x: 30, scale: 0.95 },
                    { opacity: 1, x: 0, scale: 1, duration: 0.35, ease: "back.out(0.4)" }
                )
            }
        })

        // Animate counter
        if (counterRef.current) {
            gsap.fromTo(counterRef.current,
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.2, ease: "back.out" }
            )
        }
    }

    const goToNext = () => {
        if (!imageRef.current) return

        // Animate out
        gsap.to(imageRef.current, {
            opacity: 0,
            x: 30,
            scale: 0.95,
            duration: 0.25,
            ease: "power2.in",
            onComplete: () => {
                setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
                // Animate in
                gsap.fromTo(imageRef.current,
                    { opacity: 0, x: -30, scale: 0.95 },
                    { opacity: 1, x: 0, scale: 1, duration: 0.35, ease: "back.out(0.4)" }
                )
            }
        })

        // Animate counter
        if (counterRef.current) {
            gsap.fromTo(counterRef.current,
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.2, ease: "back.out" }
            )
        }
    }

    const goToSlide = (index: number) => {
        if (index === currentIndex || !imageRef.current) return

        const direction = index > currentIndex ? 'right' : 'left'

        // Animate out
        gsap.to(imageRef.current, {
            opacity: 0,
            x: direction === 'right' ? 30 : -30,
            scale: 0.95,
            duration: 0.25,
            ease: "power2.in",
            onComplete: () => {
                setCurrentIndex(index)
                // Animate in
                gsap.fromTo(imageRef.current,
                    { opacity: 0, x: direction === 'right' ? -30 : 30, scale: 0.95 },
                    { opacity: 1, x: 0, scale: 1, duration: 0.35, ease: "back.out(0.4)" }
                )
            }
        })

        // Animate thumbnail
        if (thumbnailRefs.current[index]) {
            gsap.fromTo(thumbnailRefs.current[index],
                { scale: 0.9 },
                { scale: 1, duration: 0.2, ease: "back.out" }
            )
        }
    }

    // Auto play
    useEffect(() => {
        if (images.length <= 1) return
        const interval = setInterval(() => {
            goToNext()
        }, 5000)
        return () => clearInterval(interval)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images.length, currentIndex])

    // Initial animation
    useEffect(() => {
        if (imageRef.current) {
            gsap.fromTo(imageRef.current,
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(0.4)" }
            )
        }

        // Animate buttons on hover
        if (prevButtonRef.current && nextButtonRef.current) {
            const prevBtn = prevButtonRef.current
            const nextBtn = nextButtonRef.current

            prevBtn.addEventListener('mouseenter', () => {
                gsap.to(prevBtn, { scale: 1.1, duration: 0.2 })
            })
            prevBtn.addEventListener('mouseleave', () => {
                gsap.to(prevBtn, { scale: 1, duration: 0.2 })
            })

            nextBtn.addEventListener('mouseenter', () => {
                gsap.to(nextBtn, { scale: 1.1, duration: 0.2 })
            })
            nextBtn.addEventListener('mouseleave', () => {
                gsap.to(nextBtn, { scale: 1, duration: 0.2 })
            })
        }
    }, [])

    // Animate when currentIndex changes (for counter)
    useEffect(() => {
        if (counterRef.current) {
            gsap.fromTo(counterRef.current,
                { scale: 1.1, opacity: 0.8 },
                { scale: 1, opacity: 1, duration: 0.2, ease: "back.out" }
            )
        }
    }, [currentIndex])

    return (
        <Card className="border-gray-200 shadow-lg overflow-hidden h-full flex flex-col p-0 group/card">
            {/* Main Image with Navigation */}
            <div className="relative aspect-12/9 md:aspect-10/9 bg-linear-to-br from-orange-50 to-amber-50 p-4 flex-1 group">
                <div
                    ref={imageRef}
                    className="relative w-full h-full overflow-hidden rounded-lg"
                >
                    <Image
                        src={images[currentIndex]}
                        alt={`${productName} - Ảnh ${currentIndex + 1}`}
                        fill
                        className="object-cover transition-transform duration-300"
                        priority={currentIndex === 0}
                        sizes="(max-width: 768px) 100vw, 45vw"
                    />
                </div>

                {/* Navigation Buttons */}
                {images.length > 1 && (
                    <>
                        <Button
                            ref={prevButtonRef}
                            variant="ghost"
                            size="icon"
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={goToPrevious}
                        >
                            <ChevronLeft className="h-4 w-4 text-gray-800" />
                        </Button>

                        <Button
                            ref={nextButtonRef}
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={goToNext}
                        >
                            <ChevronRight className="h-4 w-4 text-gray-800" />
                        </Button>

                        <div
                            ref={counterRef}
                            className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full"
                        >
                            {currentIndex + 1} / {images.length}
                        </div>
                    </>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 p-4 bg-white border-t border-gray-100">
                    {images.map((img, idx) => (
                        <div
                            key={idx}
                            ref={el => { thumbnailRefs.current[idx] = el }}
                            className={`relative aspect-square rounded-lg overflow-hidden bg-gray-50 cursor-pointer transition-all border-2 ${idx === currentIndex
                                ? 'border-orange-500 ring-2 ring-orange-200'
                                : 'border-gray-200 opacity-70 hover:opacity-100'
                                }`}
                            onClick={() => goToSlide(idx)}
                        >
                            <Image
                                src={img}
                                alt={`${productName} ${idx + 1}`}
                                fill
                                className="object-cover"
                                sizes="10vw"
                            />
                        </div>
                    ))}
                </div>
            )}
        </Card>
    )
}