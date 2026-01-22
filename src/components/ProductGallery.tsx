'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    title: '2025 NEW COLLECTION',
    subtitle: '작업복의 새로운 기준',
    description: '현장에서 검증된 내구성과 세련된 디자인의 만남',
    image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    title: 'SAFETY FIRST',
    subtitle: '안전을 최우선으로',
    description: 'KS, CE 인증을 통과한 프리미엄 안전화',
    image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    title: 'PROFESSIONAL WORKWEAR',
    subtitle: '전문가를 위한 선택',
    description: '산업 현장 맞춤형 고기능성 작업복',
    image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
];

export function ProductGallery() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen overflow-hidden bg-[#030014]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
          style={{ background: slides[currentSlide].image }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative h-full flex items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-white/80 text-lg mb-4 tracking-wider">
                {slides[currentSlide].subtitle}
              </p>
              <h2 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
                {slides[currentSlide].title}
              </h2>
              <p className="text-2xl text-white/90 mb-8">
                {slides[currentSlide].description}
              </p>
              <button className="px-12 py-4 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-all text-lg">
                자세히 보기
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all z-10"
      >
        <ChevronLeft className="text-white" size={28} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all z-10"
      >
        <ChevronRight className="text-white" size={28} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 rounded-full transition-all ${
              index === currentSlide ? 'w-12 bg-white' : 'w-8 bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
