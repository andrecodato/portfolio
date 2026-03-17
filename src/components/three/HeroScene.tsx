"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import GeometricNetwork from "./GeometricNetwork";
import { type SceneConfig, defaultConfig } from "./config";

export interface HeroSceneProps {
  /** Main neon color (default: #22c55e) */
  primaryColor?: string;
  /** Secondary glow color (default: #4ade80) */
  secondaryColor?: string;
  /** Animation speed multiplier 0–2 (default: 1) */
  intensity?: number;
  /** Element density multiplier 0–2 (default: 1) */
  density?: number;
  /** Force low detail mode */
  lowDetail?: boolean;
  className?: string;
}

export default function HeroScene({
  primaryColor,
  secondaryColor,
  intensity,
  density,
  lowDetail,
  className = "",
}: HeroSceneProps) {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (!mounted) return <div className={className} />;

  const config: SceneConfig = {
    ...defaultConfig,
    ...(primaryColor && { primaryColor }),
    ...(secondaryColor && { secondaryColor }),
    intensity: reducedMotion ? 0.1 : (intensity ?? defaultConfig.intensity),
    density: density ?? defaultConfig.density,
    lowDetail: lowDetail ?? defaultConfig.lowDetail,
  };

  return (
    <div className={className}>
      <Canvas
        dpr={[1, Math.min(window.devicePixelRatio, 2)]}
        camera={{ position: [0, 0, 3], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        frameloop={reducedMotion ? "demand" : "always"}
      >
        <Suspense fallback={null}>
          <GeometricNetwork config={config} />
        </Suspense>
      </Canvas>
    </div>
  );
}
