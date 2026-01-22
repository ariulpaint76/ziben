# ZIBEN 문의 폼 Google Sheets 연동 가이드

## 📋 개요

이 Google Apps Script는 ZIBEN 작업복 & 안전화 웹사이트의 문의 폼 데이터를 자동으로 Google Sheets에 저장합니다.

## 🔧 설정 방법

### 1단계: Google Sheets 열기

Google Sheets를 열어주세요:
```
https://docs.google.com/spreadsheets/d/19UCjTkcBnxzioix2MFwS0aFQkkZDdmKLK-alKasY4Go
```

### 2단계: Apps Script 에디터 열기

1. 상단 메뉴에서 **확장 프로그램** 클릭
2. **Apps Script** 선택

### 3단계: 코드 붙여넣기

1. Apps Script 에디터가 열리면 기존 코드를 모두 삭제
2. `Code.gs` 파일의 내용을 복사하여 붙여넣기
3. **저장** 버튼 클릭 (또는 Ctrl+S)

### 4단계: 웹 앱으로 배포

1. 상단 오른쪽의 **배포** 버튼 클릭
2. **새 배포** 선택
3. 설정:
   - **유형 선택**: 웹 앱
   - **설명**: "ZIBEN 문의 폼 수집" (선택사항)
   - **다음 계정으로 실행**: 나
   - **액세스 권한**: **모든 사용자**
4. **배포** 버튼 클릭
5. 권한 승인 (필요한 경우):
   - "권한 검토" 클릭
   - Google 계정 선택
   - "고급" 클릭
   - "프로젝트 이름(안전하지 않음)으로 이동" 클릭
   - "허용" 클릭
6. **웹 앱 URL 복사** (나중에 사용)
   - URL 형식: `https://script.google.com/macros/s/AKfycby.../exec`

### 5단계: Next.js 프로젝트에 URL 설정

1. `src/components/Contact.tsx` 파일 열기
2. 25번째 줄 찾기:
```typescript
const response = await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL/exec', {
```
3. 복사한 웹 앱 URL로 교체:
```typescript
const response = await fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
```
4. 파일 저장

## ✅ 테스트

### Apps Script 에디터에서 테스트

1. Apps Script 에디터에서 함수 선택: `testInsert`
2. **실행** 버튼 클릭
3. Google Sheets 확인 - 테스트 데이터가 추가되었는지 확인

### 웹사이트에서 테스트

1. Next.js 개발 서버 실행: `npm run dev`
2. 브라우저에서 `http://localhost:3000` 접속
3. 문의 섹션으로 스크롤
4. 폼 작성 후 제출
5. Google Sheets 확인 - 새 행이 추가되었는지 확인

## 📊 Google Sheets 구조

자동으로 생성되는 열:

| 열 | 내용 | 설명 |
|---|---|---|
| A | 이름 | 필수 입력 |
| B | 회사명 | 선택 입력 |
| C | 이메일 | 필수 입력 |
| D | 전화번호 | 필수 입력 |
| E | 문의내용 | 필수 입력 |
| F | 처리상태 | 기본값: 미처리 |
| G | 접수일시 | 자동 생성 (yyyy-mm-dd hh:mm:ss) |

## 🎨 자동 서식

- **헤더**: 파란색 배경, 흰색 글자, 굵게, 가운데 정렬
- **처리상태 색상**:
  - 🟨 미처리: 노란색 배경 (#fff3cd)
  - 🟦 처리중: 파란색 배경 (#cfe2ff)
  - 🟩 완료: 녹색 배경 (#d1e7dd)
- **테두리**: 모든 셀에 자동 적용
- **열 너비**: 내용에 맞춰 자동 조정

## 🔄 처리상태 업데이트

처리상태를 수동으로 변경하려면:

1. Apps Script 에디터에서 `updateStatus` 함수 사용
2. 예시:
```javascript
// 2번째 행의 상태를 '처리중'으로 변경
updateStatus(2, '처리중');

// 3번째 행의 상태를 '완료'로 변경
updateStatus(3, '완료');
```

또는 Google Sheets에서 직접 셀을 편집할 수도 있습니다.

## 🔒 보안 고려사항

- ✅ 웹 앱은 "모든 사용자" 접근 권한으로 설정 (익명 문의 가능)
- ✅ 데이터는 귀하의 Google 계정으로만 저장됨
- ✅ CORS는 자동으로 처리됨 (`no-cors` 모드 사용)
- ⚠️ Google Apps Script URL을 외부에 노출하지 마세요

## 🐛 문제 해결

### 문제: 데이터가 저장되지 않음

**해결방법**:
1. Apps Script URL이 올바른지 확인
2. 배포 시 "모든 사용자" 권한으로 설정했는지 확인
3. Chrome 개발자 도구(F12) > Console에서 에러 메시지 확인
4. Apps Script 에디터 > 실행 > 로그에서 에러 확인

### 문제: CORS 에러

**해결방법**:
- Contact.tsx에서 `mode: 'no-cors'` 옵션이 설정되어 있는지 확인

### 문제: 권한 에러

**해결방법**:
1. Apps Script 배포 시 "다음 계정으로 실행: 나" 선택
2. 권한 승인 과정을 완료했는지 확인
3. 필요시 재배포

## 📞 지원

문제가 계속되면 Apps Script 로그를 확인하세요:
- Apps Script 에디터 > **실행** 메뉴 > **로그** 확인
