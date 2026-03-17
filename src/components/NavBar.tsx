import Link from "next/link";

const navLinks = [
  { label: "Projetos", href: "/#projetos" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Blog", href: "/blog" },
];

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-[#0a0a0a]/70 border-b border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-text-primary transition-colors duration-300"
        >
          codato<span className="text-codato-neon">.dev</span>
        </Link>

        <div className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-text-secondary hover:text-text-primary px-3.5 py-1.5 rounded-md hover:bg-white/[0.04] transition-all duration-200"
            >
              <span className="text-codato-neon font-mono mr-1">{"//"}</span>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
