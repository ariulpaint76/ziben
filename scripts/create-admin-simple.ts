import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD5W3bu8khsv7j6pRhkE6CtrfKN6JJXVzk',
  authDomain: 'test-ziben.firebaseapp.com',
  projectId: 'test-ziben',
  storageBucket: 'test-ziben.firebasestorage.app',
  messagingSenderId: '191416467277',
  appId: '1:191416467277:web:c5070f62b47c5e73bd0104',
  measurementId: 'G-YF8N837CVN',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function createAdminAccount() {
  try {
    console.log('🔐 관리자 계정을 생성하는 중...\n');

    // 관리자 계정 생성
    const email = 'admin@naver.com';
    const password = '111111'; // Firebase는 최소 6자 이상 필요
    const name = '관리자';

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log('✅ Firebase Authentication 계정 생성 완료');
    console.log(`   UID: ${user.uid}`);
    console.log(`   Email: ${user.email}\n`);

    // Firestore에 사용자 정보 저장
    const userData = {
      uid: user.uid,
      email: user.email!,
      name: name,
      role: 'admin',
      createdAt: new Date(),
    };

    await setDoc(doc(db, 'users', user.uid), userData);

    console.log('✅ Firestore 사용자 정보 저장 완료');
    console.log(`   Name: ${name}`);
    console.log(`   Role: admin\n`);

    console.log('🎉 관리자 계정이 성공적으로 생성되었습니다!\n');
    console.log('로그인 정보:');
    console.log(`   이메일: ${email}`);
    console.log(`   비밀번호: ${password}\n`);

    process.exit(0);
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('ℹ️  이미 존재하는 계정입니다.');
      console.log('   이메일: admin@naver.com');
      console.log('   비밀번호: 1111');
      console.log('\n   로그인 페이지에서 바로 로그인하세요.');
    } else {
      console.error('❌ 오류 발생:', error.message);
    }
    process.exit(1);
  }
}

createAdminAccount();
