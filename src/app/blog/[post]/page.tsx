import { getPostBySlug, getAllSlugs } from "@/lib/posts";
import MDXContent from "@/components/MDXContent";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PostPageProps {
  params: Promise<{ post: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ post: slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { post: slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.meta.title} - André Codato`,
    description: post.meta.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { post: slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <main className="w-full px-6 py-16 mt-20 max-w-6xl mx-auto">
      <Link
        href="/blog"
        className="text-text-secondary hover:text-codato-neon transition-colors text-sm mb-8 inline-flex items-center gap-1"
      >
        ← Voltar ao blog
      </Link>

      <header className="mb-10">
        <h1 className="text-4xl font-bold text-text-primary mb-3">
          {post.meta.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-text-secondary">
          <time dateTime={post.meta.date}>
            {new Date(post.meta.date).toLocaleDateString("pt-BR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span>·</span>
          <span>{post.meta.readingTime}</span>
        </div>
        {post.meta.tags.length > 0 && (
          <div className="flex gap-2 mt-4 flex-wrap">
            {post.meta.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-surface text-codato-neon border border-codato-neon/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <MDXContent source={post.content} />
    </main>
  );
}
