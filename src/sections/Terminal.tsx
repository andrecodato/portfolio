import { socialsLinks } from "../constants";
export default function Terminal() {
    const terminalHostName = "codato@portfolio:~$ ";
    const commands = {
        "help": "Available commands: help, about, projects, contact",
        "about": "I am a software developer with a passion for creating innovative solutions.",
        "projects": `You can find my projects on my GitHub: ${socialsLinks.github}`,
        "contact": `You can reach me on LinkedIn: ${socialsLinks.linkedin} or YouTube: ${socialsLinks.youtube}`,
    }

    return (
        <div>
            <div>
                <div>{terminalHostName}</div>
                <div>
                    {/**
                     * Aqui vai ter os botões fictícios de minimizar e fechar, e o terminal em si, que vai ser um input onde o usuário pode digitar os comandos, e abaixo disso vai ter a resposta do comando digitado.
                     */}
                </div>
            </div>
        </div>
    )
};
