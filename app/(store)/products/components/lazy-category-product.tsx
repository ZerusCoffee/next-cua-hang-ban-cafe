"use client";

import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "./loading-spinner";
import InfiniteProductList from "./infinite-scroll";

export default function LazyCategoryProducts({
    categoryId,
}: {
    categoryId: number;
}) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                }
            },
            { rootMargin: "300px" }
        );

        const el = ref.current;
        if (el) observer.observe(el);

        return () => observer.disconnect();
    }, []);

    if (!visible) {
        return (
            <div ref={ref} className="py-12">
                <LoadingSpinner />
            </div>
        );
    }

    return <InfiniteProductList categoryId={categoryId} />;
}