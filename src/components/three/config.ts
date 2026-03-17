export interface SceneConfig {
  /** Main neon color */
  primaryColor: string;
  /** Secondary glow color */
  secondaryColor: string;
  /** Animation speed multiplier (0.0 – 2.0) */
  intensity: number;
  /** Element count multiplier (0.0 – 2.0) */
  density: number;
  /** Reduce geometry & effects for weaker GPUs */
  lowDetail: boolean;
}

export const defaultConfig: SceneConfig = {
  primaryColor: "#22c55e",
  secondaryColor: "#4ade80",
  intensity: 1,
  density: 1,
  lowDetail: false,
};

/* ── Geometry helpers ── */

/** Distribute N points on a sphere shell */
export function pointsOnSphere(n: number, radius: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    pts.push([Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius]);
  }
  return pts;
}

/** Build edges between nearby points (< maxDist) */
export function buildEdges(
  pts: [number, number, number][],
  maxDist: number
): [number, number][] {
  const edges: [number, number][] = [];
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i][0] - pts[j][0];
      const dy = pts[i][1] - pts[j][1];
      const dz = pts[i][2] - pts[j][2];
      if (Math.sqrt(dx * dx + dy * dy + dz * dz) < maxDist) {
        edges.push([i, j]);
      }
    }
  }
  return edges;
}
