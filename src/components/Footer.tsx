import { socialsLinks } from "@/constants";
import { Github, Linkedin, Youtube } from "lucide-react";

const socials = [
  { icon: Github, href: socialsLinks.github, label: "GitHub" },
  { icon: Linkedin, href: socialsLinks.linkedin, label: "LinkedIn" },
  { icon: Youtube, href: socialsLinks.youtube, label: "YouTube" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/5 mt-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-text-secondary text-sm">
          © {currentYear} André Codato. Built with Next.js.
        </p>
        <div className="flex items-center gap-6">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-text-secondary hover:text-codato-neon transition-colors duration-200 hover:-translate-y-0.5 transform"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
