import { ProjectCards, SectionTitle } from "@/components";
import { projectsCards } from "@/constants";

export default function Projetos() {
    return (
        <section id="projetos" className="w-full px-6 py-20 scroll-mt-20">
            <SectionTitle title="Projetos" />
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
                {Object.entries(projectsCards).map(([title, { description, linkUrl, stack }]) => (
                    <ProjectCards
                        key={title}
                        title={title}
                        description={description}
                        linkUrl={linkUrl}
                        stack={stack}
                    />
                ))}
            </div>
        </section>
    );
}
