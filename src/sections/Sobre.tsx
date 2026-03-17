import { SectionTitle } from "@/components";
import { sobreText } from "@/constants";

export default function Sobre() {
  return (
    <section id="sobre" className="w-full py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
      <SectionTitle title="Sobre mim" />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Bio */}
        <div className="md:col-span-3">
          <p className="text-text-secondary leading-relaxed text-base">
            Sou um <span className="text-codato-neon">desenvolvedor</span> focado em transformar ideias em <span className="text-codato-neon">produtos reais</span>, funcionais e escaláveis. Trabalho principalmente com <span className="text-codato-neon">Next.js</span>, criando aplicações modernas com foco em <span className="text-codato-neon">performance</span>, organização e experiência do usuário. Tenho uma mentalidade prática: aprendo construindo e já desenvolvi sistemas completos com autenticação, dashboards, integrações com APIs e automações. Além da programação, também <span className="text-codato-neon">empreendo</span> — fui cofundador da hamburgueria artesanal OPORÃO, o que me dá uma visão além do código, focada em <span className="text-codato-neon">produto e negócio</span>. Também exploro criatividade através da música com a banda <span className="text-codato-neon">RABISCO</span>, trazendo uma abordagem mais autêntica e experimental para tudo que construo. Meu objetivo é evoluir constantemente como <span className="text-codato-neon">desenvolvedor fullstack</span> e criar soluções que realmente gerem <span className="text-codato-neon">impacto</span>.
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
      </div>
    </section>
  );
}
