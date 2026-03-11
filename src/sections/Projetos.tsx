import { ProjectCards, SectionTitle } from "@/components";
import { projectsCards } from "@/constants";

export default function Projetos() {
    return (
        <section className="w-full my-20 pt-20">
            <SectionTitle title="Projetos" />
            <div className="w-full h-full grid grid-cols-2 gap-8 ">
                {Object.entries(projectsCards).map(([title, { description, linkUrl, stack }]) => (
                    <ProjectCards
                        key={title}
                        title={title}
                        description={description} 
                        linkUrl={linkUrl}
                        stack={stack} />
                ))}
            </div>
        </section>
    )
};
