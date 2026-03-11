type ProjectCard = {
  description: string;
  linkUrl: string;
  stack?: string[];
};

export default function Cards({ title, description, linkUrl, stack }: ProjectCard & { title: string }) {
  const projectTitle = "[ " + title.toUpperCase() + " ]";
  return (
    <a
      href={linkUrl}
      key={title}
      className="w-full h-64 bg-white/5 rounded-lg shadow-md p-4 cursor-pointer border border-codato-mint hover:bg-white/10 transition-colors duration-300"
    >
      <h2 className="text-xl font-bold mb-2">
        {projectTitle}
      </h2>
      <p className="text-gray-400 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {stack &&
          stack.map((tech: string) => (
            <span
              key={tech}
              className="bg-lime-700 text-text-primary px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
      </div>
    </a>
  );
}
