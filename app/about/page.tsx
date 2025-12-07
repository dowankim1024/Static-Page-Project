export default function About() {
  return (
    <div className="bg-gray-50">
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

          {/* Developer Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">개발자</h2>
            <p className="text-gray-600">
              프로젝트에 대한 문의사항이나 피드백이 있으시면 언제든지 연락주세요.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

