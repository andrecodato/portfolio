import { Section } from "lucide-react";
import { socialsLinks } from "../constants";
import { SectionTitle } from "@/components"

export default function Terminal() {
    const terminalHostName = "codato@portfolio:~$ ";
    const commands = {
        "help": "Available commands: help, about, projects, contact",
        "about": "I am a software developer with a passion for creating innovative solutions.",
        "projects": `You can find my projects on my GitHub: ${socialsLinks.github}`,
        "contact": `You can reach me on LinkedIn: ${socialsLinks.linkedin} or YouTube: ${socialsLinks.youtube}`,
    }

    return (
        <section className="flex flex-col items-start gap-6 w-full max-w-4xl my-auto px-4 py-8">
            <SectionTitle title="Terminal" />
            {/* {Terminal interativo} */}
            <div className="w-full min-h-100 border-white border-tl-2 border-tr-2 border-bl-2 border-br-2 rounded-lg p-4 bg-black text-green-500 font-mono">
                <p>{terminalHostName}help</p>
            </div>
        </section>
    )
};
