import { BLOG_DETAILS } from "@/types/blog.type";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetailClient from "./_components/blog-detail-client";

export async function generateStaticParams() {
  return Object.values(BLOG_DETAILS).map((post) => ({
    category: post.categorySlug,
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = BLOG_DETAILS[slug as keyof typeof BLOG_DETAILS];
  if (!blog) return { title: "Blog Not Found" };

  return {
    title: `${blog.title} | The Coffee House Journal`,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [blog.image],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const blog = BLOG_DETAILS[slug as keyof typeof BLOG_DETAILS];

  if (!blog || blog.categorySlug !== category) {
    notFound();
  }

  return <BlogDetailClient blog={blog} />;
}
