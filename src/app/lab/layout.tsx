'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
import { QrCode, MessageSquare, FileText, Headphones } from "lucide-react";

const sidebarLinks = [
  { id: "qrcode", label: "QR Code", icon: QrCode, href: "/lab", anchor: "#qrcode" },
  { id: "xat", label: "xat.chat", icon: MessageSquare, href: "/lab", anchor: "#xat" },
  { id: "blog-generator", label: "Blog Generator", icon: FileText, href: "/lab", anchor: "#blog-generator" },
  { id: "spotify", label: "Spotify", icon: Headphones, href: "/lab/spotify", anchor: null },
];

export default function LabLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSpotify = pathname === "/lab/spotify";

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

      {/* Mobile nav */}
      <nav className="flex lg:hidden gap-2 overflow-x-auto pb-3 mb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {sidebarLinks.map(({ id, label, icon: Icon, href, anchor }) => {
          const isPage = anchor === null;
          const isActive = isPage ? pathname === href : !isSpotify;
          const target = isPage ? href : `${href}${anchor}`;
          return (
            <Link
              key={id}
              href={target}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg shrink-0 text-xs font-mono border transition-all duration-150 active:scale-95 ${
                isActive
                  ? "text-[#5CFF90] border-[#5CFF90]/40 bg-[#1a2035]"
                  : "text-[#a0aec0] border-[#2d3f60] bg-[#1a2035] hover:text-[#5CFF90] hover:border-[#5CFF90]/40"
              }`}
            >
              <Icon size={13} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="flex gap-6 items-start">
        {/* Sidebar — lg+ */}
        <aside className="hidden lg:flex sticky top-24 shrink-0 w-48 flex-col gap-1">
          <p className="text-[13px] font-mono text-[#a0aec0] uppercase tracking-widest mb-2 px-1">
            <u style={{ textDecorationColor: "#5CFF90" }}>Ferramentas</u>
          </p>
          {sidebarLinks.map(({ id, label, icon: Icon, href, anchor }) => {
            const isPage = anchor === null;
            const isActive = isPage ? pathname === href : !isSpotify;
            const target = isPage ? href : `${href}${anchor}`;
            return (
              <Link
                key={id}
                href={target}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left w-full text-sm border transition-all duration-150 group ${
                  isActive && isPage
                    ? "text-[#5CFF90] border-[#5CFF90]/20 bg-[#1a2035]"
                    : "text-[#a0aec0] border-transparent hover:bg-[#1a2035] hover:text-[#5CFF90] hover:border-[#2d3f60]"
                }`}
              >
                <Icon size={15} className={`shrink-0 ${isActive && isPage ? "text-[#5CFF90]" : "group-hover:text-[#5CFF90]"}`} />
                <span className="font-mono">{label}</span>
              </Link>
            );
          })}
        </aside>

        {/* Content area */}
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </div>
    </main>
  );
}
