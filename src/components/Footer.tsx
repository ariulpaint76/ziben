'use client';

import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#030014] border-t border-white/10 py-12 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-2xl font-bold text-gradient mb-4">
              ZIBEN
            </div>
            <p className="text-white/60 text-sm">
              작업복과 안전화 전문 브랜드<br/>
              현장의 안전을 책임집니다
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">작업복</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>
                <a href="#workwear" className="hover:text-white transition-colors">
                  산업용 작업복
                </a>
              </li>
              <li>
                <a href="#workwear" className="hover:text-white transition-colors">
                  안전 작업복
                </a>
              </li>
              <li>
                <a href="#workwear" className="hover:text-white transition-colors">
                  방염 작업복
                </a>
              </li>
              <li>
                <a href="#workwear" className="hover:text-white transition-colors">
                  방수 작업복
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">안전화</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>
                <a href="#safety-shoes" className="hover:text-white transition-colors">
                  Steel Toe 안전화
                </a>
              </li>
              <li>
                <a href="#safety-shoes" className="hover:text-white transition-colors">
                  절연 안전화
                </a>
              </li>
              <li>
                <a href="#safety-shoes" className="hover:text-white transition-colors">
                  방수 안전화
                </a>
              </li>
              <li>
                <a href="#safety-shoes" className="hover:text-white transition-colors">
                  등산화형 안전화
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">소셜 미디어</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-primary hover:bg-primary/20 transition-all"
              >
                <Facebook size={18} className="text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-primary hover:bg-primary/20 transition-all"
              >
                <Instagram size={18} className="text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-primary hover:bg-primary/20 transition-all"
              >
                <Twitter size={18} className="text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-primary hover:bg-primary/20 transition-all"
              >
                <Linkedin size={18} className="text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/60 text-sm">
          <p>&copy; {currentYear} ZIBEN. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://www.ziben.co.kr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              공식 홈페이지
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              대량 구매 문의
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
