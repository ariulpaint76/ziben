'use client';

import { motion } from 'framer-motion';
import { Shirt, Shield, Flame, Zap, HardHat, Droplets } from 'lucide-react';

const workwearProducts = [
  {
    icon: Shirt,
    title: '산업용 작업복',
    description: '내구성이 뛰어난 고강도 원단',
    features: ['면 혼방 소재', '활동성 극대화', '다중 포켓'],
    color: '#a78bfa',
  },
  {
    icon: Shield,
    title: '안전 작업복',
    description: '국제 안전 규격 충족',
    features: ['고시인성 원단', '야간 반사 테이프', 'CE 인증'],
    color: '#3b82f6',
  },
  {
    icon: Flame,
    title: '방염 작업복',
    description: '고온 환경 특수 처리',
    features: ['방염 인증', '내열 소재', '용접 작업용'],
    color: '#ef4444',
  },
  {
    icon: Zap,
    title: '정전기 방지복',
    description: '전자 부품 취급용 ESD',
    features: ['정전기 차단', '도전사 사용', '클린룸 대응'],
    color: '#22c55e',
  },
  {
    icon: Droplets,
    title: '방수 작업복',
    description: '우천 야외 작업용',
    features: ['방수 코팅', '통기성 확보', '경량 소재'],
    color: '#06b6d4',
  },
  {
    icon: HardHat,
    title: '건설 작업복',
    description: '건설 현장 전용',
    features: ['고강도 내구성', '안전 포켓', '무릎 보강'],
    color: '#f59e0b',
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

export function Workwear() {
  return (
    <section id="workwear" className="relative py-32 px-6 bg-[#030014] z-10">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
            작업복 라인업
          </h2>
          <p className="text-xl text-white/60">
            현장별 맞춤 작업복으로 안전과 편안함을 제공합니다
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {workwearProducts.map((product, index) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={index}
                variants={item}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
                className="glass-effect rounded-2xl p-8 group cursor-pointer hover:border-indigo-500 transition-all"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${product.color}40, ${product.color}20)`,
                  }}
                >
                  <Icon size={32} color={product.color} />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">
                  {product.title}
                </h3>
                <p className="text-white/60 mb-4">
                  {product.description}
                </p>
                <ul className="space-y-2">
                  {product.features.map((feature, i) => (
                    <li key={i} className="text-white/50 text-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: product.color }} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="mt-6 w-full py-3 bg-white/5 hover:bg-white/10 rounded-lg text-white font-medium transition-all border border-white/10 hover:border-white/20">
                  상세보기
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
