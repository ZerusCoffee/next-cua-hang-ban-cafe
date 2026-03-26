"use client";

import { gsap } from "@/lib/gsap";
import { BLOG_POSTS } from "@/types/blog.type";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import BlogsLayout from "./_components/blogs-layout";

export default function BlogsPage() {
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".cards-grid", start: "top bottom-=100" },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <BlogsLayout activeSlug="">
      <div className="cards-grid grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-x-16 items-start">
        {BLOG_POSTS.map((post, index) => (
          <Link
            key={post.id}
            href={`/blogs/${post.categorySlug}/${post.slug}`}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className={`group flex flex-col ${
              index === 0
                ? "md:col-span-8"
                : index === 1
                  ? "md:col-span-4 md:mt-40"
                  : index === 2
                    ? "md:col-span-5"
                    : "md:col-span-7 md:-mt-20"
            }`}
          >
            <div className="relative aspect-16/10 overflow-hidden rounded-[3rem] shadow-2xl shadow-orange-900/10 bg-white">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute top-8 left-8 bg-[#EA8025] text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                {post.category}
              </div>
            </div>
            <div className="mt-12">
              <h2 className="text-4xl md:text-5xl font-bold text-stone-900 group-hover:text-[#EA8025] transition-colors leading-[1.1] tracking-tighter">
                {post.title}
              </h2>
              <p
                className="text-stone-500 mt-6 text-lg leading-relaxed italic"
                style={{ fontFamily: "var(--font-lora)" }}
              >
                &quot;{post.desc}&quot;
              </p>
            </div>
          </Link>
        ))}
      </div>
    </BlogsLayout>
  );
}
