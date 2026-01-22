'use client';

import { Hero3D } from './Hero3D';

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <Hero3D />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-7xl md:text-9xl font-bold mb-4 text-gradient tracking-tight">
            ZIBEN
          </h1>
          <p className="text-2xl md:text-3xl font-light text-white/90 mb-2">
            작업복 & 안전화
          </p>
        </div>
        <p className="text-xl md:text-2xl text-white/70 mb-10 max-w-3xl mx-auto">
          현장의 안전을 책임지는 프리미엄 작업복과 안전화<br/>
          내구성과 편안함을 동시에 제공합니다
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="#workwear" className="px-10 py-4 bg-gradient-to-r from-primary to-secondary rounded-full text-white font-bold text-lg hover:scale-105 transition-transform glow">
            작업복 보기
          </a>
          <a href="#safety-shoes" className="px-10 py-4 glass-effect rounded-full text-white font-bold text-lg hover:scale-105 transition-transform border border-white/20">
            안전화 보기
          </a>
          <a href="#contact" className="px-10 py-4 glass-effect rounded-full text-white font-bold text-lg hover:scale-105 transition-transform">
            견적 문의
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
