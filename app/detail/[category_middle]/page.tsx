interface DetailPageProps {
  params: {
    category_middle: string;
  };
}

export default function DetailPage({ params }: DetailPageProps) {
  // URL 파라미터에서 범죄 유형을 가져옴 (예: "사기", "절도")
  const categoryName = decodeURIComponent(params.category_middle);

  return (
    <div className="bg-gray-50">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Header: 범죄 유형별 분석 보고서 */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {categoryName} 범죄 분석 보고서
          </h1>
          <p className="text-gray-600 mb-8">
            {categoryName} 범죄에 대한 상세 통계를 확인할 수 있습니다.
          </p>

          {/* Specific Charts: 전체 평균과 비교한 해당 범죄의 특징 */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                전체 평균과 비교
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                전체 범죄는 밤에 많은데, '{categoryName}'는 언제 많은가?
              </p>
              <div className="h-48 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 rounded">
                비교 차트 영역 (추후 구현)
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                시간대별 특징
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {categoryName} 범죄의 시간대별 발생 패턴
              </p>
              <div className="h-48 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 rounded">
                특징 차트 영역 (추후 구현)
              </div>
            </div>
          </div>

          {/* Table: 구체적인 수치 데이터 테이블 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              구체적인 수치 데이터
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      항목
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      값
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      요일별 발생 건수
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      데이터 연동 후 표시 (추후 구현)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      시간대별 발생 건수
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      데이터 연동 후 표시 (추후 구현)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

