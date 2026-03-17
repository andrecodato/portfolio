import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Projetos", href: "/#projetos" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Blog", href: "/blog" },
];

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-bg/60 border-b border-white/5">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image src="/logo.png" alt="Logo" width={36} height={36} className="rounded-lg" />
          <span className="text-text-primary font-bold text-lg tracking-tight group-hover:text-codato-neon transition-colors">
            codato<span className="text-codato-neon">.dev</span>
          </span>
        </Link>

        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-text-secondary hover:text-codato-neon transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-codato-neon after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
