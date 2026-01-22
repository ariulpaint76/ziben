'use client';

import { useEffect, useRef, useState } from 'react';

const features = [
  {
    title: '프리미엄 품질',
    description: 'ZIBEN만의 엄격한 품질 기준',
    detail: '국내외 인증을 받은 고품질 소재만을 사용하며, 모든 제품은 출고 전 3단계 품질 검수를 거칩니다. KS, CE, ISO 인증으로 검증된 안전성을 보장합니다.',
  },
  {
    title: '현장 맞춤형 설계',
    description: '실제 작업 환경을 고려한 디자인',
    detail: '건설, 제조, 물류, 전기 등 각 산업 현장의 특성을 반영한 맞춤 설계로 작업 효율성과 안전성을 동시에 확보했습니다.',
  },
  {
    title: '대량 주문 할인',
    description: '기업 고객을 위한 특별 가격',
    detail: '50벌 이상 대량 구매 시 최대 30% 할인 혜택을 제공하며, 로고 자수 및 이름표 부착 서비스를 무료로 제공합니다.',
  },
  {
    title: '빠른 배송 시스템',
    description: '전국 당일/익일 배송 가능',
    detail: '전국 주요 도시 물류 센터 운영으로 긴급 주문도 신속하게 대응합니다. 재고 보유 제품은 당일 출고가 가능합니다.',
  },
];

export function Approach() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (!sectionRef.current || !containerRef.current) return;

    import('gsap').then((gsapModule) => {
      const gsap = gsapModule.default;

      import('gsap/ScrollTrigger').then((scrollTriggerModule) => {
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        if (!containerRef.current) return;
        const cards = containerRef.current.querySelectorAll('.approach-card');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=300%',
            scrub: 1,
            pin: true,
          },
        });

        // Initial zoom in
        tl.fromTo(
          containerRef.current,
          { scale: 0.25, opacity: 0.5 },
          { scale: 1, opacity: 1, duration: 0.5 }
        );

        // Horizontal scroll through cards
        cards.forEach((card, i) => {
          if (i === 0) {
            tl.to(card, { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.3 });
          } else {
            tl.to(cards[i - 1], {
              scale: 0.9,
              opacity: 0.2,
              filter: 'blur(8px)',
              duration: 0.2,
            });

            tl.to(
              containerRef.current,
              {
                xPercent: -100 * i,
                duration: 0.5,
                ease: 'power2.inOut',
              },
              '<'
            );

            tl.to(
              card,
              {
                scale: 1,
                opacity: 1,
                filter: 'blur(0px)',
                duration: 0.3,
              },
              '<0.2'
            );
          }
        });
      });
    });

    return () => {
      if (typeof window !== 'undefined') {
        import('gsap/ScrollTrigger').then((scrollTriggerModule) => {
          scrollTriggerModule.ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        });
      }
    };
  }, []);

  if (!isMounted) return null;

  return (
    <section id="approach" ref={sectionRef} className="relative h-screen overflow-hidden bg-[#030014] z-10">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-6xl px-6">
          <div className="mb-16 text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
              ZIBEN의 강점
            </h2>
            <p className="text-xl text-white/60">
              왜 많은 기업들이 지벤을 선택할까요?
            </p>
          </div>

          <div ref={containerRef} className="flex gap-8 transition-transform">
            {features.map((feature, index) => (
              <div
                key={index}
                className="approach-card flex-shrink-0 w-full glass-effect rounded-3xl p-12"
                style={{
                  opacity: index === 0 ? 1 : 0.2,
                  transform: `scale(${index === 0 ? 1 : 0.9})`,
                  filter: index === 0 ? 'blur(0px)' : 'blur(8px)',
                }}
              >
                <div className="text-7xl font-bold text-white/10 mb-4">
                  0{index + 1}
                </div>
                <h3 className="text-4xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-xl text-primary mb-6">
                  {feature.description}
                </p>
                <p className="text-white/60 leading-relaxed text-lg">
                  {feature.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
