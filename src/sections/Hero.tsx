"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

const roles = [
  "developer",
  "builder",
  "experimental creator",
  "problem solver",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1));
      }, 80);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length - 1));
      }, 40);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Glow orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-codato-neon/5 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-codato-neon/3 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000" />

      {/* 3D Scene – full bleed behind everything */}
      <div className="absolute inset-0 z-0">
        <HeroScene className="w-full h-full" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-16">
        <div className="max-w-2xl fade-in-up">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-codato-neon animate-pulse" />
            <span className="text-codato-neon text-sm font-mono tracking-wider uppercase">
              Available for work
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-text-primary leading-[0.95] tracking-tight mb-6">
            André
            <br />
            <span className="text-codato-neon">Codato</span>
          </h1>

          <div className="h-8 mb-8">
            <span className="text-xl md:text-2xl text-text-secondary font-mono">
              {">"} {displayed}
              <span className="inline-block w-[2px] h-5 bg-codato-neon ml-1 animate-blink align-middle" />
            </span>
          </div>

          <p className="text-text-secondary text-lg max-w-xl leading-relaxed mb-10">
            Projects, experiments and controlled chaos.
          </p>

          <div className="flex gap-4 flex-wrap">
            <a
              href="#projetos"
              className="px-6 py-3 bg-codato-neon text-bg font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(92,255,157,0.3)] transition-all duration-300 hover:-translate-y-0.5"
            >
              Ver projetos
            </a>
            <a
              href="#sobre"
              className="px-6 py-3 border border-card text-text-primary rounded-lg hover:border-codato-neon/40 transition-all duration-300 hover:-translate-y-0.5"
            >
              Sobre mim
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-slow">
        <span className="text-text-secondary text-xs tracking-widest uppercase">scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-text-secondary to-transparent" />
      </div>
    </section>
  );
}
