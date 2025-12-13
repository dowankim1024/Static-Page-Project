import type { Metadata } from "next";
import { parseCrimeData, findCrimeByCategoryMiddle, calculateAverageStats } from '@/lib/csvParser';
import {
  convertCrimeRecordsToTableData,
  convertCrimeRecordToTimeSlotData,
  convertCrimeRecordToDayOfWeekData,
  formatTimeSlotLabel,
  extractCategoryMiddleList,
} from '@/lib/dataFormatters';
import ChartCard from '@/components/ChartCard';
import CrimeSelector from '@/components/CrimeSelector';
import BarChart from '@/components/charts/BarChart';
import LineChart from '@/components/charts/LineChart';
import ComparisonChart from '@/components/charts/ComparisonChart';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface DetailPageProps {
  params: Promise<{
    category_middle: string;
  }>;
}

// 동적 메타데이터 생성
export async function generateMetadata({ params }: DetailPageProps): Promise<Metadata> {
  const { category_middle } = await params;
  // Next.js가 자동으로 디코딩하므로 decodeURIComponent 불필요
  // 이중 인코딩 방지를 위해 안전하게 처리
  const categoryName = category_middle.includes('%') 
    ? decodeURIComponent(category_middle) 
    : category_middle;
  
  const records = parseCrimeData();
  const crimeData = findCrimeByCategoryMiddle(records, categoryName);
  
  if (!crimeData) {
    return {
      title: "페이지를 찾을 수 없습니다",
      description: "요청하신 범죄 유형을 찾을 수 없습니다.",
    };
  }
  
  return {
    title: `${categoryName} 범죄 분석`,
    description: `${categoryName} 범죄의 시간대별, 요일별 발생 패턴을 분석한 상세 통계. 전체 범죄 평균과 비교하여 ${categoryName} 범죄의 특성을 확인할 수 있습니다. 총 ${crimeData.total.toLocaleString()}건의 데이터를 분석했습니다.`,
    keywords: [categoryName, "범죄 통계", "범죄 분석", crimeData.categoryMajor],
    openGraph: {
      title: `${categoryName} 범죄 분석 보고서 | Crime Insight 2019`,
      description: `${categoryName} 범죄의 시간대별, 요일별 발생 패턴과 전체 평균과의 비교 분석`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryName} 범죄 분석`,
      description: `${categoryName} 범죄 발생 패턴 분석 - 총 ${crimeData.total.toLocaleString()}건`,
    },
  };
}

// 정적 페이지 생성을 위한 경로 생성
export async function generateStaticParams() {
  const records = parseCrimeData();
  const categoryMiddleList = extractCategoryMiddleList(records);
  
  // Next.js가 자동으로 URL 인코딩을 처리하므로 인코딩하지 않음
  return categoryMiddleList.map((categoryMiddle) => ({
    category_middle: categoryMiddle,
  }));
}

// generateStaticParams에 없는 경로는 404 반환 (완전한 SSG 보장)
export const dynamicParams = false;

export default async function DetailPage({ params }: DetailPageProps) {
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
  
  // 범죄 목록 데이터 (드롭다운용)
  const crimeListData = convertCrimeRecordsToTableData(records);
  
  // 해당 범죄의 시간대별 데이터 포맷팅
  const timeSlotData = convertCrimeRecordToTimeSlotData(crimeData);
  
  // 해당 범죄의 요일별 데이터 포맷팅
  const dayOfWeekData = convertCrimeRecordToDayOfWeekData(crimeData);

  return (
    <div className="bg-gray-50">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <Link
                href="/dashboard"
                className="text-sm text-gray-500 hover:text-gray-700 inline-block"
              >
                ← 대시보드로 돌아가기
              </Link>
              <CrimeSelector crimes={crimeListData} currentCrime={categoryName} />
            </div>
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
            <ChartCard
              title={`요일별 비교 (전체 평균 vs ${categoryName})`}
              description={`전체 범죄 평균과 ${categoryName} 범죄의 요일별 발생 패턴을 비교합니다.`}
              variant="comparison"
            >
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
            </ChartCard>

            {/* 시간대별 비교 차트 */}
            <ChartCard
              title={`시간대별 비교 (전체 평균 vs ${categoryName})`}
              description={`전체 범죄 평균과 ${categoryName} 범죄의 시간대별 발생 패턴을 비교합니다.`}
              variant="comparison"
            >
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
            </ChartCard>
          </div>

          {/* 개별 차트 섹션 */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8">
            {/* 요일별 발생 현황 */}
            <ChartCard title={`${categoryName} 요일별 발생 현황`}>
              <div className="h-64">
                <BarChart
                  data={dayOfWeekData}
                  dataKey="count"
                  xAxisKey="day"
                />
              </div>
            </ChartCard>

            {/* 시간대별 발생 현황 */}
            <ChartCard title={`${categoryName} 시간대별 발생 현황`}>
              <div className="h-64">
                <LineChart data={timeSlotData} />
              </div>
            </ChartCard>
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
                        const timeLabel = formatTimeSlotLabel(timeSlot.time);
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
