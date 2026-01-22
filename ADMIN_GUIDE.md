# 관리자 계정 가이드

## 🔐 관리자 계정 정보

### 기본 관리자 계정
- **이메일**: `admin@naver.com`
- **비밀번호**: `111111` (6자리)

⚠️ **중요**: Firebase는 비밀번호 최소 6자를 요구하므로 `111111`로 설정되었습니다.

이 계정은 자동으로 관리자 권한이 부여됩니다.

## 📊 관리자 페이지 접속 방법

### 1. 정식 로그인
```
1. http://localhost:3000/auth/login 접속
2. 이메일: admin@naver.com
3. 비밀번호: 111111
4. 로그인 후 헤더에 "관리자" 버튼이 표시됨
5. 관리자 버튼 클릭 또는 http://localhost:3000/admin 접속
```

### 2. 개발 모드 (임시 접속)
Firebase 설정 전 테스트용:
```
http://localhost:3000/admin?dev=true
```

## 🎯 관리자 기능

관리자 대시보드에서는 다음 기능을 사용할 수 있습니다:

- 📈 **통계 대시보드**: 총 주문, 매출, 회원 수 등
- 📦 **최근 주문 관리**: 주문 목록 조회
- 👥 **회원 관리**: 사용자 목록 및 관리
- 🏷️ **상품 관리**: 상품 추가, 수정, 삭제

## 🔧 관리자 계정 추가 방법

### 방법 1: 회원가입 후 수동 권한 부여

1. 일반 회원가입 진행
2. Firebase Console → Firestore Database 접속
3. `users` 컬렉션에서 해당 사용자 찾기
4. `role` 필드를 `'admin'`으로 수정

### 방법 2: 코드 수정

`src/contexts/AuthContext.tsx` 파일에서 관리자 이메일 추가:

```typescript
// 74번째 줄
const isAdmin = email.toLowerCase() === 'admin@naver.com' ||
                email.toLowerCase() === '추가할이메일@example.com';
```

## 🔍 문제 해결

### 관리자 버튼이 표시되지 않는 경우

1. **로그인 상태 확인**
   - 브라우저를 새로고침해보세요
   - 개발자 도구 (F12) → Console에서 오류 확인

2. **Firebase 데이터 확인**
   - Firebase Console에서 해당 사용자의 `role` 필드가 `'admin'`인지 확인

3. **캐시 문제**
   - 로그아웃 후 다시 로그인
   - 브라우저 캐시 삭제

### 주문 내역이 표시되지 않는 경우

Firestore에서 `where`와 `orderBy`를 함께 사용하면 복합 인덱스가 필요합니다.

**해결 방법**:
1. 현재 코드는 클라이언트 사이드 정렬을 사용하므로 인덱스 없이 작동합니다
2. 성능 최적화를 원한다면 Firebase Console에서 인덱스 생성:
   - Firestore Database → 인덱스 탭
   - 단일 필드 인덱스: `userId` (오름차순)
   - 복합 인덱스: `userId` (오름차순) + `createdAt` (내림차순)

## 🛡️ 보안 권장사항

### 운영 환경 배포 전 필수 작업

1. **관리자 비밀번호 변경**
   ```
   - 현재 비밀번호 '1111'은 테스트용입니다
   - 운영 환경에서는 반드시 강력한 비밀번호로 변경하세요
   ```

2. **환경 변수 보호**
   ```bash
   # .env.local 파일은 절대 Git에 커밋하지 마세요
   # .gitignore에 추가되어 있는지 확인
   ```

3. **Firestore 보안 규칙 적용**
   ```javascript
   // Firebase Console → Firestore Database → 규칙
   match /users/{userId} {
     allow read: if request.auth != null;
     allow write: if request.auth.uid == userId;
   }

   match /orders/{orderId} {
     allow read: if request.auth != null &&
                   (resource.data.userId == request.auth.uid ||
                    get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
     allow create: if request.auth != null;
     allow update: if request.auth != null &&
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
   }
   ```

## 📞 지원

문제가 발생하면:
1. 브라우저 개발자 도구 (F12) → Console 탭에서 오류 메시지 확인
2. Firebase Console에서 데이터 확인
3. 로그아웃 후 재로그인 시도

---

**마지막 업데이트**: 2026-01-22
