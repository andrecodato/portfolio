import { projectsCards } from "@/constants";

export default function Projetos() {
    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center my-20">
            <h1 className="text-4xl font-bold mb-8">Projects</h1>
            <div className="w-full h-full grid grid-cols-2 gap-8">
                {Object.entries(projectsCards).map(([title, { description, link }]) => (
                    <a href={link} key={title} className="w-full h-64 bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer">
                        <h2 className="text-xl font-bold mb-2">{title}</h2>
                        <p className="text-gray-400 mb-4">{description}</p>
                    </a>
                ))}
            </div>
        </div>
    )
};
