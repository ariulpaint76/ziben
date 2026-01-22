import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Firebase Admin 초기화 (클라이언트 SDK 사용)
import { initializeApp as initClientApp } from 'firebase/app';
import { getFirestore as getClientFirestore, collection, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD5W3bu8khsv7j6pRhkE6CtrfKN6JJXVzk',
  authDomain: 'test-ziben.firebaseapp.com',
  projectId: 'test-ziben',
  storageBucket: 'test-ziben.firebasestorage.app',
  messagingSenderId: '191416467277',
  appId: '1:191416467277:web:c5070f62b47c5e73bd0104',
  measurementId: 'G-YF8N837CVN',
};

const app = initClientApp(firebaseConfig);
const db = getClientFirestore(app);

// 상품 데이터
const products = [
  {
    id: '1',
    name: '프리미엄 사계절 작업복',
    category: '작업복',
    price: 100,
    originalPrice: 200,
    discount: 50,
    rating: 4.8,
    reviews: 234,
    description: '사계절 내내 착용 가능한 프리미엄 작업복입니다. 통기성이 우수하며 내구성이 뛰어난 원단을 사용했습니다.',
    features: [
      '4계절 착용 가능',
      '통기성 우수',
      '내구성 강화',
      '다양한 포켓 구성',
      '세탁 후 변형 없음',
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: ['네이비', '블랙', '차콜', '카키'],
    stock: 150,
    imageUrl: '',
    thumbnails: ['', '', '', ''],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: '고급 안전화',
    category: '안전화',
    price: 79000,
    originalPrice: 99000,
    discount: 20,
    rating: 4.6,
    reviews: 189,
    description: '발을 보호하는 고급 안전화입니다. 미끄럼 방지 기능이 탁월합니다.',
    features: [
      '미끄럼 방지',
      '충격 흡수',
      '통기성 우수',
      '방수 기능',
      '경량 설계',
    ],
    sizes: ['240', '245', '250', '255', '260', '265', '270', '275', '280'],
    colors: ['블랙', '브라운'],
    stock: 200,
    imageUrl: '',
    thumbnails: ['', '', '', ''],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: '방한 작업복 세트',
    category: '작업복',
    price: 129000,
    originalPrice: 179000,
    discount: 28,
    rating: 4.9,
    reviews: 312,
    description: '추운 겨울에도 따뜻한 방한 작업복 세트입니다.',
    features: [
      '방한 기능',
      '방풍 처리',
      '보온 효과',
      '활동성 우수',
      '세트 구성',
    ],
    sizes: ['M', 'L', 'XL', '2XL', '3XL'],
    colors: ['네이비', '블랙'],
    stock: 120,
    imageUrl: '',
    thumbnails: ['', '', '', ''],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: '보안경 (김서림 방지)',
    category: '안전용품',
    price: 25000,
    originalPrice: 35000,
    discount: 29,
    rating: 4.7,
    reviews: 421,
    description: '김서림 방지 코팅이 된 고급 보안경입니다.',
    features: [
      '김서림 방지',
      'UV 차단',
      '충격 방지',
      '경량 설계',
      '조절 가능',
    ],
    sizes: ['Free'],
    colors: ['투명', '스모크'],
    stock: 500,
    imageUrl: '',
    thumbnails: ['', '', '', ''],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    name: '안전 장갑 (10켤레)',
    category: '안전용품',
    price: 18000,
    originalPrice: 25000,
    discount: 28,
    rating: 4.5,
    reviews: 567,
    description: '손을 보호하는 안전 장갑 10켤레 세트입니다.',
    features: [
      '미끄럼 방지',
      '통기성 우수',
      '내구성 강화',
      '편안한 착용감',
      '경제적 세트',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['화이트', '그레이'],
    stock: 800,
    imageUrl: '',
    thumbnails: ['', '', '', ''],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '6',
    name: '프리미엄 안전모',
    category: '안전용품',
    price: 45000,
    originalPrice: 65000,
    discount: 31,
    rating: 4.8,
    reviews: 289,
    description: '머리를 확실하게 보호하는 프리미엄 안전모입니다.',
    features: [
      '충격 흡수',
      '통기성 우수',
      '조절 가능',
      '경량 설계',
      '고급스러운 디자인',
    ],
    sizes: ['Free'],
    colors: ['화이트', '옐로우', '블루', '레드'],
    stock: 350,
    imageUrl: '',
    thumbnails: ['', '', '', ''],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// 카테고리 데이터
const categories = [
  {
    id: 'workwear',
    name: '작업복',
    description: '다양한 작업 환경에 맞는 작업복',
    icon: 'workwear',
    order: 1,
  },
  {
    id: 'safety-shoes',
    name: '안전화',
    description: '발을 보호하는 안전화',
    icon: 'shoes',
    order: 2,
  },
  {
    id: 'safety-equipment',
    name: '안전용품',
    description: '작업 안전을 위한 필수 용품',
    icon: 'shield',
    order: 3,
  },
];

async function migrateData() {
  try {
    console.log('🚀 데이터 마이그레이션을 시작합니다...\n');

    // 1. 카테고리 데이터 저장
    console.log('📂 카테고리 데이터 저장 중...');
    for (const category of categories) {
      await setDoc(doc(db, 'categories', category.id), category);
      console.log(`✅ 카테고리 저장 완료: ${category.name}`);
    }

    // 2. 상품 데이터 저장
    console.log('\n📦 상품 데이터 저장 중...');
    for (const product of products) {
      await setDoc(doc(db, 'products', product.id), product);
      console.log(`✅ 상품 저장 완료: ${product.name}`);
    }

    console.log('\n✨ 모든 데이터 마이그레이션이 완료되었습니다!');
    console.log(`\n저장된 데이터:`);
    console.log(`- 카테고리: ${categories.length}개`);
    console.log(`- 상품: ${products.length}개`);

    process.exit(0);
  } catch (error) {
    console.error('❌ 마이그레이션 중 오류 발생:', error);
    process.exit(1);
  }
}

migrateData();
