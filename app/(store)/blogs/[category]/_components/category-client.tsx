"use client";

import { gsap } from "@/lib/gsap";
import { BlogPost } from "@/types/blog.type";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import BlogsLayout from "../../_components/blogs-layout";

const CategoryPageClient = ({
  filteredPosts,
  activeSlug,
}: {
  filteredPosts: BlogPost[];
  activeSlug: string;
}) => {
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
  }, [activeSlug]);

  return (
    <BlogsLayout activeSlug={activeSlug}>
      <div className="cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <Link
              key={post.id}
              href={`/blogs/${post.categorySlug}/${post.slug}`}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group flex flex-col"
            >
              <div className="relative aspect-16/10 overflow-hidden rounded-[2rem] shadow-lg shadow-orange-900/10 bg-white">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <div className="mt-8">
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">
                  {post.category}
                </span>
                <h2 className="mt-4 text-2xl font-bold text-stone-900 group-hover:text-[#EA8025] transition-colors leading-tight">
                  {post.title}
                </h2>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-40 text-center border-2 border-dashed border-stone-200 rounded-3xl">
            <p className="text-stone-400 font-serif italic text-2xl">
              Chưa có bài viết cho mục này.
            </p>
          </div>
        )}
      </div>
    </BlogsLayout>
  );
};

export default CategoryPageClient;
