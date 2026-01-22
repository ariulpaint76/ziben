'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import {
  ShoppingCart,
  Heart,
  Star,
  Truck,
  Shield,
  RefreshCw,
  Minus,
  Plus,
  CreditCard,
} from 'lucide-react';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';

const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || 'test_ck_LlDJaYngroeD2jWGe0Qn3ezGdRpX';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  imageUrl: string;
  thumbnails: string[];
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;
  const { user, userData } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = await getDoc(doc(db, 'products', productId));
        if (productDoc.exists()) {
          setProduct({ id: productDoc.id, ...productDoc.data() } as Product);
        } else {
          console.error('상품을 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('상품 데이터 가져오기 오류:', error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleBuyNow = async () => {
    if (!selectedSize || !selectedColor) {
      alert('사이즈와 색상을 선택해주세요.');
      return;
    }

    setIsProcessing(true);

    try {
      // Toss Payments 초기화
      const tossPayments = await loadTossPayments(clientKey);

      // 주문 번호 생성
      const orderId = `ORDER-${Date.now()}`;
      const orderName = `${product.name} ${selectedSize} ${selectedColor}${quantity > 1 ? ` 외 ${quantity - 1}건` : ''}`;
      const amount = product.price * quantity;

      // 고객 키 생성 (로그인한 사용자가 있으면 사용자 ID, 없으면 임시 ID)
      const customerKey = user ? `customer-${user.uid}` : `guest-${Date.now()}`;

      // 결제 객체 생성
      const payment = tossPayments.payment({ customerKey });

      // 결제 요청
      await payment.requestPayment({
        method: 'CARD', // 카드 결제
        amount: {
          currency: 'KRW',
          value: amount,
        },
        orderId: orderId,
        orderName: orderName,
        successUrl: `${window.location.origin}/payment/success?userId=${user?.uid || 'guest'}`,
        failUrl: `${window.location.origin}/payment/fail`,
        customerEmail: user?.email || 'guest@example.com',
        customerName: userData?.name || '게스트',
      });
    } catch (error: any) {
      console.error('결제 오류:', error);
      if (error.code === 'USER_CANCEL') {
        alert('결제가 취소되었습니다.');
      } else {
        alert('결제 처리 중 오류가 발생했습니다.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const totalPrice = product ? product.price * quantity : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white">상품 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">상품을 찾을 수 없습니다</h1>
          <Link href="/products" className="text-primary hover:text-secondary">
            상품 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-white/60 mb-8"
          >
            <Link href="/" className="hover:text-white transition-colors">
              홈
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-white transition-colors">
              상품
            </Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800 border border-white/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShoppingCart className="w-64 h-64 text-white/10" />
                </div>
                {product.discount > 0 && (
                  <div className="absolute top-6 left-6 px-4 py-2 bg-red-500 rounded-full text-white font-bold">
                    {product.discount}% OFF
                  </div>
                )}
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="absolute top-6 right-6 p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isWishlisted ? 'text-red-500 fill-red-500' : 'text-white'
                    }`}
                  />
                </button>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-4 mt-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 border border-white/10 cursor-pointer hover:border-primary/50 transition-all"
                  />
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-semibold">
                  {product.category}
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-semibold">{product.rating}</span>
                  </div>
                  <span className="text-white/50">({product.reviews} 리뷰)</span>
                </div>
              </div>

              {/* Product Name */}
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  {product.name}
                </h1>
                <p className="text-white/60">{product.description}</p>
              </div>

              {/* Price */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                {product.originalPrice > product.price && (
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-white/40 line-through text-lg">
                      {product.originalPrice.toLocaleString()}원
                    </span>
                    <span className="text-red-500 font-bold text-lg">
                      {product.discount}% 할인
                    </span>
                  </div>
                )}
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">
                    {product.price.toLocaleString()}
                  </span>
                  <span className="text-white/50 text-xl">원</span>
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <label className="block text-white font-semibold mb-3">
                  사이즈 선택 *
                </label>
                <div className="grid grid-cols-6 gap-3">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 rounded-xl font-medium transition-all ${
                        selectedSize === size
                          ? 'bg-gradient-to-r from-primary to-secondary text-white'
                          : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-white font-semibold mb-3">
                  색상 선택 *
                </label>
                <div className="flex gap-3">
                  {product.colors.map((color: string) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-3 rounded-xl font-medium transition-all ${
                        selectedColor === color
                          ? 'bg-gradient-to-r from-primary to-secondary text-white'
                          : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-white font-semibold mb-3">
                  수량
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-white/5 rounded-xl border border-white/10">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-white/10 transition-all"
                      disabled={isProcessing}
                    >
                      <Minus className="w-5 h-5 text-white" />
                    </button>
                    <span className="px-6 text-white font-semibold">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      className="p-3 hover:bg-white/10 transition-all"
                      disabled={isProcessing}
                    >
                      <Plus className="w-5 h-5 text-white" />
                    </button>
                  </div>
                  <span className="text-white/50">
                    재고: <span className="text-primary">{product.stock}</span>개
                  </span>
                </div>
              </div>

              {/* Total Price */}
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20">
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-lg">총 상품 금액</span>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">
                      {totalPrice.toLocaleString()}
                      <span className="text-xl ml-2">원</span>
                    </div>
                    {quantity > 1 && (
                      <div className="text-sm text-white/50 mt-1">
                        ({product.price.toLocaleString()}원 × {quantity}개)
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  className="py-4 bg-white/10 border border-white/20 rounded-xl text-white font-semibold hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                  disabled={isProcessing}
                >
                  <ShoppingCart className="w-5 h-5" />
                  장바구니
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={isProcessing}
                  className="py-4 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      바로 구매
                    </>
                  )}
                </button>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                  <Truck className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-sm text-white/70">무료 배송</p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                  <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-sm text-white/70">품질 보증</p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                  <RefreshCw className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-sm text-white/70">교환/반품</p>
                </div>
              </div>

              {/* Features */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-white font-bold text-lg mb-4">주요 특징</h3>
                <ul className="space-y-2">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center gap-3 text-white/70">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
