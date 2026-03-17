import { ExternalLink } from "lucide-react";

type ProjectCard = {
  description: string;
  linkUrl: string;
  stack?: string[];
};

export default function Cards({ title, description, linkUrl, stack }: ProjectCard & { title: string }) {
  return (
    <a
      href={linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col justify-between rounded-xl border border-card bg-surface/50 p-6 transition-all duration-300 hover:border-codato-neon/30 hover:bg-surface/80 hover:shadow-[0_0_30px_rgba(92,255,157,0.06)] hover:-translate-y-1"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-text-primary group-hover:text-codato-neon transition-colors">
            {title}
          </h3>
          <ExternalLink size={16} className="text-text-secondary group-hover:text-codato-neon transition-colors" />
        </div>
        <p className="text-text-secondary text-sm leading-relaxed mb-5">{description}</p>
      </div>
      {stack && stack.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {stack.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2.5 py-1 rounded-full bg-codato-neon/5 text-codato-neon border border-codato-neon/10 font-mono"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </a>
  );
}
