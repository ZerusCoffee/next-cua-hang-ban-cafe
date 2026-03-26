"use client";

import { gsap } from "@/lib/gsap";
import { categories } from "@/types/blog.type";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

const BlogsLayout = ({
  children,
  activeSlug,
}: {
  children: React.ReactNode;
  activeSlug: string;
}) => {
  const badgeRef = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);
  const badge3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".header-reveal", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
      });
      if (badgeRef.current) {
        gsap.to(badgeRef.current, {
          y: -20,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
        gsap.to(badgeRef.current, {
          scale: 1.05,
          rotate: 5,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      // Sticker 2 - bay ngược pha, xoay ngược
      if (badge2Ref.current) {
        gsap.to(badge2Ref.current, {
          y: 20,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
        gsap.to(badge2Ref.current, {
          rotate: -8,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      // Sticker 3 - lắc lư ngang
      if (badge3Ref.current) {
        gsap.to(badge3Ref.current, {
          y: -15,
          x: 8,
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
        gsap.to(badge3Ref.current, {
          scale: 1.08,
          rotate: 6,
          duration: 0.9,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#FFF7ED] min-h-screen pb-40 overflow-hidden font-sans">
      <div className="bg-[#EA8025] pt-32 pb-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12">
            <div className="text-center lg:text-left">
              <span className="header-reveal text-white/80 font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">
                Our Stories
              </span>
              <h1 className="header-reveal text-[10vw] font-black tracking-tighter text-white leading-[0.85]">
                Nhật Ký
                <br />
                <span className="text-orange-200 italic font-serif font-light ml-12 lg:ml-24">
                  Pha Chế.
                </span>
              </h1>
            </div>

            <div className="header-reveal flex flex-wrap justify-center gap-8 border-b border-white/20 pb-4">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.slug === "" ? "/blogs" : `/blogs/${cat.slug}`}
                  className={`text-xs font-bold uppercase tracking-[0.2em] transition-all relative ${
                    activeSlug === cat.slug
                      ? "text-white underline underline-offset-18px decoration-2"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* Sticker 1 - top right, giữ nguyên */}
        <div
          ref={badgeRef}
          className="absolute -top-5 right-4 lg:right-32 w-48 h-48 z-20 pointer-events-none"
        >
          <Image
            src="/assets/images/sticker-aboutus-vuive.png"
            alt=""
            width={200}
            height={200}
            className="w-full h-full object-contain"
            priority
          />
        </div>

        {/* Sticker 2 - bottom left */}
        <div
          ref={badge2Ref}
          className="absolute bottom-4 left-8 lg:left-24 w-32 h-32 z-20 pointer-events-none"
        >
          <Image
            src="/assets/images/stickerset-stores3.png"
            alt=""
            width={130}
            height={130}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Sticker 3 - giữa bên phải, thấp hơn sticker 1 */}
        <div
          ref={badge3Ref}
          className="absolute top-1/2 right-4 lg:right-64 w-24 h-24 z-20 pointer-events-none -translate-y-1/2"
        >
          <Image
            src="/assets/images/stickerset_stores-2.png"
            alt=""
            width={100}
            height={100}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="container mx-auto px-4 mt-32">{children}</div>
    </div>
  );
};

export default BlogsLayout;
