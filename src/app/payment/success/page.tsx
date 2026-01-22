'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isConfirming, setIsConfirming] = useState(true);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const confirmPayment = async () => {
      const paymentKey = searchParams.get('paymentKey');
      const orderId = searchParams.get('orderId');
      const amount = searchParams.get('amount');
      const userId = searchParams.get('userId');

      if (!paymentKey || !orderId || !amount) {
        setError('결제 정보가 올바르지 않습니다.');
        setIsConfirming(false);
        return;
      }

      try {
        // 결제 승인 API 호출
        const response = await fetch('/api/payment/confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentKey,
            orderId,
            amount: Number(amount),
            userId: userId || null,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || '결제 승인에 실패했습니다.');
        }

        setPaymentData(data);
      } catch (err: any) {
        console.error('결제 승인 오류:', err);
        setError(err.message || '결제 승인 중 오류가 발생했습니다.');
      } finally {
        setIsConfirming(false);
      }
    };

    confirmPayment();
  }, [searchParams]);

  if (isConfirming) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#030014] via-[#0a0a2e] to-[#030014] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">결제를 확인하고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#030014] via-[#0a0a2e] to-[#030014] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 text-center"
        >
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">❌</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">결제 확인 실패</h1>
          <p className="text-white/60 mb-6">{error}</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold hover:shadow-lg transition-all"
          >
            홈으로 돌아가기
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030014] via-[#0a0a2e] to-[#030014] flex items-center justify-center px-6 py-20">
      {/* 배경 효과 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full relative z-10"
      >
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl">
          {/* 성공 아이콘 */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
          </motion.div>

          {/* 제목 */}
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            결제가 완료되었습니다!
          </h1>
          <p className="text-white/60 text-center mb-8">
            주문해 주셔서 감사합니다. 주문 내역은 이메일로 발송되었습니다.
          </p>

          {/* 주문 정보 */}
          {paymentData && (
            <div className="bg-white/5 rounded-xl p-6 mb-6 space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-white/70">주문번호</span>
                <span className="text-white font-semibold">{paymentData.orderId}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-white/70">주문명</span>
                <span className="text-white">{paymentData.orderName}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-white/70">결제 방법</span>
                <span className="text-white">{paymentData.method === 'CARD' ? '카드' : paymentData.method}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-lg">결제 금액</span>
                <span className="text-2xl font-bold text-gradient">
                  {paymentData.totalAmount?.toLocaleString()}원
                </span>
              </div>
            </div>
          )}

          {/* 안내 메시지 */}
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-8">
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h3 className="text-white font-semibold mb-1">배송 안내</h3>
                <p className="text-white/70 text-sm">
                  주문하신 상품은 영업일 기준 2-3일 내에 배송됩니다.
                  <br />
                  배송 조회는 마이페이지에서 확인하실 수 있습니다.
                </p>
              </div>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/mypage"
              className="py-4 bg-white/10 border border-white/20 rounded-xl text-white font-semibold hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Package className="w-5 h-5" />
              주문 내역 보기
            </Link>
            <Link
              href="/"
              className="py-4 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              홈으로 가기
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
