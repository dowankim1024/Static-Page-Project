# Crime Insight 2019

범죄 발생의 시간적, 요일별 패턴을 분석하고, 사용자가 특정 범죄 유형을 검색하여 상세 통계를 확인할 수 있는 정적 웹사이트입니다.

## 📋 프로젝트 개요

**프로젝트명**: Crime Insight 2019

**목표**: 범죄 발생의 시간적, 요일별 패턴을 분석하고, 사용자가 특정 범죄 유형을 검색하여 상세 통계를 확인할 수 있는 정적 웹사이트 구축

**기술 스택**: 
- Next.js (App Router)
- Tailwind CSS
- Recharts
- TypeScript

**데이터 출처**: 공공데이터포털 경찰청 범죄 발생 시간대 및 요일 CSV 파일

## 🎯 프로젝트 목표

1. Next.js를 사용해서 정적 홈페이지를 작성하는 것을 연습
2. 데이터를 활용해서 인터랙티브한 대시보드를 구축
3. 간단한 아이디어를 손쉽게 사람들에게 선보일 수 있는 능력 향상

## ✨ 주요 기능

1. **최소한 4개의 페이지(3개의 URL)**
   - `/` (index) - 홈 페이지
   - `/about` - 프로젝트 소개
   - `/dashboard` - 대시보드 (검색 기능 포함)
   - `/detail/[category_middle]` - 범죄 유형별 상세 페이지

2. **데이터 검색 기능**
   - 검색 결과를 클릭하면 세부사항을 확인할 수 있음 (detail 페이지 재활용)

3. **Dashboard 차트 시각화**
   - 요일별 발생 현황 (Bar Chart)
   - 시간대별 발생 현황 (Area Chart or Line Chart)
   - 범죄 대분류 비중 (Pie Chart)

4. **배포 준비**
   - 정적 사이트로 배포 가능

## 🗺️ 사이트맵

```
/
├── / (Home)
│   └── Hero Section + Key Metric
├── /about
│   └── 프로젝트 정보 및 기술 스택
└── /dashboard
    ├── 검색창
    ├── 종합 차트
    └── 범죄 목록 리스트
    └── /detail/[category_middle]
        └── 범죄별 상세 분석
```

## 📄 페이지 상세 기획

### ① Home (`/`)

- **Hero Section**: "언제, 어디서 범죄가 가장 많이 발생할까?" 문구
- **Key Metric**: 총 데이터 건수 (예: "총 1,500,000건의 데이터 분석")를 큰 숫자로 표시
- **Navigation**: '대시보드' 버튼

### ② About (`/about`)

- **Info**: 공공데이터포털 경찰청 데이터셋에 대한 설명
- **Tech Stack**: Next.js, Tailwind CSS 아이콘 배치
- **Developer**: 프로필 링크

### ③ Dashboard (`/dashboard`) - 핵심 페이지

- **검색창 (Search Bar)**: "범죄 유형을 검색하세요 (예: 사기, 절도)"
  - 입력 시 실시간으로 리스트 필터링
- **종합 차트 (Aggregate Charts)**:
  - 요일별 발생 현황 (Bar Chart): 월~일요일 중 언제 범죄가 가장 많은지?
  - 시간대별 발생 현황 (Area Chart or Line Chart): 하루 중 범죄 발생 피크 타임은?
  - 범죄 대분류 비중 (Pie Chart): 지능범죄 vs 강력범죄 등 비율
- **범죄 목록 리스트**: 검색 결과에 따른 리스트 출력 (클릭 시 Detail 페이지로 이동)

### ④ Detail (`/detail/[category_middle]`)

예: 사용자가 '절도'를 클릭했을 때

- **Header**: "절도" 범죄 분석 보고서
- **Specific Charts**: 전체 평균과 비교한 해당 범죄의 특징
  - (예: 전체 범죄는 밤에 많은데, '절도'는 낮에 많은가?)
- **Table**: 구체적인 수치 데이터 테이블 표시