# Firebase 설정 가이드

ZIBEN 프로젝트에서 Firebase를 사용하려면 다음 단계를 따르세요.

## 1. Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com/) 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름 입력 (예: ziben-workwear)
4. Google 애널리틱스 설정 (선택사항)
5. 프로젝트 생성 완료

## 2. 웹 앱 등록

1. Firebase 프로젝트 개요에서 "웹 앱 추가" 클릭 (</> 아이콘)
2. 앱 닉네임 입력 (예: ZIBEN Web)
3. Firebase Hosting 설정 (선택사항)
4. "앱 등록" 클릭
5. Firebase SDK 설정 코드에서 `firebaseConfig` 객체의 값들을 복사

## 3. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 Firebase 설정값을 입력:

```bash
# Firebase 설정
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

## 4. Authentication 설정

### 4.1 이메일/비밀번호 인증 활성화

1. Firebase Console → Authentication → Sign-in method
2. "이메일/비밀번호" 제공업체 클릭
3. "사용 설정" 토글 활성화
4. "저장" 클릭

### 4.2 Google 로그인 활성화

1. Firebase Console → Authentication → Sign-in method
2. "Google" 제공업체 클릭
3. "사용 설정" 토글 활성화
4. 프로젝트 공개용 이름 입력
5. 프로젝트 지원 이메일 선택
6. "저장" 클릭

## 5. Firestore Database 설정

1. Firebase Console → Firestore Database → "데이터베이스 만들기"
2. 보안 규칙 모드 선택:
   - **테스트 모드**: 개발 중 사용 (30일 후 만료)
   - **프로덕션 모드**: 실제 서비스용 (권장)
3. 위치 선택 (asia-northeast3: Seoul 권장)
4. "사용 설정" 클릭

### Firestore 보안 규칙 (권장)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 사용자 데이터
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }

    // 관리자만 접근 가능한 데이터
    match /admin/{document=**} {
      allow read, write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## 6. Storage 설정 (선택사항)

파일 업로드 기능을 사용하려면:

1. Firebase Console → Storage → "시작하기"
2. 보안 규칙 선택 (테스트 모드 또는 프로덕션 모드)
3. 위치 선택
4. "완료" 클릭

## 7. 관리자 계정 생성

Firebase 설정 완료 후:

1. 개발 서버 실행: `npm run dev`
2. http://localhost:3000/auth/register 접속
3. 관리자 계정 정보로 회원가입:
   ```
   이메일: admin@naver.com
   비밀번호: 1111
   ```
4. 자동으로 관리자 권한이 부여됨
5. http://localhost:3000/admin 에서 관리자 페이지 접속

## 8. 프로덕션 배포 전 체크리스트

- [ ] Firestore 보안 규칙 설정
- [ ] Storage 보안 규칙 설정 (사용 시)
- [ ] 관리자 계정 비밀번호 변경
- [ ] Firebase 프로젝트 결제 설정 확인
- [ ] 환경 변수가 프로덕션 환경에 올바르게 설정되었는지 확인

## 문제 해결

### "Firebase: Error (auth/configuration-not-found)"
- `.env.local` 파일의 환경 변수가 올바르게 설정되었는지 확인
- 개발 서버 재시작 (`npm run dev`)

### "Firebase: Error (auth/operation-not-allowed)"
- Firebase Console에서 해당 로그인 방법이 활성화되었는지 확인
- 이메일/비밀번호 또는 Google 로그인 제공업체 활성화 필요

### "Missing or insufficient permissions"
- Firestore 보안 규칙 확인
- 테스트 중이라면 테스트 모드 사용
- 프로덕션이라면 보안 규칙 수정 필요

## 추가 리소스

- [Firebase 문서](https://firebase.google.com/docs)
- [Firebase Authentication 가이드](https://firebase.google.com/docs/auth)
- [Firestore 가이드](https://firebase.google.com/docs/firestore)
