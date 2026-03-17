import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - André Codato",
  description: "Artigos sobre desenvolvimento, tecnologia e experimentos.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="w-full mt-20 px-6 py-16 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-text-primary mb-2">
        Blog
      </h1>
      <p className="text-text-secondary mb-12">
        Artigos, notas e experimentos.
      </p>

      {posts.length === 0 ? (
        <p className="text-text-secondary">Nenhum post ainda. Em breve!</p>
      ) : (
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block border border-card rounded-xl p-6 hover:border-codato-neon/40 transition-all duration-300"
            >
              <div className="flex items-center gap-3 text-sm text-text-secondary mb-2">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("pt-BR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
              <h2 className="text-xl font-semibold text-text-primary group-hover:text-codato-neon transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-text-secondary text-sm">{post.description}</p>
              {post.tags.length > 0 && (
                <div className="flex gap-2 mt-3 flex-wrap">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-surface text-codato-neon border border-codato-neon/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
