'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, UserPlus, LogOut, LayoutDashboard, UserCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user, userData, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('로그아웃 오류:', error);
    }
  };

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
              <Link
                href="/about"
                className="text-white/80 hover:text-white transition-colors"
              >
                회사소개
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="text-white/80 hover:text-white transition-colors"
              >
                상품소개
              </Link>
            </li>
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

          <div className="flex items-center gap-4">
            {user ? (
              // 로그인된 경우
              <>
                {userData?.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="hidden md:flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    관리자
                  </Link>
                )}
                <Link
                  href="/mypage"
                  className="hidden md:flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white transition-colors"
                >
                  <UserCircle className="w-4 h-4" />
                  마이페이지
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-medium transition-all flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  로그아웃
                </button>
              </>
            ) : (
              // 로그인되지 않은 경우
              <>
                <Link
                  href="/auth/login"
                  className="hidden md:flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white transition-colors"
                >
                  <User className="w-4 h-4" />
                  로그인
                </Link>
                <Link
                  href="/auth/register"
                  className="px-6 py-2 bg-gradient-to-r from-primary to-secondary rounded-full text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
