'use client';

import { motion } from 'framer-motion';
import { Footprints, Zap, Droplets, Mountain, Factory, Wrench } from 'lucide-react';

const safetyShoes = [
  {
    icon: Footprints,
    title: '안전화 (Steel Toe)',
    description: '강철 선심 보호',
    features: ['200J 충격 방어', '15kN 압박 방어', 'KS 인증'],
    color: '#a78bfa',
    price: '65,000원~',
  },
  {
    icon: Zap,
    title: '절연 안전화',
    description: '전기 작업 전용',
    features: ['18,000V 절연', '정전기 방지', '전기공사 필수'],
    color: '#f59e0b',
    price: '95,000원~',
  },
  {
    icon: Droplets,
    title: '방수 안전화',
    description: '우천 야외 작업용',
    features: ['방수 처리', '미끄럼 방지', '투습성 유지'],
    color: '#06b6d4',
    price: '75,000원~',
  },
  {
    icon: Mountain,
    title: '등산화형 안전화',
    description: '야외 건설 현장',
    features: ['발목 보호', '굽힘 방지', '고무창 내구성'],
    color: '#22c55e',
    price: '89,000원~',
  },
  {
    icon: Factory,
    title: '경량 안전화',
    description: '실내 작업장 최적',
    features: ['경량 소재', '통기성 우수', '장시간 착용'],
    color: '#3b82f6',
    price: '59,000원~',
  },
  {
    icon: Wrench,
    title: '용접용 안전화',
    description: '고온 작업 특화',
    features: ['내열 가죽', '불티 차단', '발등 보호'],
    color: '#ef4444',
    price: '98,000원~',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 50, rotateX: -10 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: 'spring',
      stiffness: 50,
    },
  },
};

export function SafetyShoes() {
  return (
    <section id="safety-shoes" className="relative py-32 px-6 bg-[#030014] z-10">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
            안전화 라인업
          </h2>
          <p className="text-xl text-white/60">
            작업 환경별 최적화된 프리미엄 안전화
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {safetyShoes.map((shoe, index) => {
            const Icon = shoe.icon;
            return (
              <motion.div
                key={index}
                variants={item}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
                className="glass-effect rounded-2xl p-8 group cursor-pointer hover:border-indigo-500 transition-all relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 text-xs font-bold text-white/40">
                  {shoe.price}
                </div>
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${shoe.color}40, ${shoe.color}20)`,
                  }}
                >
                  <Icon size={32} color={shoe.color} />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">
                  {shoe.title}
                </h3>
                <p className="text-white/60 mb-4">
                  {shoe.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {shoe.features.map((feature, i) => (
                    <li key={i} className="text-white/50 text-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: shoe.color }} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 bg-gradient-to-r from-primary to-secondary rounded-lg text-white font-medium transition-all hover:scale-105">
                  구매 문의
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
