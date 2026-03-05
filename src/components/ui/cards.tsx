export default function cards(title:string, description:string, link:string) {
    return (
        <div className="w-full h-64 bg-gray-800 rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-gray-400 mb-4">{description}</p>
            <a href={link} className="text-blue-500 hover:underline">View Project</a>
        </div>
    )
};
