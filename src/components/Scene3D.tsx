'use client';

import * as React from 'react';
import * as THREE from 'three';

interface Scene3DProps {
  mouseX: number;
  mouseY: number;
  scrollProgress: number;
}

export default function Scene3D({ mouseX, mouseY, scrollProgress }: Scene3DProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const sceneRef = React.useRef<THREE.Scene | null>(null);
  const rendererRef = React.useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = React.useRef<THREE.PerspectiveCamera | null>(null);
  const crystalRef = React.useRef<THREE.Mesh | null>(null);
  const debrisRefs = React.useRef<THREE.Mesh[]>([]);
  const animationIdRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 8;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xa78bfa, 0.5);
    pointLight.position.set(-5, -5, -5);
    scene.add(pointLight);

    // Central Crystal
    const crystalGeometry = new THREE.IcosahedronGeometry(1.5, 0);
    const crystalMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xa78bfa,
      transparent: true,
      opacity: 0.6,
      roughness: 0.1,
      metalness: 0.2,
      transmission: 0.9,
      thickness: 0.5,
    });
    const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
    scene.add(crystal);
    crystalRef.current = crystal;

    // Debris
    const debrisGeometry = new THREE.OctahedronGeometry(1, 0);
    for (let i = 0; i < 12; i++) {
      const debrisMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.5,
        roughness: 0.05,
        metalness: 0.3,
        transmission: 0.8,
      });
      const debris = new THREE.Mesh(debrisGeometry, debrisMaterial);

      const angle = (i / 12) * Math.PI * 2;
      debris.position.set(
        Math.sin(angle) * 3,
        Math.cos(angle * 1.4) * 3,
        Math.sin(angle * 0.6) * 3
      );
      debris.scale.setScalar(0.3 + Math.random() * 0.4);

      scene.add(debris);
      debrisRefs.current.push(debris);
    }

    // Animation
    let time = 0;
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      time += 0.01;

      if (crystalRef.current) {
        crystalRef.current.rotation.x = time * 0.1 + scrollProgress * 2;
        crystalRef.current.rotation.y = time * 0.15 + scrollProgress * 3;

        // Mouse parallax
        crystalRef.current.position.x += (mouseX * 0.5 - crystalRef.current.position.x) * 0.05;
        crystalRef.current.position.y += (mouseY * 0.5 - crystalRef.current.position.y) * 0.05;
        crystalRef.current.position.z = -scrollProgress * 5;
      }

      // Debris animation
      debrisRefs.current.forEach((debris, i) => {
        debris.rotation.x = time * (0.5 + i * 0.1);
        debris.rotation.y = time * (0.35 + i * 0.07);

        const angle = (i / 12) * Math.PI * 2;
        const explosionRadius = 1 + scrollProgress * 8;

        debris.position.x = Math.sin(angle) * 3 * explosionRadius + Math.sin(time + i) * 0.2;
        debris.position.y = Math.cos(angle * 1.4) * 3 * explosionRadius + Math.cos(time + i) * 0.2;
        debris.position.z = Math.sin(angle * 0.6) * 3 * explosionRadius + scrollProgress * 10;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;

      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      renderer.dispose();
      crystalGeometry.dispose();
      crystalMaterial.dispose();
      debrisGeometry.dispose();
    };
  }, []);

  // Update values
  React.useEffect(() => {
    // Values are updated in the animation loop
  }, [mouseX, mouseY, scrollProgress]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
