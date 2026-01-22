'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {
  User,
  Mail,
  Phone,
  Building,
  Package,
  Heart,
  Settings,
  LogOut,
  ShoppingBag,
  MapPin,
} from 'lucide-react';

interface Order {
  id: string;
  orderId: string;
  orderName: string;
  totalAmount: number;
  status: string;
  approvedAt: string;
  method: string;
}

export default function MyPage() {
  const { user, userData, loading, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        // where와 orderBy를 함께 사용하면 복합 인덱스가 필요하므로
        // where만 사용하고 클라이언트에서 정렬
        const q = query(
          collection(db, 'orders'),
          where('userId', '==', user.uid)
        );

        const querySnapshot = await getDocs(q);
        const ordersData: Order[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          ordersData.push({
            id: doc.id,
            orderId: data.orderId,
            orderName: data.orderName,
            totalAmount: data.totalAmount,
            status: data.status,
            approvedAt: data.approvedAt,
            method: data.method,
          });
        });

        // 클라이언트에서 날짜순 정렬 (최신순)
        ordersData.sort((a, b) => {
          return new Date(b.approvedAt).getTime() - new Date(a.approvedAt).getTime();
        });

        setOrders(ordersData);
        console.log('주문 내역 조회 성공:', ordersData.length, '건');
      } catch (error) {
        console.error('주문 내역 가져오기 오류:', error);
        alert('주문 내역을 불러오는 중 오류가 발생했습니다. 콘솔을 확인해주세요.');
      } finally {
        setLoadingOrders(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'DONE':
        return '결제완료';
      case 'CANCELED':
        return '취소됨';
      case 'PARTIAL_CANCELED':
        return '부분취소';
      case 'ABORTED':
        return '승인실패';
      case 'EXPIRED':
        return '만료됨';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DONE':
        return 'bg-green-500/20 text-green-400';
      case 'CANCELED':
      case 'ABORTED':
      case 'EXPIRED':
        return 'bg-red-500/20 text-red-400';
      case 'PARTIAL_CANCELED':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-blue-500/20 text-blue-400';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !userData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-white mb-4">
              마이 <span className="text-gradient">페이지</span>
            </h1>
            <p className="text-white/70">회원님의 정보와 주문 내역을 관리하세요</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1 space-y-6"
            >
              {/* Profile Card */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {userData.name}
                  </h2>
                  <span className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full">
                    {userData.role === 'admin' ? '관리자' : '일반회원'}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-white/70">
                    <Mail className="w-5 h-5" />
                    <span className="text-sm">{userData.email}</span>
                  </div>
                  {userData.phone && (
                    <div className="flex items-center gap-3 text-white/70">
                      <Phone className="w-5 h-5" />
                      <span className="text-sm">{userData.phone}</span>
                    </div>
                  )}
                  {userData.company && (
                    <div className="flex items-center gap-3 text-white/70">
                      <Building className="w-5 h-5" />
                      <span className="text-sm">{userData.company}</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                  <button className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white flex items-center justify-center gap-2 transition-all">
                    <Settings className="w-5 h-5" />
                    프로필 수정
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 rounded-xl text-red-400 flex items-center justify-center gap-2 transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                    로그아웃
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                  <ShoppingBag className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white mb-1">
                    {orders.length}
                  </div>
                  <div className="text-sm text-white/60">총 주문</div>
                </div>
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                  <Heart className="w-8 h-8 text-red-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white mb-1">0</div>
                  <div className="text-sm text-white/60">찜한 상품</div>
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Order History */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">주문 내역</h2>
                </div>

                {loadingOrders ? (
                  <div className="text-center py-12">
                    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-white/60">주문 내역을 불러오는 중...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-white/20 mx-auto mb-4" />
                    <p className="text-white/60">주문 내역이 없습니다.</p>
                    <a
                      href="/products"
                      className="inline-block mt-4 px-6 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-all"
                    >
                      쇼핑하러 가기
                    </a>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-primary/50 transition-all cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="text-white font-semibold mb-1">
                              {order.orderId}
                            </p>
                            <p className="text-white/60 text-sm">
                              {formatDate(order.approvedAt)}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusText(order.status)}
                          </span>
                        </div>

                        <p className="text-white/70 mb-3">{order.orderName}</p>

                        <div className="flex items-center justify-between pt-3 border-t border-white/10">
                          <div className="flex items-center gap-2">
                            <span className="text-white/60 text-sm">결제수단:</span>
                            <span className="text-white/80 text-sm">
                              {order.method === 'CARD' ? '카드' : order.method}
                            </span>
                          </div>
                          <span className="text-xl font-bold text-white">
                            {order.totalAmount.toLocaleString()}원
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">찜한 상품</h2>
                  <button className="text-primary hover:text-secondary transition-colors text-sm">
                    전체보기
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2].map((item) => (
                    <div
                      key={item}
                      className="bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all cursor-pointer"
                    >
                      <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                        <Package className="w-16 h-16 text-white/20" />
                      </div>
                      <div className="p-4">
                        <h3 className="text-white font-semibold mb-2">
                          프리미엄 작업복
                        </h3>
                        <p className="text-xl font-bold text-primary">
                          89,000원
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">배송지 관리</h2>
                  <button className="px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-all text-sm">
                    추가하기
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-white font-semibold mb-1">
                            기본 배송지
                          </p>
                          <p className="text-white/60 text-sm">
                            서울특별시 강남구 테헤란로 123
                          </p>
                          <p className="text-white/60 text-sm">
                            (우) 06234 · 010-1234-5678
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full">
                        기본
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
