import { parseCrimeData, calculateDashboardStats } from '@/lib/csvParser';
import { convertCrimeRecordsToTableData, extractCategoryMiddleList } from '@/lib/dataFormatters';
import SearchBar from '@/components/SearchBar';
import CrimeList from '@/components/CrimeList';
import BarChart from '@/components/charts/BarChart';
import LineChart from '@/components/charts/LineChart';
import PieChart from '@/components/charts/PieChart';

export default function Dashboard() {
  // CSV 데이터 파싱
  const records = parseCrimeData();
  
  // 대시보드 통계 계산
  const stats = calculateDashboardStats(records);
  
  // 검색용 범죄 목록 (중분류만)
  const crimeList = extractCategoryMiddleList(records);
  
  // 범죄 목록 데이터 (테이블용)
  const crimeListData = convertCrimeRecordsToTableData(records);

  return (
    <div className="bg-gray-50">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">대시보드</h1>
        
        {/* 통계 요약 */}
        <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">전체 범죄 건수</h3>
            <p className="text-3xl font-bold text-gray-900">
              {stats.totalCrimes.toLocaleString()}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">범죄 유형 수</h3>
            <p className="text-3xl font-bold text-gray-900">
              {records.length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">범죄 대분류 수</h3>
            <p className="text-3xl font-bold text-gray-900">
              {stats.categoryMajorTotals.length}
            </p>
          </div>
        </div>
        
        {/* Search Bar with Autocomplete */}
        <div className="mb-8">
          <SearchBar crimeList={crimeList} />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8">
          {/* 요일별 발생 현황 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">요일별 발생 현황</h2>
            <div className="h-64">
              <BarChart 
                data={stats.dayOfWeekTotals}
                dataKey="count"
                xAxisKey="day"
              />
            </div>
          </div>

          {/* 시간대별 발생 현황 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">시간대별 발생 현황</h2>
            <div className="h-64">
              <LineChart data={stats.timeSlotTotals} />
            </div>
          </div>
        </div>

        {/* 범죄 대분류 비중 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">범죄 대분류 비중</h2>
          <div className="h-96">
            <PieChart data={stats.categoryMajorTotals} />
          </div>
        </div>

        {/* 범죄 목록 리스트 (테이블) */}
        <div className="mb-8">
          <CrimeList crimes={crimeListData} />
        </div>
      </section>
    </div>
  );
}
