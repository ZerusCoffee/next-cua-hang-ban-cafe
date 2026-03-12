'use client'

import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ImagesCard({ images, productName }: { images: string[], productName: string }) {
    const [currentIndex, setCurrentIndex] = useState(0)

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }

    const goToSlide = (index: number) => {
        setCurrentIndex(index)
    }

    return (
        <Card className="border-gray-200 shadow-lg overflow-hidden h-full flex flex-col p-0">
            {/* Main Image with Navigation */}
            <div className="relative aspect-4/3 bg-linear-to-br from-orange-50 to-amber-50 p-4 flex-1 group">
                <Image
                    src={images[currentIndex]}
                    alt={`${productName} - Ảnh ${currentIndex + 1}`}
                    fill
                    className="object-cover transition-transform duration-300"
                    priority={currentIndex === 0}
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 45vw"
                />

                {/* Navigation Buttons */}
                {images.length > 1 && (
                    <>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={goToPrevious}
                        >
                            <ChevronLeft className="h-4 w-4 text-gray-800" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={goToNext}
                        >
                            <ChevronRight className="h-4 w-4 text-gray-800" />
                        </Button>

                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
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
                            className={`relative aspect-square rounded-lg overflow-hidden bg-gray-50 cursor-pointer transition-all border-2 ${idx === currentIndex
                                ? 'border-orange-500 ring-2 ring-orange-200'
                                : 'border-gray-200 opacity-70 hover:opacity-100'
                                }`}
                            onClick={() => goToSlide(idx)}
                        >
                            <Image
                                unoptimized
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

            {/* Hiển thị khi chỉ có 1 ảnh */}
            {images.length === 1 && (
                <div className="p-2 text-center text-xs text-gray-500 border-t border-gray-200">
                    <span className="text-orange-500">●</span> Chỉ có 1 hình ảnh
                </div>
            )}
        </Card>
    )
}