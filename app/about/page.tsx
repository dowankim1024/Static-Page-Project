import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "프로젝트 소개",
  description: "Crime Insight 2019 프로젝트 소개. 공공데이터포털 경찰청 범죄 발생 시간대 및 요일 데이터를 기반으로 한 범죄 통계 분석 대시보드입니다. 프론트엔드 개발자 김도완이 Next.js, TypeScript, Recharts를 활용하여 구현되었습니다.",
  openGraph: {
    title: "프로젝트 소개 | Crime Insight 2019",
    description: "공공데이터포털 경찰청 범죄 발생 데이터를 기반으로 한 범죄 통계 분석 대시보드 프로젝트 소개",
  },
};

export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">프로젝트 소개</h1>
          
          {/* Info Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">데이터 출처</h2>
            <p className="text-gray-600 leading-relaxed">
              본 프로젝트는 공공데이터포털에서 제공하는 경찰청 범죄 발생 시간대 및 요일 데이터를 기반으로 합니다.
              범죄 발생의 시간적, 요일별 패턴을 분석하여 시각화한 대시보드를 제공합니다.
            </p>
          </div>

          {/* Enginner Info Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">개발자 정보</h2>
            <div className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2">
                <Link href="https://dowankim.site" target="_blank" className="text-gray-600 hover:text-gray-900">김도완 포트폴리오 사이트</Link>
              </div>

          </div>

          {/* Blog Link Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">블로그 링크</h2>
            <div className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2">
              <Link href="https://dowankim.site/blog/%EC%A0%95%EC%A0%81%20%EC%9D%B8%ED%84%B0%EB%9E%99%ED%8B%B0%EB%B8%8C%20%EB%8C%80%EC%8B%9C%EB%B3%B4%EB%93%9C" target="_blank" className="text-gray-600 hover:text-gray-900">개발 블로그 바로가기</Link>
            </div>
          </div>

          {/* Tech Stack Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">기술 스택</h2>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2">
                <span className="text-sm font-medium text-gray-700">Next.js</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2">
                <span className="text-sm font-medium text-gray-700">Tailwind CSS</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2">
                <span className="text-sm font-medium text-gray-700">TypeScript</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2">
                <span className="text-sm font-medium text-gray-700">Recharts</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

