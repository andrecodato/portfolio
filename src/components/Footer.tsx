import { socialsLinks } from "@/constants";
import { Github, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightText = `© ${currentYear} André Codato.`;

  return (
    <footer className="w-full h-16 flex items-center justify-center text-white mt-10">
      <div className="flex flex-col items-center space-y-4 ">
        <div className="grid grid-cols-3">
          <div className="w-auto h-[1px] bg-white" />
          <span className="text-2xl mx-20">{copyrightText}</span>
          <div className="w-auto h-[1px] bg-white" />
        </div>
        <div className="flex space-x-12 mb-10">
          <a
            href={socialsLinks.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={40} />
          </a>
          <a
            href={socialsLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={40} />
          </a>
          <a
            href={socialsLinks.youtube}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Youtube size={40} />
          </a>
        </div>
      </div>
    </footer>
  );
}
