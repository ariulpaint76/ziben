/**
 * 초기 관리자 계정 생성 스크립트
 *
 * 사용 방법:
 * 1. Firebase 설정이 .env.local에 올바르게 입력되어 있는지 확인
 * 2. npm run create-admin 실행
 */

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// Firebase 설정
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

async function createAdminAccount() {
  try {
    console.log('🔧 Firebase 초기화 중...');
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    console.log('👤 관리자 계정 생성 중...');

    const adminEmail = 'admin@naver.com';
    const adminPassword = '1111';

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      adminEmail,
      adminPassword
    );

    const user = userCredential.user;

    console.log('💾 Firestore에 관리자 정보 저장 중...');

    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      name: '관리자',
      role: 'admin',
      createdAt: new Date(),
    });

    console.log('✅ 관리자 계정 생성 완료!');
    console.log('');
    console.log('📧 이메일: admin@naver.com');
    console.log('🔑 비밀번호: 1111');
    console.log('');
    console.log('🔗 로그인 페이지: http://localhost:3000/auth/login');
    console.log('🔗 관리자 페이지: http://localhost:3000/admin');

    process.exit(0);
  } catch (error: any) {
    console.error('❌ 오류 발생:', error.message);

    if (error.code === 'auth/email-already-in-use') {
      console.log('ℹ️  관리자 계정이 이미 존재합니다.');
      console.log('');
      console.log('📧 이메일: admin@naver.com');
      console.log('🔑 비밀번호: 1111');
      console.log('');
      console.log('🔗 로그인 페이지: http://localhost:3000/auth/login');
      console.log('🔗 관리자 페이지: http://localhost:3000/admin');
    }

    process.exit(1);
  }
}

createAdminAccount();
