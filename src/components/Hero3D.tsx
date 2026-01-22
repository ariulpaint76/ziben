'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';

const Scene3D = dynamic(() => import('./Scene3D'), {
  ssr: false,
  loading: () => null,
});

export function Hero3D() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = 800;
      setScrollProgress(Math.min(scrolled / maxScroll, 1));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Suspense fallback={null}>
        <Scene3D
          mouseX={mousePos.x}
          mouseY={mousePos.y}
          scrollProgress={scrollProgress}
        />
      </Suspense>
    </div>
  );
}
