'use client';

import { motion } from 'framer-motion';
import { Shield, Award, Users, Target } from 'lucide-react';

const philosophies = [
  {
    icon: Shield,
    title: 'BETTER WORKWEAR',
    description: '더 나은 작업복을 위한 끊임없는 연구',
    detail: '현장의 목소리를 듣고, 작업자의 안전과 편의를 최우선으로 생각합니다.',
  },
  {
    icon: Award,
    title: 'PROPER DESIGN',
    description: '검증된 디자인과 품질',
    detail: '국제 안전 규격을 충족하며, 실용성과 스타일을 동시에 추구합니다.',
  },
  {
    icon: Users,
    title: 'PROVEN QUALITY',
    description: '현장에서 검증된 신뢰',
    detail: '수천 개 기업의 선택으로 입증된 품질과 내구성을 제공합니다.',
  },
  {
    icon: Target,
    title: 'KOREA TO GLOBAL',
    description: '글로벌 제조 시스템',
    detail: '한국의 기술력과 인도네시아의 생산력이 결합된 최적의 제조 공정입니다.',
  },
];

export function BrandPhilosophy() {
  return (
    <section className="relative py-32 px-6 bg-white">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-black mb-6">
            WHY ZIBEN?
          </h2>
          <p className="text-xl text-black/60 max-w-2xl mx-auto">
            작업복과 안전화에 대한 ZIBEN만의 철학
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {philosophies.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="bg-black/5 hover:bg-black/10 rounded-2xl p-10 transition-all duration-300 border border-black/10 hover:border-black/20">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Icon size={32} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-black mb-3">
                        {item.title}
                      </h3>
                      <p className="text-lg text-black/70 mb-2">
                        {item.description}
                      </p>
                      <p className="text-black/50 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
