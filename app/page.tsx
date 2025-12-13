import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "홈",
  description: "범죄 발생의 시간적, 요일별 패턴을 분석하여 데이터 기반 인사이트를 제공합니다. 2019년 경찰청 범죄 데이터를 기반으로 한 종합 분석 대시보드입니다.",
  openGraph: {
    title: "Crime Insight 2019 - 범죄 발생 패턴 분석",
    description: "언제, 어디서 범죄가 가장 많이 발생할까? 2019년 경찰청 범죄 데이터를 기반으로 한 종합 분석 대시보드",
  },
};

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            언제, 어디서 범죄가
            <br />
            가장 많이 발생할까?
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            범죄 발생의 시간적, 요일별 패턴을 분석하여 데이터 기반 인사이트를 제공합니다.
          </p>
        </div>

        {/* Key Metric */}
        <div className="mt-16 text-center">
          <div className="inline-block rounded-lg bg-white px-8 py-6 shadow-lg">
            <p className="text-sm font-medium text-gray-600">총 데이터 건수</p>
            <p className="mt-2 text-5xl font-bold text-gray-900">
              1,500,000<span className="text-2xl">건</span>
            </p>
            <p className="mt-2 text-sm text-gray-500">의 데이터 분석</p>
          </div>
        </div>

        {/* Navigation Button */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-md bg-gray-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800"
          >
            대시보드 보기
          </Link>
          <Link
            href="https://dowankim.site/blog/%EC%A0%95%EC%A0%81%20%EC%9D%B8%ED%84%B0%EB%9E%99%ED%8B%B0%EB%B8%8C%20%EB%8C%80%EC%8B%9C%EB%B3%B4%EB%93%9C"
            className="inline-flex items-center rounded-md bg-gray-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-400"
          >
            개발 블로그 바로가기
          </Link>
        </div>
      </section>
    </div>
  );
}
