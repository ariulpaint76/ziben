'use client';

import { motion } from 'framer-motion';
import { Shirt, Shield, Flame, Zap } from 'lucide-react';

const services = [
  {
    icon: Shirt,
    title: '산업용 작업복',
    description: '내구성이 뛰어난 고강도 원단으로 제작된 전문 작업복',
    color: '#a78bfa',
  },
  {
    icon: Shield,
    title: '안전복',
    description: '국제 안전 규격을 충족하는 고급 보호복',
    color: '#3b82f6',
  },
  {
    icon: Flame,
    title: '방염 작업복',
    description: '고온 작업 환경을 위한 특수 방염 처리 작업복',
    color: '#ef4444',
  },
  {
    icon: Zap,
    title: '정전기 방지복',
    description: '전자 부품 취급을 위한 ESD 작업복',
    color: '#22c55e',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

export function Services() {
  return (
    <section id="services" className="relative py-32 px-6 bg-[#030014] z-10">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
            제품 라인업
          </h2>
          <p className="text-xl text-white/60">
            다양한 산업 환경에 맞는 전문 작업복
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
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
                    background: `linear-gradient(135deg, ${service.color}40, ${service.color}20)`,
                  }}
                >
                  <Icon size={32} color={service.color} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">
                  {service.title}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
