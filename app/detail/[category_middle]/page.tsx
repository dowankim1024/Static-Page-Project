import { parseCrimeData, findCrimeByCategoryMiddle, calculateAverageStats } from '@/lib/csvParser';
import BarChart from '@/components/charts/BarChart';
import LineChart from '@/components/charts/LineChart';
import ComparisonChart from '@/components/charts/ComparisonChart';
import { TimeSlotData, DayOfWeekData } from '@/types/crime';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface DetailPageProps {
  params: Promise<{
    category_middle: string;
  }>;
}

export default async function DetailPage({ params }: DetailPageProps) {
  // URL 파라미터에서 범죄 유형을 가져옴 (Next.js 15+에서는 params가 Promise)
  const { category_middle } = await params;
  const categoryName = decodeURIComponent(category_middle);
  
  // CSV 데이터 파싱
  const records = parseCrimeData();
  
  // 해당 범죄 데이터 찾기
  const crimeData = findCrimeByCategoryMiddle(records, categoryName);
  
  // 데이터가 없으면 404 페이지로 이동
  if (!crimeData) {
    notFound();
  }
  
  // 전체 평균 계산
  const averageStats = calculateAverageStats(records);
  
  // 해당 범죄의 시간대별 데이터 포맷팅
  const timeSlotData: TimeSlotData[] = [
    '0시00분-02시59분',
    '03시00분-05시59분',
    '06시00분-08시59분',
    '09시00분-11시59분',
    '12시00분-14시59분',
    '15시00분-17시59분',
    '18시00분-20시59분',
    '21시00분-23시59분',
  ]
    .map((slot) => ({
      time: slot,
      count: crimeData.timeSlots[slot as keyof typeof crimeData.timeSlots] || 0,
    }));
  
  // 해당 범죄의 요일별 데이터 포맷팅
  const dayOrder: Array<'일' | '월' | '화' | '수' | '목' | '금' | '토'> = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeekData: DayOfWeekData[] = dayOrder.map((day) => ({
    day,
    count: crimeData.daysOfWeek[day] || 0,
  }));

  return (
    <div className="bg-gray-50">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Header */}
          <div className="mb-6">
            <Link
              href="/dashboard"
              className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block"
            >
              ← 대시보드로 돌아가기
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {categoryName} 범죄 분석 보고서
            </h1>
            <p className="text-gray-600 mb-4">
              {categoryName} 범죄에 대한 상세 통계를 확인할 수 있습니다.
            </p>
            <div className="flex gap-4 text-sm">
              <div className="bg-gray-100 px-4 py-2 rounded">
                <span className="text-gray-600">대분류: </span>
                <span className="font-semibold text-gray-900">{crimeData.categoryMajor}</span>
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded">
                <span className="text-gray-600">전체 발생 건수: </span>
                <span className="font-semibold text-gray-900">{crimeData.total.toLocaleString()}건</span>
              </div>
            </div>
          </div>

          {/* 비교 차트 섹션 */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8">
            {/* 요일별 비교 차트 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                요일별 비교 (전체 평균 vs {categoryName})
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                전체 범죄 평균과 {categoryName} 범죄의 요일별 발생 패턴을 비교합니다.
              </p>
              <div className="h-64">
                <ComparisonChart
                  data={dayOfWeekData}
                  averageData={averageStats.dayOfWeekAverages}
                  dataKey="count"
                  xAxisKey="day"
                  dataLabel={categoryName}
                  averageLabel="전체 평균"
                />
              </div>
            </div>

            {/* 시간대별 비교 차트 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                시간대별 비교 (전체 평균 vs {categoryName})
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                전체 범죄 평균과 {categoryName} 범죄의 시간대별 발생 패턴을 비교합니다.
              </p>
              <div className="h-64">
                <ComparisonChart
                  data={timeSlotData}
                  averageData={averageStats.timeSlotAverages}
                  dataKey="count"
                  xAxisKey="time"
                  dataLabel={categoryName}
                  averageLabel="전체 평균"
                />
              </div>
            </div>
          </div>

          {/* 개별 차트 섹션 */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8">
            {/* 요일별 발생 현황 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {categoryName} 요일별 발생 현황
              </h3>
              <div className="h-64">
                <BarChart
                  data={dayOfWeekData}
                  dataKey="count"
                  xAxisKey="day"
                />
              </div>
            </div>

            {/* 시간대별 발생 현황 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {categoryName} 시간대별 발생 현황
              </h3>
              <div className="h-64">
                <LineChart data={timeSlotData} />
              </div>
            </div>
          </div>

          {/* 상세 데이터 테이블 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              구체적인 수치 데이터
            </h3>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* 요일별 데이터 테이블 */}
                <div>
                  <h4 className="text-md font-medium text-gray-700 mb-3">요일별 발생 건수</h4>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          요일
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          발생 건수
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          비율
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {dayOfWeekData.map((day) => {
                        const percentage = ((day.count / crimeData.total) * 100).toFixed(1);
                        return (
                          <tr key={day.day} className="hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                              {day.day}요일
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                              {day.count.toLocaleString()}건
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                              {percentage}%
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* 시간대별 데이터 테이블 */}
                <div>
                  <h4 className="text-md font-medium text-gray-700 mb-3">시간대별 발생 건수</h4>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          시간대
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          발생 건수
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          비율
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {timeSlotData.map((timeSlot) => {
                        const percentage = ((timeSlot.count / crimeData.total) * 100).toFixed(1);
                        const timeLabel = timeSlot.time
                          .replace('시00분-', '-')
                          .replace('시59분', '시');
                        return (
                          <tr key={timeSlot.time} className="hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                              {timeLabel}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                              {timeSlot.count.toLocaleString()}건
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                              {percentage}%
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
