'use client';

import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      company: formData.get('company'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message')
    };

    try {
      await fetch('https://script.google.com/macros/s/AKfycbyWQ97fyvNIT3CGjCDo_Wmo_1ZZoS9fHqSsrIaXnwwLOUsl7Kxo2YIPil3hfNvUDcza/exec', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors' // Required for Google Apps Script
      });

      // With no-cors mode, we can't read response, so assume success
      setIsSuccess(true);
      form.reset();

      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Form submission error:', error);
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-32 px-6 bg-[#030014] z-10">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
            문의하기
          </h2>
          <p className="text-xl text-white/60">
            맞춤 작업복 제작을 위한 상담을 시작하세요
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass-effect rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                연락처 정보
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-white/60 text-sm mb-1">고객센터</div>
                    <div className="text-white font-medium">1588-XXXX</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-secondary" />
                  </div>
                  <div>
                    <div className="text-white/60 text-sm mb-1">이메일</div>
                    <div className="text-white font-medium">sales@ziben.co.kr</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-white/60 text-sm mb-1">본사</div>
                    <div className="text-white font-medium">
                      서울특별시 강남구
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-effect rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">
                운영 시간
              </h3>
              <div className="space-y-2 text-white/70">
                <div className="flex justify-between">
                  <span>평일</span>
                  <span className="text-white">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>토요일</span>
                  <span className="text-white">09:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span>일요일 / 공휴일</span>
                  <span className="text-white/50">휴무</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-effect rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">
                  이름 *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-indigo-500 focus:bg-white/10 focus:outline-none transition-all"
                  placeholder="홍길동"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">
                  회사명
                </label>
                <input
                  type="text"
                  name="company"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-indigo-500 focus:bg-white/10 focus:outline-none transition-all"
                  placeholder="회사명을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">
                  이메일 *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-indigo-500 focus:bg-white/10 focus:outline-none transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">
                  전화번호 *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-indigo-500 focus:bg-white/10 focus:outline-none transition-all"
                  placeholder="010-0000-0000"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">
                  문의 내용 *
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-indigo-500 focus:bg-white/10 focus:outline-none transition-all resize-none"
                  placeholder="문의하실 내용을 입력해주세요"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="w-full py-4 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>처리 중...</>
                ) : isSuccess ? (
                  <>전송 완료!</>
                ) : (
                  <>
                    <Send size={20} />
                    문의하기
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
