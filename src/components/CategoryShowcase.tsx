'use client';

import { motion } from 'framer-motion';

const categories = [
  {
    title: '춘하복',
    season: 'Spring & Summer',
    description: '통기성과 쾌적함을 중시한 계절용 작업복',
    features: ['경량 소재', '흡습속건', 'UV 차단'],
    gradient: 'from-sky-400 to-blue-500',
  },
  {
    title: '추동복',
    season: 'Fall & Winter',
    description: '보온성과 활동성을 겸비한 동계용 작업복',
    features: ['보온 충전재', '방풍 기능', '신축성 원단'],
    gradient: 'from-orange-400 to-red-500',
  },
  {
    title: '안전화',
    season: 'Safety Shoes',
    description: '발을 보호하는 프리미엄 안전화 라인',
    features: ['Steel Toe', '미끄럼방지', '충격흡수'],
    gradient: 'from-gray-700 to-gray-900',
  },
  {
    title: '안전용품',
    season: 'Safety Items',
    description: '작업 현장 필수 안전 보호장비',
    features: ['헬멧/장갑', '보안경', '안전벨트'],
    gradient: 'from-yellow-400 to-orange-500',
  },
];

export function CategoryShowcase() {
  return (
    <section className="relative py-32 px-6 bg-[#030014]">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            PRODUCT LINEUP
          </h2>
          <p className="text-xl text-white/60">
            계절과 현장에 맞는 완벽한 솔루션
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-3xl h-96 cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90 group-hover:opacity-100 transition-opacity`} />

              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

              <div className="relative h-full p-10 flex flex-col justify-between">
                <div>
                  <p className="text-white/80 text-sm uppercase tracking-wider mb-2">
                    {category.season}
                  </p>
                  <h3 className="text-5xl font-bold text-white mb-4">
                    {category.title}
                  </h3>
                  <p className="text-white/90 text-lg mb-6">
                    {category.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {category.features.map((feature, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-all group-hover:scale-105">
                    제품 보기
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
