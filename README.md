# Premium Workwear Landing Page

프리미엄 3D 애니메이션을 적용한 작업복 랜딩페이지입니다.

## 주요 기능

### 🎨 3D 애니메이션
- **React Three Fiber** 기반 WebGL 3D 그래픽
- 마우스 인터랙션에 반응하는 **Parallax 효과**
- 스크롤에 따라 변화하는 **동적 크리스탈 애니메이션**
- 고급스러운 **유리/수정 질감** (MeshTransmissionMaterial)

### ✨ 인터랙티브 UI
- **Navbar**: 스크롤 시 배경색이 변화하는 고정 내비게이션
- **Hero Section**: 3D 배경과 함께하는 메인 히어로 영역
- **Services**: Framer Motion 기반 staggered 애니메이션 카드
- **Government News**: 정부 RSS 피드 연동 실시간 뉴스 (1시간 자동 갱신)
- **Approach**: GSAP ScrollTrigger를 활용한 가로 스크롤 시퀀스
- **Pricing**: 홀로그램 틸트 효과를 적용한 가격 카드
- **Contact**: 글래스모피즘 디자인의 폼
- **AI Chatbot**: Google Gemini 2.5 Flash 기반 실시간 고객 상담 챗봇

### 🎯 기술 스택
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: React Three Fiber, Drei, Three.js
- **Animation**: Framer Motion, GSAP
- **AI**: Google Gemini 2.5 Flash API
- **Icons**: Lucide React

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

Firebase 인증 및 결제 시스템을 사용하려면 환경 변수가 필요합니다:

`.env.local` 파일을 생성하고 다음 값들을 입력하세요:

```bash
# Firebase 설정 (필수)
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Toss Payments 설정 (결제 기능 사용 시)
NEXT_PUBLIC_TOSS_CLIENT_KEY=your-toss-client-key

# Google Gemini API (AI 챗봇 기능 사용 시 - 선택사항)
GEMINI_API_KEY=your-gemini-api-key
```

**AI 챗봇 지원 모델:**
- Gemini 2.5 Flash (기본, 추천)
- Gemini 1.5 Flash
- Gemini 1.5 Flash 8B
- Gemini 1.5 Pro
- Gemini 2.0 Flash (실험)

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 열어 확인하세요.

### 4. 관리자 계정 생성

관리자 기능을 사용하려면 관리자 계정이 필요합니다.

**방법 1: 회원가입 페이지에서 생성 (권장)**

1. http://localhost:3000/auth/register 접속
2. 다음 정보로 회원가입:
   - 이메일: `admin@naver.com`
   - 비밀번호: `1111`
   - 이름: 관리자 (또는 원하는 이름)
3. 회원가입 완료 후 자동으로 관리자 권한 부여됨

**관리자 페이지 접속:**
- http://localhost:3000/admin

**테스트 계정 정보:**
```
이메일: admin@naver.com
비밀번호: 1111
```

> ⚠️ **보안 주의사항**: 프로덕션 환경에서는 반드시 비밀번호를 변경하세요!

### 5. 프로덕션 빌드

```bash
npm run build
npm start
```

## 프로젝트 구조

```
src/
├── app/
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts     # Gemini AI API 엔드포인트
│   │   └── rss/
│   │       └── route.ts     # RSS 피드 파싱 API
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 메인 페이지
│   ├── sitemap.ts          # SEO 사이트맵
│   └── globals.css         # 전역 스타일
└── components/
    ├── Hero3D.tsx          # 3D 캔버스 래퍼
    ├── InteractiveScene.tsx # 3D 씬 로직
    ├── Navbar.tsx          # 내비게이션
    ├── Hero.tsx            # 히어로 섹션
    ├── ProductGallery.tsx  # 제품 갤러리
    ├── BrandPhilosophy.tsx # 브랜드 철학
    ├── CategoryShowcase.tsx # 카테고리 쇼케이스
    ├── GovernmentNews.tsx  # 정부 뉴스 (RSS 피드)
    ├── Workwear.tsx        # 작업복 라인업
    ├── SafetyShoes.tsx     # 안전화 라인업
    ├── Testimonials.tsx    # 고객 후기
    ├── Services.tsx        # 서비스 카드
    ├── Approach.tsx        # 가로 스크롤 섹션
    ├── Pricing.tsx         # 가격 카드
    ├── Contact.tsx         # 연락 폼
    ├── AIChatbot.tsx       # AI 챗봇
    └── Footer.tsx          # 푸터
```

## 성능 최적화 팁

1. **3D 최적화**: 디바이스 성능에 따라 3D 품질 조정
2. **이미지 최적화**: Next.js Image 컴포넌트 활용
3. **코드 스플리팅**: 동적 import를 통한 번들 크기 최적화
4. **애니메이션 성능**: will-change CSS 속성 활용

## 커스터마이징

### 색상 변경
[tailwind.config.ts](tailwind.config.ts)에서 테마 색상을 수정할 수 있습니다.

### 3D 객체 변경
[InteractiveScene.tsx](src/components/InteractiveScene.tsx)에서 geometries와 materials를 수정할 수 있습니다.

### 애니메이션 타이밍
각 컴포넌트의 duration, delay, easing 파라미터를 조정하세요.

### AI 챗봇 커스터마이징
[AIChatbot.tsx](src/components/AIChatbot.tsx)에서:
- **모델 목록**: `GEMINI_MODELS` 배열 수정
- **기본 모델**: `useState` 초기값 변경
- **시스템 프롬프트**: [route.ts](src/app/api/chat/route.ts)의 `systemInstruction` 수정
- **UI 스타일**: Tailwind 클래스 및 Framer Motion 애니메이션 조정

## 라이선스

MIT License
