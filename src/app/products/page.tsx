'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Search, Filter, ShoppingCart, Star } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const categories = ['전체', '작업복', '안전화', '안전용품'];

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  badge?: string;
}

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const productsData: Product[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          productsData.push({
            id: doc.id,
            name: data.name,
            category: data.category,
            price: data.price,
            rating: data.rating,
            reviews: data.reviews,
            imageUrl: data.imageUrl || '',
            badge: data.badge,
          });
        });

        setProducts(productsData);
      } catch (error) {
        console.error('상품 데이터 가져오기 오류:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === '전체' || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              상품 <span className="text-gradient">소개</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              ZIBEN의 프리미엄 작업복과 안전화를 만나보세요
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="상품을 검색하세요..."
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-primary/50 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-6 bg-white/5 backdrop-blur-md border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
              <p className="text-white/70">상품을 불러오는 중...</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="text-white/70">
                  총 <span className="text-primary font-semibold">{filteredProducts.length}</span>개의 상품
                </p>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all">
                  <Filter className="w-4 h-4" />
                  필터
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/products/${product.id}`}>
                  <div className="group bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300">
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <ShoppingCart className="w-32 h-32 text-white/10" />
                      </div>
                      {product.badge && (
                        <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-primary to-secondary rounded-full text-white text-sm font-semibold">
                          {product.badge}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Info */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-primary font-semibold">
                          {product.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm text-white/70">
                            {product.rating}
                          </span>
                          <span className="text-xs text-white/50">
                            ({product.reviews})
                          </span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-white">
                            {product.price.toLocaleString()}
                          </span>
                          <span className="text-white/50 ml-1">원</span>
                        </div>
                        <button className="p-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

              {/* No Results */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-white/50 text-lg">
                    검색 결과가 없습니다.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
