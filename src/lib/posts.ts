import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const stats = readingTime(content);

    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      date: data.date ?? "",
      tags: data.tags ?? [],
      readingTime: stats.text,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string) {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const stats = readingTime(content);

  return {
    meta: {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      date: data.date ?? "",
      tags: data.tags ?? [],
      readingTime: stats.text,
    } as PostMeta,
    content,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];

  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
