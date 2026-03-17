import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";

const components = {
  h1: (props: React.ComponentProps<"h1">) => (
    <h1 className="text-3xl font-bold text-text-primary mt-10 mb-4" {...props} />
  ),
  h2: (props: React.ComponentProps<"h2">) => (
    <h2 className="text-2xl font-bold text-text-primary mt-8 mb-3" {...props} />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 className="text-xl font-semibold text-text-primary mt-6 mb-2" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="text-text-secondary leading-relaxed mb-4" {...props} />
  ),
  a: (props: React.ComponentProps<"a">) => (
    <a
      className="text-codato-neon hover:text-codato-glow underline underline-offset-2 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="list-disc list-inside text-text-secondary mb-4 space-y-1" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol className="list-decimal list-inside text-text-secondary mb-4 space-y-1" {...props} />
  ),
  li: (props: React.ComponentProps<"li">) => (
    <li className="text-text-secondary" {...props} />
  ),
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="border-l-4 border-codato-neon pl-4 italic text-text-secondary my-4"
      {...props}
    />
  ),
  code: (props: React.ComponentProps<"code">) => (
    <code
      className="bg-surface text-codato-neon px-1.5 py-0.5 rounded text-sm font-mono"
      {...props}
    />
  ),
  pre: (props: React.ComponentProps<"pre">) => (
    <pre
      className="bg-surface border border-card rounded-lg p-4 overflow-x-auto my-6 text-sm"
      {...props}
    />
  ),
  details: (props: React.ComponentProps<"details">) => (
    <details
      className="border border-card rounded-lg my-3 group open:border-codato-neon/30 transition-colors [&>*:not(summary)]:px-5 [&>*:last-child]:pb-4"
      {...props}
    />
  ),
  summary: (props: React.ComponentProps<"summary">) => (
    <summary
      className="cursor-pointer select-none px-5 py-3 text-text-primary font-semibold hover:text-codato-neon transition-colors list-none flex items-center justify-between [&::-webkit-details-marker]:hidden"
      {...props}
    >
      {props.children}
      <span className="text-text-secondary group-open:rotate-180 transition-transform text-sm ml-2">▼</span>
    </summary>
  ),
  hr: (props: React.ComponentProps<"hr">) => (
    <hr className="border-card my-8" {...props} />
  ),
  img: (props: React.ComponentProps<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="rounded-lg my-6 max-w-full" alt={props.alt ?? ""} {...props} />
  ),
};

interface MDXContentProps {
  source: string;
}

export default function MDXContent({ source }: MDXContentProps) {
  return (
    <article className="prose-custom max-w-none">
      <MDXRemote source={source} components={components} />
    </article>
  );
}
