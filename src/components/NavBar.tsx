"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Projetos", href: "/#projetos" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Blog", href: "/blog" },
  { label: "Lab 🧪", href: "/tools" },
];

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-[#0a0a0a]/70 border-b border-white/4">
      <div className="max-w-6xl mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
        <Link
          href="/"
          onClick={handleCloseMenu}
          className="text-2xl font-bold tracking-tight text-text-primary transition-colors duration-300"
        >
          codato<span className="text-codato-neon">.dev</span>
        </Link>

        <button
          type="button"
          aria-label="Abrir menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden inline-flex flex-col justify-center items-center gap-1.5 h-10 w-10 rounded-md text-codato-neon hover:bg-white/6 transition-colors duration-200"
        >
          <span
            className={`block h-0.5 w-5 bg-current transition-transform duration-300 ${
              isMenuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-current transition-opacity duration-300 ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-current transition-transform duration-300 ${
              isMenuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-text-secondary hover:text-text-primary px-3.5 py-1.5 rounded-md hover:bg-white/4 transition-all duration-200"
            >
              <span className="text-codato-neon font-mono mr-1">{"//"}</span>
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 border-t border-white/4 ${
          isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-3 flex flex-col gap-1 bg-[#0a0a0a]/95">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={handleCloseMenu}
              className="text-sm text-text-secondary hover:text-text-primary px-3.5 py-2 rounded-md hover:bg-white/4 transition-all duration-200"
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
