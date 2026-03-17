import { ProjectCards, SectionTitle } from "@/components";
import { projectsCards } from "@/constants";

export default function Projetos() {
    return (
        <section id="projetos" className="w-full py-20 scroll-mt-20">
            <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
            <SectionTitle title="Projetos" />
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
                {Object.entries(projectsCards).map(([title, { description, linkUrl, stack, imageUrl, alt }]) => (
                    <ProjectCards
                        key={title}
                        title={title}
                        description={description}
                        linkUrl={linkUrl}
                        stack={stack}
                        imageUrl={imageUrl}
                        alt={alt}
                    />
                ))}
            </div>
            </div>
        </section>
    );
}
