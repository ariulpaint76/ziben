'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';

function PaymentFailContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const message = searchParams.get('message');

  const getErrorMessage = (code: string | null) => {
    switch (code) {
      case 'USER_CANCEL':
        return '사용자가 결제를 취소했습니다.';
      case 'INVALID_CARD_NUMBER':
        return '잘못된 카드번호입니다.';
      case 'INVALID_EXPIRY':
        return '유효기간이 만료된 카드입니다.';
      case 'INVALID_CARD_PASSWORD':
        return '카드 비밀번호가 올바르지 않습니다.';
      case 'EXCEED_MAX_DAILY_PAYMENT_COUNT':
        return '일일 결제 한도를 초과했습니다.';
      case 'COMMON_ERROR':
        return '결제 처리 중 오류가 발생했습니다.';
      default:
        return message || '알 수 없는 오류가 발생했습니다.';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030014] via-[#0a0a2e] to-[#030014] flex items-center justify-center px-6 py-20">
      {/* 배경 효과 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl text-center">
          {/* 실패 아이콘 */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
              <XCircle className="w-16 h-16 text-white" />
            </div>
          </motion.div>

          {/* 제목 */}
          <h1 className="text-3xl font-bold text-white mb-4">
            결제에 실패했습니다
          </h1>

          {/* 오류 메시지 */}
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-8">
            <p className="text-white/80">
              {getErrorMessage(code)}
            </p>
            {code && (
              <p className="text-white/50 text-sm mt-2">
                오류 코드: {code}
              </p>
            )}
          </div>

          {/* 안내 메시지 */}
          <p className="text-white/60 mb-8">
            문제가 계속되면 고객센터로 문의해 주세요.
            <br />
            <a href="tel:1588-0000" className="text-primary hover:text-secondary transition-colors">
              1588-0000
            </a>
          </p>

          {/* 액션 버튼 */}
          <div className="space-y-3">
            <button
              onClick={() => window.history.back()}
              className="w-full py-4 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              다시 시도하기
            </button>
            <Link
              href="/"
              className="w-full py-4 bg-white/10 border border-white/20 rounded-xl text-white font-semibold hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function PaymentFailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-[#030014] via-[#0a0a2e] to-[#030014] flex items-center justify-center px-6">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white text-lg">로딩 중...</p>
          </div>
        </div>
      }
    >
      <PaymentFailContent />
    </Suspense>
  );
}
