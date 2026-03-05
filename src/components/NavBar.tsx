export default function NavBar() {
    const title = "Codato";
    const subtitle = "developer ·  developer ·sA experimental creator";
    const phrase = "Projects, experiments and controlled chaos.";

    return (
        <nav className="w-full h-16 flex items-center justify-between px-4">
            <div className="flex flex-col">
                <h1 className="text-lg font-bold">{title}</h1>
                <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
            <p className="text-sm text-gray-500">{phrase}</p>
        </nav>
    )
};
