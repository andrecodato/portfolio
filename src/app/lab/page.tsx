'use client';

import { QrCode, MessageSquare, FileText } from "lucide-react";
import { useRef } from "react";
import QRCodeGenerator from "@/components/tools/QRCodeGenerator";
import XatChat from "@/components/tools/XatChat";
import BlogPostGenerator from "@/components/tools/BlogPostGenerator";

const tools = [
  {
    id: "qrcode",
    label: "QR Code",
    icon: QrCode,
    component: <QRCodeGenerator />,
    cols: "col-span-1 sm:col-span-2 lg:col-span-2",
  },
  {
    id: "xat",
    label: "xat.chat",
    icon: MessageSquare,
    component: <XatChat />,
    cols: "col-span-1",
  },
  {
    id: "blog-generator",
    label: "Blog Generator",
    icon: FileText,
    component: <BlogPostGenerator />,
    cols: "col-span-1 sm:col-span-2 lg:col-span-3",
  },
];

export default function Tools() {
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  function scrollTo(id: string) {
    refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="min-h-screen w-full max-w-8xl mx-auto px-4 sm:px-6 py-16 sm:py-20">

      {/* Header */}
      <div className="mb-8 sm:mb-12">
        <h1 className="font-mono text-2xl sm:text-3xl font-bold text-white">
          // <span className="text-[#5CFF90]">Laboratório <img src="https://media.tenor.com/C5x-1uZeJKoAAAAi/dexter%27s-dexter%27s-lab.gif" alt="Ícone" className="inline-block w-14 h-14 sm:w-20 sm:h-20 ml-2" /></span>
        </h1>
        <p className="mt-2 text-sm text-[#a0aec0]">
          Experimentos e ferramentas simples, criadas para resolver problemas específicos ou apenas para diversão. Sinta-se à vontade para explorar!
        </p>
      </div>

      {/* ── Mobile nav: horizontal scroll (some lg) ── */}
      <nav className="flex lg:hidden gap-2 overflow-x-auto pb-3 mb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tools.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg shrink-0 text-xs text-[#a0aec0] font-mono border border-[#2d3f60] bg-[#1a2035] hover:text-[#5CFF90] hover:border-[#5CFF90]/40 active:scale-95 transition-all duration-150"
          >
            <Icon size={13} />
            {label}
          </button>
        ))}
      </nav>

      <div className="flex gap-6 items-start">

        {/* ── Sidebar vertical — só lg+ ── */}
        <aside className="hidden lg:flex sticky top-24 shrink-0 w-48 flex-col gap-1">
          <p className="text-[13px] font-mono text-[#a0aec0] uppercase tracking-widest mb-2 px-1">
            <u style={{ textDecorationColor: "#5CFF90" }}>Ferramentas</u>
          </p>
          {tools.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-left w-full text-sm text-[#a0aec0] border border-transparent hover:bg-[#1a2035] hover:text-[#5CFF90] hover:border-[#2d3f60] transition-all duration-150 group"
            >
              <Icon size={15} className="shrink-0 group-hover:text-[#5CFF90]" />
              <span className="font-mono">{label}</span>
            </button>
          ))}
        </aside>

        {/* ── Grid de ferramentas ── */}
        <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-start">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                id={tool.id}
                ref={el => { refs.current[tool.id] = el; }}
                className={`${tool.cols} rounded-xl border border-[#2d3f60] bg-[#1a2035] overflow-hidden scroll-mt-6`}
              >
                <div className="flex items-center gap-2 px-4 py-2 border-b border-[#2d3f60] bg-[#131d30]">
                  <Icon size={13} className="shrink-0 text-[#5CFF90]" />
                  <span className="text-[11px] font-mono text-[#a0aec0]">{tool.label}</span>
                </div>
                {tool.component}
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}
