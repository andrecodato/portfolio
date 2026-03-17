"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { type SceneConfig, pointsOnSphere, buildEdges } from "./config";

/* ─────────────────────────────────────────────
   NetworkNodes – small sphere dots at each node
   ───────────────────────────────────────────── */
function NetworkNodes({
  positions,
  color,
  time,
}: {
  positions: [number, number, number][];
  color: string;
  time: React.MutableRefObject<number>;
}) {
  const ref = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    positions.forEach((p, i) => {
      const pulse = 0.6 + 0.4 * Math.sin(time.current * 0.8 + i * 1.7);
      const scale = 0.025 * pulse;
      dummy.position.set(p[0], p[1], p[2]);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, positions.length]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color={color} transparent opacity={0.7} />
    </instancedMesh>
  );
}

/* ─────────────────────────────────────────────
   NetworkEdges – thin lines connecting nodes
   ───────────────────────────────────────────── */
function NetworkEdges({
  positions,
  edges,
  color,
  time,
}: {
  positions: [number, number, number][];
  edges: [number, number][];
  color: string;
  time: React.MutableRefObject<number>;
}) {
  const ref = useRef<THREE.LineSegments>(null!);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const verts = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], i) => {
      verts[i * 6] = positions[a][0];
      verts[i * 6 + 1] = positions[a][1];
      verts[i * 6 + 2] = positions[a][2];
      verts[i * 6 + 3] = positions[b][0];
      verts[i * 6 + 4] = positions[b][1];
      verts[i * 6 + 5] = positions[b][2];
    });
    geo.setAttribute("position", new THREE.BufferAttribute(verts, 3));
    return geo;
  }, [positions, edges]);

  useFrame(() => {
    if (ref.current) {
      const mat = ref.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.12 + 0.06 * Math.sin(time.current * 0.5);
    }
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0.15} />
    </lineSegments>
  );
}

/* ─────────────────────────────────────────────
   Pulse – a glowing sphere traveling along an edge
   ───────────────────────────────────────────── */
function Pulse({
  from,
  to,
  color,
  delay,
  speed,
  time,
}: {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
  delay: number;
  speed: number;
  time: React.MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    const t = ((time.current * speed + delay) % 4) / 4; // 0..1 with pause
    const progress = Math.min(t * 1.5, 1); // move in 66% of cycle, rest is pause
    ref.current.position.lerpVectors(
      new THREE.Vector3(...from),
      new THREE.Vector3(...to),
      progress
    );
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = progress < 1 ? 0.8 * Math.sin(progress * Math.PI) : 0;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.02, 6, 6]} />
      <meshBasicMaterial color={color} transparent opacity={0} />
    </mesh>
  );
}

/* ─────────────────────────────────────────────
   WireTriangles – floating wireframe triangles
   ───────────────────────────────────────────── */
function WireTriangles({
  count,
  spread,
  color,
  time,
}: {
  count: number;
  spread: number;
  color: string;
  time: React.MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Group>(null!);

  const triangles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      pos: [
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread * 0.6,
      ] as [number, number, number],
      rot: Math.random() * Math.PI * 2,
      size: 0.08 + Math.random() * 0.15,
      speed: 0.1 + Math.random() * 0.3,
      phase: i * 1.3,
    }));
  }, [count, spread]);

  useFrame(() => {
    ref.current.children.forEach((child, i) => {
      const tri = triangles[i];
      child.rotation.z = tri.rot + time.current * tri.speed * 0.3;
      child.rotation.x = time.current * tri.speed * 0.15;
      child.position.y = tri.pos[1] + Math.sin(time.current * 0.4 + tri.phase) * 0.05;
      const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
      mat.opacity = 0.08 + 0.07 * Math.sin(time.current * 0.6 + tri.phase);
    });
  });

  return (
    <group ref={ref}>
      {triangles.map((tri, i) => (
        <mesh key={i} position={tri.pos}>
          <ringGeometry args={[tri.size * 0.9, tri.size, 3]} />
          <meshBasicMaterial
            color={color}
            wireframe
            transparent
            opacity={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ─────────────────────────────────────────────
   GridPlane – very subtle floating grid
   ───────────────────────────────────────────── */
function GridPlane({
  color,
  time,
}: {
  color: string;
  time: React.MutableRefObject<number>;
}) {
  const ref = useRef<THREE.GridHelper>(null!);

  useFrame(() => {
    ref.current.rotation.x = Math.PI / 2;
    ref.current.position.z = -1.2;
    ref.current.material.opacity = 0.03 + 0.015 * Math.sin(time.current * 0.3);
  });

  return (
    <gridHelper
      ref={ref}
      args={[4, 16, color, color]}
      material-transparent
      material-opacity={0.04}
    />
  );
}

/* ═════════════════════════════════════════════
   GeometricNetwork – main composition
   ═════════════════════════════════════════════ */
export default function GeometricNetwork({ config }: { config: SceneConfig }) {
  const groupRef = useRef<THREE.Group>(null!);
  const time = useRef(0);

  const nodeCount = Math.round(36 * config.density);
  const triCount = Math.round(8 * config.density);
  const maxEdgeDist = 0.95;

  const { positions, edges, pulseEdges } = useMemo(() => {
    const pts = pointsOnSphere(config.lowDetail ? 20 : nodeCount, 1.1);
    const edg = buildEdges(pts, maxEdgeDist);
    // Pick ~12% of edges for pulses
    const pulseCount = Math.max(3, Math.floor(edg.length * 0.12));
    const shuffled = [...edg].sort(() => Math.random() - 0.5);
    return { positions: pts, edges: edg, pulseEdges: shuffled.slice(0, pulseCount) };
  }, [nodeCount, config.lowDetail]);

  useFrame((_, delta) => {
    time.current += delta * config.intensity;
    if (groupRef.current) {
      groupRef.current.rotation.y = time.current * 0.06;
      groupRef.current.rotation.x = Math.sin(time.current * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Core network */}
      <NetworkNodes positions={positions} color={config.primaryColor} time={time} />
      <NetworkEdges positions={positions} edges={edges} color={config.primaryColor} time={time} />

      {/* Pulses traveling along edges */}
      {pulseEdges.map(([a, b], i) => (
        <Pulse
          key={i}
          from={positions[a]}
          to={positions[b]}
          color={config.secondaryColor}
          delay={i * 1.2}
          speed={0.3 * config.intensity}
          time={time}
        />
      ))}

      {/* Floating wireframe triangles */}
      <WireTriangles
        count={config.lowDetail ? 3 : triCount}
        spread={3}
        color={config.primaryColor}
        time={time}
      />

      {/* Subtle background grid */}
      {!config.lowDetail && <GridPlane color={config.primaryColor} time={time} />}

      {/* Secondary smaller cluster – offset for depth */}
      <group position={[-0.8, 0.6, -0.5]} scale={0.35}>
        <NetworkNodes
          positions={pointsOnSphere(config.lowDetail ? 6 : 10, 1)}
          color={config.secondaryColor}
          time={time}
        />
        <NetworkEdges
          positions={pointsOnSphere(config.lowDetail ? 6 : 10, 1)}
          edges={buildEdges(pointsOnSphere(config.lowDetail ? 6 : 10, 1), 1.2)}
          color={config.secondaryColor}
          time={time}
        />
      </group>

      {/* Tertiary cluster – other side */}
      <group position={[0.6, -0.7, -0.3]} scale={0.25}>
        <NetworkNodes
          positions={pointsOnSphere(config.lowDetail ? 5 : 8, 1)}
          color={config.primaryColor}
          time={time}
        />
        <NetworkEdges
          positions={pointsOnSphere(config.lowDetail ? 5 : 8, 1)}
          edges={buildEdges(pointsOnSphere(config.lowDetail ? 5 : 8, 1), 1.4)}
          color={config.primaryColor}
          time={time}
        />
      </group>
    </group>
  );
}
