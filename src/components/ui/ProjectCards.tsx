import { ExternalLink } from "lucide-react";
import Image from "next/image";

type ProjectCard = {
  description: string;
  linkUrl: string;
  stack?: string[];
  imageUrl?: string;
  alt?: string;
};

export default function Cards({ title, description, linkUrl, stack, imageUrl, alt }: ProjectCard & { title: string }) {
  return (
    <a
      href={linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col rounded-xl border border-card bg-surface/50 overflow-hidden transition-all duration-300 hover:border-codato-neon/30 hover:shadow-[0_0_30px_rgba(92,255,157,0.06)] hover:-translate-y-1"
    >
      {/* Image */}
      {imageUrl && (
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-card">
          <Image
            src={imageUrl}
            alt={alt ?? title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 p-5">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-bold text-text-primary group-hover:text-codato-neon transition-colors">
              {title}
            </h3>
            <ExternalLink size={14} className="text-text-secondary group-hover:text-codato-neon transition-colors flex-shrink-0" />
          </div>
          <p className="text-text-secondary text-sm leading-relaxed mb-4">{description}</p>
        </div>
        {stack && stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {stack.map((tech) => (
              <span
                key={tech}
                className="text-[11px] px-2 py-0.5 rounded-full bg-codato-neon/5 text-codato-neon border border-codato-neon/10 font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}
