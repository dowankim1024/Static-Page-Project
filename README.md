# Crime Insight 2019

범죄 발생의 시간적, 요일별 패턴을 분석하고, 사용자가 특정 범죄 유형을 검색하여 상세 통계를 확인할 수 있는 정적 웹사이트입니다.

## 🌐 배포 링크

**프로덕션 사이트**: [https://crime-insight.vercel.app](https://crime-insight.vercel.app)

## 📋 프로젝트 개요

**프로젝트명**: Crime Insight 2019

**목표**: 범죄 발생의 시간적, 요일별 패턴을 분석하고, 사용자가 특정 범죄 유형을 검색하여 상세 통계를 확인할 수 있는 정적 웹사이트 구축

**데이터 출처**: 공공데이터포털 경찰청 범죄 발생 시간대 및 요일 CSV 파일 (2019년 데이터)

## 🛠️ 기술 스택

### 프론트엔드
- **Next.js 16.0.7** (App Router)
  - 서버 컴포넌트를 활용한 SSG (Static Site Generation)
  - 동적 라우팅 (`generateStaticParams`)
  - 메타데이터 자동 관리
- **React 19.2.0**
- **TypeScript 5**
- **Tailwind CSS 4**
  - 유틸리티 퍼스트 CSS 프레임워크
  - 반응형 디자인

### 데이터 시각화
- **Recharts 3.5.1**
  - Bar Chart (막대 그래프)
  - Line Chart (라인 그래프)
  - Pie Chart (파이 차트)
  - Comparison Chart (비교 차트)

### 배포
- **Vercel**
  - 자동 배포 및 CI/CD
  - SSG 최적화

## 🎯 프로젝트 목표

1. Next.js를 사용해서 정적 홈페이지를 작성하는 것을 연습
2. 데이터를 활용해서 인터랙티브한 대시보드를 구축
3. 간단한 아이디어를 손쉽게 사람들에게 선보일 수 있는 능력 향상
4. SEO 최적화 및 사용자 경험 개선

## ✨ 주요 기능

### 1. 페이지 구조
- **홈 페이지** (`/`): 프로젝트 소개 및 대시보드 진입점
- **About 페이지** (`/about`): 프로젝트 정보, 기술 스택, 개발자 정보
- **대시보드** (`/dashboard`): 전체 범죄 통계 및 검색 기능
- **상세 페이지** (`/detail/[category_middle]`): 범죄 유형별 상세 분석 (38개 범죄 유형)

### 2. 데이터 검색 기능
- 실시간 검색 및 자동완성
- 검색 결과 클릭 시 상세 페이지로 이동
- 범죄 유형 드롭다운 메뉴 (대분류별 그룹화)

### 3. 데이터 시각화
- **대시보드 차트**:
  - 요일별 발생 현황 (Bar Chart)
  - 시간대별 발생 현황 (Line Chart)
  - 범죄 대분류 비중 (Pie Chart)
- **상세 페이지 차트**:
  - 개별 범죄의 요일별/시간대별 발생 현황
  - 전체 평균과의 비교 차트
  - 구체적인 수치 데이터 테이블

### 4. 사용자 경험 개선
- 로딩 상태 처리 (`loading.tsx`)
- 에러 상태 처리 (`error.tsx`)
- 404 페이지 처리 (`not-found.tsx`)
- 반응형 디자인

### 5. SEO 최적화
- 페이지별 메타데이터 설정
- Open Graph 태그
- Twitter Card 지원
- 동적 메타데이터 생성 (`generateMetadata`)


## 📁 프로젝트 구조

```
staticpageproject/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # 루트 레이아웃
│   ├── page.tsx                 # 홈 페이지
│   ├── about/
│   │   └── page.tsx             # About 페이지
│   ├── dashboard/
│   │   ├── page.tsx             # 대시보드 페이지
│   │   ├── loading.tsx          # 로딩 UI
│   │   └── error.tsx            # 에러 UI
│   └── detail/
│       └── [category_middle]/
│           ├── page.tsx         # 상세 페이지
│           ├── loading.tsx      # 로딩 UI
│           ├── error.tsx        # 에러 UI
│           └── not-found.tsx    # 404 페이지
├── components/                   # 재사용 가능한 컴포넌트
│   ├── charts/                  # 차트 컴포넌트
│   │   ├── BarChart.tsx
│   │   ├── LineChart.tsx
│   │   ├── PieChart.tsx
│   │   └── ComparisonChart.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── SearchBar.tsx
│   ├── CrimeList.tsx
│   ├── CrimeSelector.tsx
│   ├── StatCard.tsx
│   ├── ChartCard.tsx
│   ├── LoadingSpinner.tsx
│   ├── ErrorDisplay.tsx
│   └── NotFoundDisplay.tsx
├── lib/                         # 유틸리티 함수
│   ├── csvParser.ts             # CSV 파싱 및 데이터 처리
│   └── dataFormatters.ts        # 데이터 포맷팅 함수
├── types/                       # TypeScript 타입 정의
│   └── crime.ts
├── data/                        # 데이터 파일
│   └── crime_data.csv           # 범죄 데이터 CSV
└── public/                      # 정적 파일
```

## 🔧 주요 구현 내용

### 1. CSV 데이터 파싱
- EUC-KR 인코딩을 UTF-8로 변환
- 시간대별, 요일별 데이터 추출
- 에러 처리 및 유효성 검사

### 2. SSG (Static Site Generation)
- `generateStaticParams`를 사용한 동적 라우트 정적 생성
- `dynamicParams = false`로 완전한 정적 사이트 보장
- 빌드 타임에 38개 범죄 상세 페이지 생성

### 3. 컴포넌트 분리
- 재사용 가능한 차트 컴포넌트
- 공통 UI 컴포넌트 (StatCard, ChartCard)
- 클라이언트/서버 컴포넌트 적절한 분리

### 4. 데이터 포맷팅 유틸리티
- 시간대 라벨 포맷팅
- 데이터 변환 함수 중복 제거
- 타입 안전성 보장

## 🐛 주요 이슈 및 해결

### 1. CSV 인코딩 문제
**문제**: CSV 파일이 EUC-KR 인코딩으로 되어 있어 한글이 깨짐
**해결**: `iconv`를 사용하여 UTF-8로 변환

### 2. 토요일 데이터 누락
**문제**: CSV 헤더에 `\r` 문자가 포함되어 토요일 데이터가 파싱되지 않음
**해결**: 헤더와 데이터 값에 `trim()` 적용 및 줄바꿈 정규화

### 3. 한글 URL 인코딩 문제
**문제**: `generateStaticParams`에서 `encodeURIComponent`를 사용하여 이중 인코딩 발생
**해결**: Next.js가 자동으로 인코딩하므로 원본 값을 그대로 반환

### 4. Next.js 16 params Promise
**문제**: Next.js 16에서 `params`가 Promise로 변경됨
**해결**: `async` 함수로 변경하고 `await params` 사용

## 📊 데이터 통계

- **총 데이터 건수**: 1,500,000건 이상
- **범죄 유형 수**: 38개
- **범죄 대분류 수**: 15개
- **시간대 구분**: 8개 (0시-23시)
- **요일 구분**: 7개 (일-토)

## 🔗 관련 링크

- **배포 사이트**: [https://crime-insight.vercel.app](https://crime-insight.vercel.app)
- **개발 블로그**: [개발 과정 상세 설명](https://dowankim.site/blog/정적%20인터랙티브%20대시보드)
- **포트폴리오**: [https://dowankim.site](https://dowankim.site)

## 📝 라이선스

이 프로젝트는 웹응용프로그래밍(교수 한상곤) 과제 프로젝트입니다.

## 👤 개발자

**김도완** - 프론트엔드 개발자
- 포트폴리오: [https://dowankim.site](https://dowankim.site)

## 🙏 감사의 말

- 공공데이터포털 경찰청 범죄 발생 데이터 제공
- Next.js 및 Recharts 커뮤니티

---

**© 2024 Crime Insight 2019. 공공데이터포털 경찰청 데이터 기반.**
