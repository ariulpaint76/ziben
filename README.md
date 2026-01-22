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
- **Approach**: GSAP ScrollTrigger를 활용한 가로 스크롤 시퀀스
- **Pricing**: 홀로그램 틸트 효과를 적용한 가격 카드
- **Contact**: 글래스모피즘 디자인의 폼

### 🎯 기술 스택
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: React Three Fiber, Drei, Three.js
- **Animation**: Framer Motion, GSAP
- **Icons**: Lucide React

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 열어 확인하세요.

### 3. 프로덕션 빌드

```bash
npm run build
npm start
```

## 프로젝트 구조

```
src/
├── app/
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 메인 페이지
│   └── globals.css         # 전역 스타일
└── components/
    ├── Hero3D.tsx          # 3D 캔버스 래퍼
    ├── InteractiveScene.tsx # 3D 씬 로직
    ├── Navbar.tsx          # 내비게이션
    ├── Hero.tsx            # 히어로 섹션
    ├── Services.tsx        # 서비스 카드
    ├── Approach.tsx        # 가로 스크롤 섹션
    ├── Pricing.tsx         # 가격 카드
    ├── Contact.tsx         # 연락 폼
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

## 라이선스

MIT License
