'use client';

import { useRef, useState, MouseEvent } from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: '베이직',
    price: '50,000',
    unit: '/ 벌',
    features: [
      '기본 소재 작업복',
      '5종 사이즈 선택',
      '단색 컬러',
      '기본 포켓 구성',
      '1개월 AS 보증',
    ],
  },
  {
    name: '프로페셔널',
    price: '120,000',
    unit: '/ 벌',
    featured: true,
    features: [
      '프리미엄 소재 작업복',
      '전 사이즈 맞춤 제작',
      '다양한 컬러 선택',
      '다중 포켓 시스템',
      '로고 자수 포함',
      '6개월 AS 보증',
    ],
  },
  {
    name: '엔터프라이즈',
    price: '견적 문의',
    unit: '',
    features: [
      '최고급 특수 소재',
      '완전 맞춤 제작',
      '기업 전용 디자인',
      '특수 기능 추가 가능',
      '대량 주문 할인',
      '1년 AS 보증',
      '전담 CS 지원',
    ],
  },
];

function PricingCard({ plan }: { plan: typeof plans[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glareStyle, setGlareStyle] = useState({});

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -20;
    const rotateY = ((x - centerX) / centerX) * 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

    // Glare effect (opposite direction)
    const glareX = ((x - centerX) / centerX) * -50 + 50;
    const glareY = ((y - centerY) / centerY) * -50 + 50;

    setGlareStyle({
      background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;

    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    setGlareStyle({});
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative glass-effect rounded-3xl p-8 transition-all duration-300 ${
        plan.featured ? 'border-2 border-primary glow' : ''
      }`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Glare overlay */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={glareStyle}
      />

      {/* Content */}
      <div className="relative z-10">
        {plan.featured && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-secondary rounded-full text-sm font-bold">
            인기
          </div>
        )}

        <h3 className="text-3xl font-bold text-white mb-2">{plan.name}</h3>
        <div className="mb-6">
          <span className="text-5xl font-bold text-gradient">{plan.price}</span>
          {plan.unit && <span className="text-white/60 ml-2">{plan.unit}</span>}
        </div>

        <ul className="space-y-4 mb-8">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <Check size={20} className="text-primary flex-shrink-0 mt-1" />
              <span className="text-white/80">{feature}</span>
            </li>
          ))}
        </ul>

        <button
          className={`w-full py-4 rounded-xl font-bold transition-all ${
            plan.featured
              ? 'bg-gradient-to-r from-primary to-secondary text-white hover:scale-105'
              : 'glass-effect text-white hover:border-primary'
          }`}
        >
          {plan.name === '엔터프라이즈' ? '문의하기' : '구매하기'}
        </button>
      </div>
    </div>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="relative py-32 px-6 bg-[#030014] z-10">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
            가격 안내
          </h2>
          <p className="text-xl text-white/60">
            다양한 요구사항에 맞는 플랜을 선택하세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
