import { SectionTitle } from "@/components";
import { sobreText } from "@/constants";

export default function Sobre() {
  return (
    <section id="sobre" className="w-full px-6 py-20 scroll-mt-20">
      <SectionTitle title="Sobre mim" />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Bio */}
        <div className="md:col-span-3">
          <p className="text-text-secondary leading-relaxed text-base">
            {sobreText.aboutText}
          </p>
        </div>

        {/* Skills & Info */}
        <div className="md:col-span-2 flex flex-col gap-8">
          <div>
            <h3 className="text-sm font-mono text-codato-neon mb-4 uppercase tracking-wider">Creative</h3>
            <div className="flex flex-wrap gap-2">
              {sobreText.creativeList.map((item, index) => (
                <span
                  key={index}
                  className="text-sm px-3 py-1.5 rounded-lg bg-surface border border-card text-text-primary hover:border-codato-neon/30 transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-mono text-codato-neon mb-4 uppercase tracking-wider">Other</h3>
            <div className="flex flex-wrap gap-2">
              {sobreText.otherList.map((item, index) => (
                <span
                  key={index}
                  className="text-sm px-3 py-1.5 rounded-lg bg-surface border border-card text-text-primary hover:border-codato-neon/30 transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
