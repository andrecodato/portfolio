export default function Projetos() {
    const projectsCards = {
        "Project 1": {
            "description": "Description of project 1",
            "link": "https://example.com/project1"
        },
        "Project 2": {
            "description": "Description of project 2",
            "link": "https://example.com/project2"
        },
        "Project 3": {
            "description": "Description of project 3",
            "link": "https://example.com/project3"
        },
        "Project 4": {
            "description": "Description of project 4",
            "link": "https://example.com/project4"
        },
    }
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
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
