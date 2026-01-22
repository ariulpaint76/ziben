'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

export function InteractiveScene({
  mouseX = 0,
  mouseY = 0,
  scrollProgress = 0
}: {
  mouseX?: number;
  mouseY?: number;
  scrollProgress?: number;
}) {
  const crystalRef = useRef<THREE.Mesh>(null);
  const debrisRefs = useRef<THREE.Mesh[]>([]);

  // Generate debris positions
  const debrisData = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      position: [
        Math.sin(i * 0.5) * 3,
        Math.cos(i * 0.7) * 3,
        Math.sin(i * 0.3) * 3
      ] as [number, number, number],
      scale: 0.3 + Math.random() * 0.4,
      rotationSpeed: 0.5 + Math.random() * 0.5
    }));
  }, []);

  useFrame((state) => {
    if (!crystalRef.current) return;

    const time = state.clock.getElapsedTime();

    // Central crystal rotation (idle + scroll boost)
    crystalRef.current.rotation.x = time * 0.1 + scrollProgress * 2;
    crystalRef.current.rotation.y = time * 0.15 + scrollProgress * 3;

    // Mouse parallax effect on crystal
    crystalRef.current.position.x = THREE.MathUtils.lerp(
      crystalRef.current.position.x,
      mouseX * 0.5,
      0.05
    );
    crystalRef.current.position.y = THREE.MathUtils.lerp(
      crystalRef.current.position.y,
      mouseY * 0.5,
      0.05
    );

    // Scroll: Move crystal backward
    crystalRef.current.position.z = -scrollProgress * 5;

    // Debris animation
    debrisRefs.current.forEach((debris, i) => {
      if (!debris) return;

      const data = debrisData[i];

      // Rotation
      debris.rotation.x = time * data.rotationSpeed;
      debris.rotation.y = time * data.rotationSpeed * 0.7;

      // Explosion effect on scroll
      const explosionRadius = 1 + scrollProgress * 8;
      debris.position.x = data.position[0] * explosionRadius + Math.sin(time + i) * 0.2;
      debris.position.y = data.position[1] * explosionRadius + Math.cos(time + i) * 0.2;
      debris.position.z = data.position[2] * explosionRadius + scrollProgress * 10;
    });
  });

  return (
    <>
      {/* Environment for glass reflections */}
      <Environment preset="city" />

      {/* Ambient and directional lights */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#a78bfa" />

      {/* Central Crystal */}
      <mesh ref={crystalRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.5, 0]} />
        <MeshTransmissionMaterial
          transmission={0.98}
          roughness={0.1}
          thickness={0.5}
          chromaticAberration={0.6}
          ior={1.5}
          color="#a78bfa"
        />
      </mesh>

      {/* Floating Debris */}
      {debrisData.map((data, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) debrisRefs.current[i] = el;
          }}
          position={data.position}
          scale={data.scale}
        >
          <octahedronGeometry args={[1, 0]} />
          <MeshTransmissionMaterial
            transmission={0.95}
            roughness={0.05}
            thickness={0.3}
            chromaticAberration={0.5}
            ior={1.5}
            color="#3b82f6"
          />
        </mesh>
      ))}
    </>
  );
}
