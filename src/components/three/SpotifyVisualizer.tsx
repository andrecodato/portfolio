"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const BAR_COUNT = 64;
const RADIUS = 2.8;
const BAR_WIDTH = 0.04;
const MAX_HEIGHT = 1.6;

function AudioBars({ isPlaying }: { isPlaying: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const meshRefs = useRef<THREE.Mesh[]>([]);
  const phases = useMemo(
    () => Array.from({ length: BAR_COUNT }, () => Math.random() * Math.PI * 2),
    []
  );
  const speeds = useMemo(
    () => Array.from({ length: BAR_COUNT }, () => 0.8 + Math.random() * 2.5),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const targetAmp = isPlaying ? 0.3 + 0.7 * Math.abs(Math.sin(phases[i] + t * speeds[i])) : 0.05 + 0.08 * Math.abs(Math.sin(phases[i] + t * 0.3));
      const h = THREE.MathUtils.lerp(mesh.scale.y, targetAmp * MAX_HEIGHT, 0.08);
      mesh.scale.y = h;
      mesh.position.y = h / 2;

      const mat = mesh.material as THREE.MeshStandardMaterial;
      const hue = 0.38 + 0.12 * Math.sin(phases[i] + t * 0.5);
      mat.color.setHSL(hue, 0.9, 0.45 + h * 0.2);
      mat.emissive.setHSL(hue, 1, 0.15 + h * 0.15);
    });
    if (groupRef.current) {
      groupRef.current.rotation.y += isPlaying ? 0.002 : 0.0005;
    }
  });

  const bars = useMemo(() => {
    return Array.from({ length: BAR_COUNT }, (_, i) => {
      const angle = (i / BAR_COUNT) * Math.PI * 2;
      const x = Math.cos(angle) * RADIUS;
      const z = Math.sin(angle) * RADIUS;
      return { x, z, angle };
    });
  }, []);

  return (
    <group ref={groupRef}>
      {bars.map((bar, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) meshRefs.current[i] = el;
          }}
          position={[bar.x, 0, bar.z]}
          rotation={[0, -bar.angle, 0]}
        >
          <boxGeometry args={[BAR_WIDTH, 1, BAR_WIDTH * 3]} />
          <meshStandardMaterial
            color="#1DB954"
            emissive="#1DB954"
            emissiveIntensity={0.3}
            transparent
            opacity={0.85}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

function FloatingParticles({ isPlaying }: { isPlaying: boolean }) {
  const count = 200;
  const ref = useRef<THREE.Points>(null!);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5 + Math.random() * 3;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = 0.003 + Math.random() * 0.008;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return [pos, vel];
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const posAttr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const speed = isPlaying ? 1 : 0.3;
    for (let i = 0; i < count; i++) {
      posAttr.array[i * 3] += velocities[i * 3] * speed;
      posAttr.array[i * 3 + 1] += velocities[i * 3 + 1] * speed;
      posAttr.array[i * 3 + 2] += velocities[i * 3 + 2] * speed;

      if (posAttr.array[i * 3 + 1] > 3) {
        posAttr.array[i * 3 + 1] = -3;
      }
    }
    posAttr.needsUpdate = true;

    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = 0.4 + 0.3 * Math.sin(t * 0.5);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#1DB954"
        size={0.03}
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function RingPulse({ isPlaying }: { isPlaying: boolean }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      const pulse = isPlaying
        ? 1 + 0.15 * Math.sin(t * 3)
        : 1 + 0.03 * Math.sin(t * 0.8);
      ref.current.scale.setScalar(pulse);
      ref.current.rotation.z = t * 0.1;
      const mat = ref.current.material as THREE.MeshStandardMaterial;
      mat.opacity = isPlaying ? 0.12 + 0.08 * Math.sin(t * 2) : 0.06;
    }
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[RADIUS, 0.01, 8, 128]} />
      <meshStandardMaterial
        color="#1DB954"
        emissive="#1DB954"
        emissiveIntensity={0.8}
        transparent
        opacity={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function SpotifyVisualizer({ isPlaying }: { isPlaying: boolean }) {
  return (
    <group position={[0, -0.2, 0]}>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 5, 0]} color="#1DB954" intensity={2} distance={15} />
      <pointLight position={[3, 2, 3]} color="#1ed760" intensity={1} distance={10} />
      <AudioBars isPlaying={isPlaying} />
      <FloatingParticles isPlaying={isPlaying} />
      <RingPulse isPlaying={isPlaying} />
    </group>
  );
}
