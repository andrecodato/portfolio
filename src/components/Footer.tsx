import { Github, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const copyrightText = `© ${currentYear} André Codato.`;
    const socials = {
        github: "https://github.com/andrecodato",
        linkedin: "https://www.linkedin.com/in/andrecodato/",
        youtube: "https://www.youtube.com/@andrecodato",
    }

    return (
        <footer className="w-full h-16 flex items-center justify-center bg-gray-800 text-white">
            <div className="flex items-center space-x-4">
                <span>{copyrightText}</span>
                <div className="flex space-x-4">
                    <a href={socials.github} target="_blank" rel="noopener noreferrer">
                        <Github size={20} />
                    </a>
                    <a href={socials.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin size={20} />
                    </a>
                    <a href={socials.youtube} target="_blank" rel="noopener noreferrer">
                        <Youtube size={20} />
                    </a>
                </div>
            </div>
        </footer>
    )
};
