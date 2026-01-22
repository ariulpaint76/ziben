'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Award, Users, Target, TrendingUp, Shield, Heart } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: '안전 최우선',
      description: '작업자의 안전을 최우선으로 생각하며, 모든 제품은 엄격한 안전 기준을 충족합니다.',
    },
    {
      icon: Award,
      title: '품질 보증',
      description: '최고 품질의 원단과 자재만을 사용하여 내구성과 편안함을 보장합니다.',
    },
    {
      icon: Heart,
      title: '고객 만족',
      description: '고객의 니즈를 정확히 파악하고 최상의 솔루션을 제공합니다.',
    },
    {
      icon: TrendingUp,
      title: '지속적 혁신',
      description: '끊임없는 연구개발을 통해 더 나은 제품과 서비스를 제공합니다.',
    },
  ];

  const milestones = [
    { year: '2015', title: 'ZIBEN 설립', description: '프리미엄 작업복 브랜드로 시작' },
    { year: '2017', title: '안전화 라인 출시', description: '작업복을 넘어 안전화 시장 진출' },
    { year: '2019', title: 'ISO 9001 인증', description: '품질경영시스템 국제 인증 획득' },
    { year: '2021', title: '해외 진출', description: '동남아시아 시장 진출 성공' },
    { year: '2023', title: '스마트 작업복', description: 'IoT 기술을 접목한 스마트 작업복 개발' },
    { year: '2024', title: '업계 1위', description: '국내 프리미엄 작업복 시장 점유율 1위' },
  ];

  const stats = [
    { number: '10+', label: '년간 경험' },
    { number: '50,000+', label: '만족한 고객' },
    { number: '200+', label: '제품 라인업' },
    { number: '99%', label: '고객 만족도' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              회사 <span className="text-gradient">소개</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              ZIBEN은 작업자의 안전과 편안함을 최우선으로 생각하는
              <br />
              프리미엄 작업복 및 안전화 전문 브랜드입니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                ZIBEN 이야기
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  ZIBEN은 2015년, "작업자도 프리미엄을 누릴 자격이 있다"는 신념으로 시작되었습니다.
                  우리는 단순한 작업복이 아닌, 작업자의 자존감을 높이고 안전을 보장하는
                  프리미엄 솔루션을 제공합니다.
                </p>
                <p>
                  최고 품질의 원단, 인체공학적 디자인, 그리고 엄격한 안전 기준을 통해
                  ZIBEN은 업계 최고의 브랜드로 성장했습니다. 현재 50,000명 이상의
                  작업자들이 ZIBEN 제품을 신뢰하고 있습니다.
                </p>
                <p>
                  우리는 멈추지 않습니다. IoT 기술을 접목한 스마트 작업복, 친환경 소재 개발,
                  그리고 글로벌 시장 진출을 통해 더 나은 미래를 만들어가고 있습니다.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Users className="w-64 h-64 text-primary/30" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#030014] to-[#0a0a2e]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              숫자로 보는 ZIBEN
            </h2>
            <p className="text-white/70">
              우리의 성과는 고객의 신뢰로 만들어졌습니다
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              우리의 핵심 가치
            </h2>
            <p className="text-gray-600">
              ZIBEN이 추구하는 가치입니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 hover:border-primary/50 hover:shadow-xl transition-all duration-300"
              >
                <value.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ZIBEN의 여정
            </h2>
            <p className="text-gray-600">
              우리가 걸어온 길
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary to-secondary hidden lg:block" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="inline-block bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:border-primary/50 hover:shadow-xl transition-all duration-300">
                      <div className="text-3xl font-bold text-gradient mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  <div className="hidden lg:block w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg relative z-10" />

                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
