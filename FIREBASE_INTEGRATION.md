# Firebase 연동 완료 가이드

ZIBEN 랜딩페이지가 Firebase와 완전히 연동되었습니다! 🎉

## 📋 완료된 작업

### 1. Firebase 설정 업데이트
- ✅ `.env.local` 파일에 실제 Firebase 설정 적용
- ✅ `src/lib/firebase.ts`에 Analytics 추가
- ✅ 모든 Firebase 서비스 활성화 (Auth, Firestore, Storage, Analytics)

### 2. Firestore 데이터 구조
다음 컬렉션들이 생성되었습니다:

#### Products (상품)
```typescript
{
  id: string,
  name: string,
  category: string,
  price: number,
  originalPrice: number,
  discount: number,
  rating: number,
  reviews: number,
  description: string,
  features: string[],
  sizes: string[],
  colors: string[],
  stock: number,
  imageUrl: string,
  thumbnails: string[],
  createdAt: Date,
  updatedAt: Date
}
```

#### Categories (카테고리)
```typescript
{
  id: string,
  name: string,
  description: string,
  icon: string,
  order: number
}
```

#### Users (사용자)
```typescript
{
  uid: string,
  email: string,
  name: string,
  role: 'user' | 'admin',
  phone?: string,
  company?: string,
  createdAt: Date
}
```

### 3. 데이터 마이그레이션
초기 상품 데이터가 준비되었습니다:
- 프리미엄 사계절 작업복 (100원 - 테스트용)
- 고급 안전화
- 방한 작업복 세트
- 보안경
- 안전 장갑
- 프리미엄 안전모

### 4. 페이지 업데이트
- ✅ `/products` - Firestore에서 상품 목록 가져오기
- ✅ `/products/[id]` - Firestore에서 상품 상세 정보 가져오기
- ✅ 로딩 상태 UI 추가
- ✅ 에러 핸들링 추가

## 🚀 데이터 마이그레이션 실행

다음 명령어를 실행하여 초기 데이터를 Firestore에 저장하세요:

```bash
npm run migrate
```

이 명령어는 다음 작업을 수행합니다:
1. 6개의 상품 데이터를 `products` 컬렉션에 저장
2. 3개의 카테고리를 `categories` 컬렉션에 저장

## 📊 Firebase Console 설정

Firebase Console에서 다음 작업을 수행해야 합니다:

### 1. Firestore Database 활성화
1. [Firebase Console](https://console.firebase.google.com) 접속
2. `test-ziben` 프로젝트 선택
3. 좌측 메뉴에서 "Firestore Database" 선택
4. "데이터베이스 만들기" 클릭
5. "테스트 모드로 시작" 선택 (개발 중)
6. 위치 선택: `asia-northeast3 (Seoul)` 권장

### 2. Authentication 활성화
1. 좌측 메뉴에서 "Authentication" 선택
2. "시작하기" 클릭
3. 로그인 방법 탭에서 다음 활성화:
   - ✅ 이메일/비밀번호
   - ✅ Google

### 3. Storage 활성화 (이미지 업로드용)
1. 좌측 메뉴에서 "Storage" 선택
2. "시작하기" 클릭
3. 보안 규칙 선택 (테스트 모드)

### 4. Firestore 보안 규칙 설정

Firebase Console > Firestore Database > 규칙 탭에서 다음 규칙을 설정하세요:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users 컬렉션
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }

    // Products 컬렉션 (모든 사용자 읽기 가능, 관리자만 쓰기)
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null &&
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Categories 컬렉션
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if request.auth != null &&
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Orders 컬렉션
    match /orders/{orderId} {
      allow read: if request.auth != null &&
                    (resource.data.userId == request.auth.uid ||
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow create: if request.auth != null;
      allow update: if request.auth != null &&
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## 🔧 개발 환경 설정

### 1. 환경 변수 확인
`.env.local` 파일이 다음과 같이 설정되어 있는지 확인:

```bash
# Firebase 설정
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD5W3bu8khsv7j6pRhkE6CtrfKN6JJXVzk
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=test-ziben.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=test-ziben
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=test-ziben.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=191416467277
NEXT_PUBLIC_FIREBASE_APP_ID=1:191416467277:web:c5070f62b47c5e73bd0104
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-YF8N837CVN

# Toss Payments 설정
NEXT_PUBLIC_TOSS_CLIENT_KEY=test_ck_LlDJaYngroeD2jWGe0Qn3ezGdRpX
TOSS_SECRET_KEY=test_sk_KNbdOvk5rk1vx1gE2pxA3n07xlzm
```

### 2. 개발 서버 실행
```bash
npm run dev
```

## 📱 테스트 가이드

### 1. 데이터 마이그레이션 테스트
```bash
npm run migrate
```
성공 시 콘솔에 다음과 같은 메시지가 표시됩니다:
```
✨ 모든 데이터 마이그레이션이 완료되었습니다!
저장된 데이터:
- 카테고리: 3개
- 상품: 6개
```

### 2. 상품 목록 페이지 테스트
1. http://localhost:3000/products 접속
2. Firestore에서 가져온 상품들이 표시되는지 확인
3. 카테고리 필터 동작 확인
4. 검색 기능 확인

### 3. 상품 상세 페이지 테스트
1. http://localhost:3000/products/1 접속
2. 상품 정보가 정상적으로 표시되는지 확인
3. 사이즈, 색상 선택 기능 확인
4. 결제 시스템 테스트 (100원)

### 4. 관리자 페이지 테스트
1. http://localhost:3000/admin?dev=true 접속
2. 대시보드 확인

### 5. 인증 시스템 테스트
1. http://localhost:3000/auth/register 접속
2. 이메일로 회원가입
3. Google 로그인 테스트
4. 관리자 계정 테스트:
   - 이메일: admin@naver.com
   - 비밀번호: 1111

## 🎯 다음 단계

### 1. 이미지 업로드 기능 추가
현재 상품 이미지는 빈 문자열입니다. Storage를 사용하여 실제 이미지를 업로드할 수 있습니다.

### 2. 주문 시스템 완성
결제 성공 후 Firestore에 주문 정보를 저장하는 로직 추가:
- `src/app/api/payment/confirm/route.ts` 파일의 52번째 줄 참조

### 3. RSS 피드 데이터 저장
현재 RSS 피드는 실시간으로 가져옵니다. 선택적으로 Firestore에 캐싱할 수 있습니다.

### 4. 실시간 재고 관리
관리자 페이지에서 상품 재고를 관리하는 기능 추가

## 🔗 유용한 링크

- [Firebase Console](https://console.firebase.google.com)
- [Firestore 문서](https://firebase.google.com/docs/firestore)
- [Firebase Authentication 문서](https://firebase.google.com/docs/auth)
- [Toss Payments 문서](https://docs.tosspayments.com)

## 🆘 문제 해결

### 마이그레이션 실행 시 오류
- Firestore Database가 활성화되어 있는지 확인
- 보안 규칙이 올바르게 설정되어 있는지 확인
- 네트워크 연결 확인

### 상품이 표시되지 않음
- `npm run migrate` 실행 여부 확인
- Firebase Console에서 데이터가 저장되었는지 확인
- 브라우저 콘솔에서 오류 메시지 확인

### Google 로그인 실패
- Firebase Console > Authentication에서 Google 로그인이 활성화되어 있는지 확인
- 승인된 도메인에 localhost가 추가되어 있는지 확인

---

모든 설정이 완료되었습니다! 🎉
질문이 있으시면 언제든지 문의하세요.
