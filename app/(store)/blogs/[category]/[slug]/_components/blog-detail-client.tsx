"use client";

import { gsap } from "@/lib/gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface BlogDetailClientProps {
  blog: {
    title: string;
    image: string;
    category: string;
    date: string;
    author: string;
    content: string;
  };
}

const BlogDetailClient = ({ blog }: BlogDetailClientProps) => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
      ).fromTo(
        ".content-reveal",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
        "-=0.6",
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pb-32 bg-white">
      <div
        ref={headerRef}
        className="bg-[#FFF7ED] pt-24 pb-16 border-b border-orange-100"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blogs"
              className="inline-flex items-center text-orange-500 font-bold uppercase tracking-widest text-[10px] mb-8 hover:gap-2 transition-all"
            >
              ← Quay lại Chuyện Cà Phê
            </Link>
            <div className="flex flex-col justify-between items-start lg:items-end gap-8">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest">
                    {blog.category}
                  </span>
                  <span className="text-gray-400 text-xs font-medium">
                    {blog.date}
                  </span>
                </div>
                <h1 className="text-4xl md:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tighter">
                  {blog.title}
                </h1>
              </div>
              <div className="text-gray-400 text-sm font-serif italic border-l-2 border-orange-500 pl-4 shrink-0">
                Written by{" "}
                <span className="text-gray-900 font-bold not-italic">
                  {blog.author}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 max-w-4xl">
        {/* Hero image */}
        <div className="content-reveal relative aspect-video w-full overflow-hidden rounded-[2rem] shadow-2xl shadow-orange-900/10 mb-16">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article */}
        <article
          ref={contentRef}
          className="content-reveal prose prose-orange prose-lg md:prose-xl max-w-none
            prose-headings:text-gray-900 prose-headings:font-bold prose-headings:tracking-tight
            prose-p:text-gray-600 prose-p:leading-relaxed
            prose-img:rounded-[2rem] prose-img:shadow-xl
            prose-strong:text-orange-600
            prose-ul:list-disc prose-li:text-gray-600"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Share - nằm dưới bài */}
        <aside className="content-reveal mt-16 pt-8 border-t border-gray-100">
          <div className="flex items-center gap-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-900">
              Chia sẻ bài viết
            </h4>
            <div className="flex gap-4">
              {["FB", "TW", "LI"].map((s) => (
                <button
                  key={s}
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[10px] font-bold hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogDetailClient;
