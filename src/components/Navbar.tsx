'use client';

import { useState, useEffect } from 'react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#030014]/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gradient">
            ZIBEN
          </div>

          <ul className="hidden md:flex space-x-8">
            <li>
              <a
                href="#workwear"
                className="text-white/80 hover:text-white transition-colors"
              >
                작업복
              </a>
            </li>
            <li>
              <a
                href="#safety-shoes"
                className="text-white/80 hover:text-white transition-colors"
              >
                안전화
              </a>
            </li>
            <li>
              <a
                href="#approach"
                className="text-white/80 hover:text-white transition-colors"
              >
                강점
              </a>
            </li>
            <li>
              <a
                href="#pricing"
                className="text-white/80 hover:text-white transition-colors"
              >
                가격
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-white/80 hover:text-white transition-colors"
              >
                문의
              </a>
            </li>
          </ul>

          <a href="#contact" className="px-6 py-2 bg-gradient-to-r from-primary to-secondary rounded-full text-white font-medium hover:opacity-90 transition-opacity">
            대량 구매 문의
          </a>
        </div>
      </div>
    </nav>
  );
}
