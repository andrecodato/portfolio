import { socialsLinks } from "../constants";
import { SectionTitle } from "@/components";

export default function Terminal() {
  const hostname = "codato@portfolio";
  const commands = [
    { cmd: "help", out: "Available commands: help, about, projects, contact" },
    { cmd: "about", out: "Software developer focused on building creative & useful things." },
    { cmd: "projects", out: `Check my work → ${socialsLinks.github}` },
    { cmd: "contact", out: `LinkedIn: ${socialsLinks.linkedin}\nYouTube: ${socialsLinks.youtube}` },
  ];

  return (
    <section className="w-full py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
      <SectionTitle title="Terminal" />
      <div className="w-full rounded-xl border border-card bg-[#0c0c0c] overflow-hidden shadow-2xl">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-surface/60 border-b border-card">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-3 text-xs text-text-secondary font-mono">~/portfolio</span>
        </div>
        {/* Terminal body */}
        <div className="p-5 font-mono text-sm space-y-3 min-h-[280px]">
          {commands.map(({ cmd, out }) => (
            <div key={cmd}>
              <p>
                <span className="text-codato-neon">{hostname}</span>
                <span className="text-text-secondary">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-text-secondary">$ </span>
                <span className="text-text-primary">{cmd}</span>
              </p>
              {out.split("\n").map((line, i) => (
                <p key={i} className="text-text-secondary ml-0 pl-0">{line}</p>
              ))}
            </div>
          ))}
          <p>
            <span className="text-codato-neon">{hostname}</span>
            <span className="text-text-secondary">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-text-secondary">$ </span>
            <span className="inline-block w-2 h-4 bg-codato-neon animate-blink align-middle" />
          </p>
        </div>
      </div>
      </div>
    </section>
  );
}
