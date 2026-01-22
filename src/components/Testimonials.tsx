'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    company: '삼성물산 건설부문',
    industry: '건설업',
    quote: '현장 작업자들의 만족도가 매우 높습니다. 내구성과 활동성이 뛰어나 장기간 착용해도 불편함이 없습니다.',
    author: '안전관리팀 김OO 차장',
    quantity: '2,500벌',
  },
  {
    company: '현대제철',
    industry: '제조업',
    quote: '방염 작업복의 품질이 우수하여 고온 작업 환경에서도 안전하게 사용하고 있습니다. 지속적으로 구매 예정입니다.',
    author: '자재구매팀 이OO 과장',
    quantity: '1,800벌',
  },
  {
    company: 'CJ대한통운',
    industry: '물류업',
    quote: '물류 센터 직원들을 위한 경량 작업복으로 최적입니다. 움직임이 편하고 세탁 후에도 형태가 유지되어 만족합니다.',
    author: '인사팀 박OO 팀장',
    quantity: '3,200벌',
  },
  {
    company: '한국전력공사',
    industry: '전기/에너지',
    quote: '절연 안전화의 성능이 뛰어나고 착용감도 좋습니다. 전기 작업 안전 기준을 완벽하게 충족합니다.',
    author: '안전보건팀 최OO 부장',
    quantity: '1,500켤레',
  },
];

export function Testimonials() {
  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-black mb-6">
            CUSTOMER VOICES
          </h2>
          <p className="text-xl text-black/60">
            ZIBEN을 선택한 기업 고객들의 실제 후기
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-shadow relative"
            >
              <Quote className="absolute top-8 right-8 text-black/10" size={64} />

              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {item.company.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-black">
                      {item.company}
                    </h3>
                    <p className="text-black/60">{item.industry}</p>
                  </div>
                </div>

                <p className="text-lg text-black/80 leading-relaxed mb-6 italic">
                  "{item.quote}"
                </p>

                <div className="flex justify-between items-center pt-6 border-t border-black/10">
                  <p className="text-black/70">
                    {item.author}
                  </p>
                  <span className="px-4 py-2 bg-black/5 rounded-full text-sm font-medium text-black/70">
                    {item.quantity} 구매
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-black/60 mb-6">
            국내 500개 이상의 기업이 ZIBEN을 신뢰합니다
          </p>
          <a href="#contact" className="inline-block px-12 py-4 bg-black text-white font-bold rounded-full hover:bg-black/90 transition-all text-lg">
            우리 회사도 시작하기
          </a>
        </motion.div>
      </div>
    </section>
  );
}
