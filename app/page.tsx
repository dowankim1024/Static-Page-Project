import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-50">
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
        <div className="mt-12 text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-md bg-gray-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800"
          >
            대시보드 보기
          </Link>
        </div>
      </section>
    </div>
  );
}
