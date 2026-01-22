'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import {
  Users,
  Package,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  Eye,
} from 'lucide-react';

interface Order {
  id: string;
  orderId: string;
  orderName: string;
  totalAmount: number;
  status: string;
  approvedAt: string;
  method: string;
  customerName: string;
  customerEmail: string;
  userId: string | null;
}

interface User {
  id: string;
  uid: string;
  email: string;
  name: string;
  role: string;
  createdAt: any;
}

export default function AdminPage() {
  const { user, userData, loading, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');

  // 개발 모드에서 임시 접근 허용
  const isDevelopment = process.env.NODE_ENV === 'development';
  const [devMode, setDevMode] = useState(false);

  // Real data from Firestore
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    // 개발 모드에서는 URL 파라미터로 우회 가능
    const params = new URLSearchParams(window.location.search);
    if (isDevelopment && params.get('dev') === 'true') {
      setDevMode(true);
      return;
    }

    if (!loading && (!user || userData?.role !== 'admin')) {
      router.push('/');
    }
  }, [user, userData, loading, router, isDevelopment]);

  // Fetch real data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingData(true);

        // Fetch orders
        const ordersSnapshot = await getDocs(collection(db, 'orders'));
        const ordersData: Order[] = [];
        ordersSnapshot.forEach((doc) => {
          const data = doc.data();
          ordersData.push({
            id: doc.id,
            orderId: data.orderId,
            orderName: data.orderName,
            totalAmount: data.totalAmount,
            status: data.status,
            approvedAt: data.approvedAt,
            method: data.method,
            customerName: data.customerName || '게스트',
            customerEmail: data.customerEmail || '',
            userId: data.userId || null,
          });
        });

        // Sort by date (most recent first)
        ordersData.sort((a, b) => {
          return new Date(b.approvedAt).getTime() - new Date(a.approvedAt).getTime();
        });
        setOrders(ordersData);

        // Fetch users
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const usersData: User[] = [];
        usersSnapshot.forEach((doc) => {
          const data = doc.data();
          usersData.push({
            id: doc.id,
            uid: data.uid,
            email: data.email,
            name: data.name,
            role: data.role,
            createdAt: data.createdAt,
          });
        });
        setUsers(usersData);

        // Fetch products
        const productsSnapshot = await getDocs(collection(db, 'products'));
        const productsData: any[] = [];
        productsSnapshot.forEach((doc) => {
          productsData.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setProducts(productsData);

        console.log('Admin 데이터 로드 완료:', {
          orders: ordersData.length,
          users: usersData.length,
          products: productsData.length,
        });
      } catch (error) {
        console.error('Admin 데이터 가져오기 오류:', error);
      } finally {
        setLoadingData(false);
      }
    };

    // Only fetch data if user is admin or in dev mode
    if (devMode || (user && userData?.role === 'admin')) {
      fetchData();
    }
  }, [user, userData, devMode]);

  const handleLogout = async () => {
    if (devMode) {
      router.push('/');
      return;
    }
    await logout();
    router.push('/');
  };

  // 개발 모드가 아닐 때만 로딩/인증 체크
  if (!devMode) {
    if (loading) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      );
    }

    if (!user || userData?.role !== 'admin') {
      return null;
    }
  }

  // 개발 모드일 때 사용할 더미 사용자 데이터
  const displayUserData = devMode
    ? { name: '개발자 (임시)', email: 'dev@example.com', role: 'admin' as const }
    : userData;

  // Calculate real statistics
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalUsers = users.length;

  // Calculate completed orders (status === 'DONE')
  const completedOrders = orders.filter((order) => order.status === 'DONE');
  const completedRevenue = completedOrders.reduce((sum, order) => sum + order.totalAmount, 0);

  const stats = [
    {
      title: '총 매출',
      value: loadingData ? '로딩중...' : `₩${totalRevenue.toLocaleString()}`,
      change: completedOrders.length > 0 ? `${completedOrders.length}건 완료` : '데이터 없음',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: '주문 수',
      value: loadingData ? '로딩중...' : `${totalOrders}`,
      change: completedOrders.length > 0 ? `${completedOrders.length}건 완료` : '데이터 없음',
      icon: ShoppingCart,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: '상품 수',
      value: loadingData ? '로딩중...' : `${totalProducts}`,
      change: `Firestore`,
      icon: Package,
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: '회원 수',
      value: loadingData ? '로딩중...' : `${totalUsers}`,
      change: `활성 회원`,
      icon: Users,
      color: 'from-orange-500 to-red-500',
    },
  ];

  // Get recent orders (top 5)
  const recentOrders = orders.slice(0, 5).map((order) => ({
    id: order.orderId,
    customer: order.customerName,
    product: order.orderName,
    amount: order.totalAmount,
    status: order.status === 'DONE' ? '결제완료' : order.status,
    date: new Date(order.approvedAt).toLocaleDateString('ko-KR'),
  }));

  // Calculate top products by counting order names
  const productSales = orders.reduce((acc: any, order) => {
    const productName = order.orderName;
    if (!acc[productName]) {
      acc[productName] = { name: productName, sales: 0, revenue: 0 };
    }
    acc[productName].sales += 1;
    acc[productName].revenue += order.totalAmount;
    return acc;
  }, {});

  const topProducts = Object.values(productSales)
    .sort((a: any, b: any) => b.revenue - a.revenue)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white/5 backdrop-blur-md border-r border-white/10 min-h-screen p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gradient">ZIBEN ADMIN</h1>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'text-white/70 hover:bg-white/5'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              대시보드
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'orders'
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'text-white/70 hover:bg-white/5'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              주문 관리
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'products'
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'text-white/70 hover:bg-white/5'
              }`}
            >
              <Package className="w-5 h-5" />
              상품 관리
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'users'
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'text-white/70 hover:bg-white/5'
              }`}
            >
              <Users className="w-5 h-5" />
              회원 관리
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'settings'
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'text-white/70 hover:bg-white/5'
              }`}
            >
              <Settings className="w-5 h-5" />
              설정
            </button>
          </nav>

          <div className="mt-auto pt-8">
            <button
              onClick={() => router.push('/')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5 transition-all mb-2"
            >
              <Eye className="w-5 h-5" />
              사이트 보기
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
            >
              <LogOut className="w-5 h-5" />
              로그아웃
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              {activeTab === 'dashboard' && '대시보드'}
              {activeTab === 'orders' && '주문 관리'}
              {activeTab === 'products' && '상품 관리'}
              {activeTab === 'users' && '회원 관리'}
              {activeTab === 'settings' && '설정'}
            </h2>
            <p className="text-white/60">
              환영합니다, {displayUserData?.name}님
              {devMode && <span className="ml-2 text-yellow-400 text-xs">(개발 모드)</span>}
            </p>
          </div>

          {activeTab === 'dashboard' && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                      >
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-green-400 text-sm font-semibold">
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-white/60 text-sm mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Orders */}
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">최근 주문</h3>
                    <button className="text-primary hover:text-secondary transition-colors text-sm flex items-center gap-1">
                      전체보기
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {loadingData ? (
                      <div className="text-center py-8">
                        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-white/60">데이터를 불러오는 중...</p>
                      </div>
                    ) : recentOrders.length === 0 ? (
                      <div className="text-center py-8">
                        <ShoppingCart className="w-12 h-12 text-white/20 mx-auto mb-4" />
                        <p className="text-white/60">주문 내역이 없습니다.</p>
                      </div>
                    ) : (
                      recentOrders.map((order) => (
                        <div
                          key={order.id}
                          className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-primary/50 transition-all cursor-pointer"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="text-white font-semibold mb-1">
                                {order.id}
                              </p>
                              <p className="text-white/60 text-sm">
                                {order.customer} · {order.product}
                              </p>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                order.status === '결제완료'
                                  ? 'bg-green-500/20 text-green-400'
                                  : order.status === '배송중'
                                  ? 'bg-blue-500/20 text-blue-400'
                                  : order.status === 'DONE'
                                  ? 'bg-green-500/20 text-green-400'
                                  : 'bg-yellow-500/20 text-yellow-400'
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-white/50 text-sm">{order.date}</span>
                            <span className="text-white font-semibold">
                              ₩{order.amount.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Top Products */}
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">인기 상품</h3>
                    <button className="text-primary hover:text-secondary transition-colors text-sm flex items-center gap-1">
                      전체보기
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {loadingData ? (
                      <div className="text-center py-8">
                        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-white/60">데이터를 불러오는 중...</p>
                      </div>
                    ) : topProducts.length === 0 ? (
                      <div className="text-center py-8">
                        <Package className="w-12 h-12 text-white/20 mx-auto mb-4" />
                        <p className="text-white/60">판매된 상품이 없습니다.</p>
                      </div>
                    ) : (
                      topProducts.map((product: any, index: number) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {index + 1}
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-medium mb-1">
                              {product.name}
                            </p>
                            <p className="text-white/50 text-sm">
                              판매: {product.sales}개
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-semibold">
                              {product.revenue >= 1000000
                                ? `₩${(product.revenue / 1000000).toFixed(1)}M`
                                : `₩${product.revenue.toLocaleString()}`}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab !== 'dashboard' && (
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-12 border border-white/10 text-center">
              <Package className="w-24 h-24 text-white/20 mx-auto mb-4" />
              <p className="text-white/60 text-lg">
                {activeTab} 페이지가 곧 추가됩니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
