import fs from 'fs';
import path from 'path';
import {
  CrimeRecord,
  TimeSlot,
  DayOfWeek,
  DashboardStats,
  TimeSlotData,
  DayOfWeekData,
  CategoryMajorData,
} from '@/types/crime';

// CSV 파일에서 범죄 데이터 읽기
export function parseCrimeData(): CrimeRecord[] {
  const filePath = path.join(process.cwd(), 'data', 'crime_data.csv');
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  
  // \r\n 또는 \n으로 줄바꿈 처리하고, 각 줄의 \r 제거
  const lines = fileContents
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);
  
  // 헤더에서 각 컬럼의 앞뒤 공백 제거
  const headers = lines[0].split(',').map(header => header.trim());
  
  // 헤더 인덱스 찾기
  const categoryMajorIdx = headers.indexOf('범죄대분류');
  const categoryMiddleIdx = headers.indexOf('범죄중분류');
  
  // 시간대 컬럼 인덱스 찾기
  const timeSlotColumns: Array<{ slot: TimeSlot; idx: number }> = [
    '0시00분-02시59분',
    '03시00분-05시59분',
    '06시00분-08시59분',
    '09시00분-11시59분',
    '12시00분-14시59분',
    '15시00분-17시59분',
    '18시00분-20시59분',
    '21시00분-23시59분',
    '미상',
  ].map((slot) => ({
    slot: slot as TimeSlot,
    idx: headers.indexOf(slot),
  }));
  
  // 요일 컬럼 인덱스 찾기
  const daysOfWeek: DayOfWeek[] = ['일', '월', '화', '수', '목', '금', '토'];
  const dayColumns: Array<{ day: DayOfWeek; idx: number }> = daysOfWeek.map((day) => ({
    day,
    idx: headers.indexOf(day),
  }));
  
  // 데이터 파싱
  const records: CrimeRecord[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    
    // 각 값의 앞뒤 공백 제거
    const values = line.split(',').map(value => value.trim());
    
    const categoryMajor = values[categoryMajorIdx];
    const categoryMiddle = values[categoryMiddleIdx];
    
    // 시간대별 데이터 파싱
    const timeSlots: Record<TimeSlot, number> = {} as Record<TimeSlot, number>;
    let timeSlotTotal = 0;
    
    for (const { slot, idx } of timeSlotColumns) {
      const count = parseInt(values[idx] || '0', 10);
      timeSlots[slot] = count;
      timeSlotTotal += count;
    }
    
    // 요일별 데이터 파싱
    const daysOfWeekData: Record<DayOfWeek, number> = {} as Record<DayOfWeek, number>;
    let dayTotal = 0;
    
    for (const { day, idx } of dayColumns) {
      const count = parseInt(values[idx] || '0', 10);
      daysOfWeekData[day] = count;
      dayTotal += count;
    }
    
    records.push({
      categoryMajor,
      categoryMiddle,
      timeSlots,
      daysOfWeek: daysOfWeekData,
      total: timeSlotTotal + dayTotal,
    });
  }
  
  return records;
}

// 대시보드 통계 계산
export function calculateDashboardStats(records: CrimeRecord[]): DashboardStats {
  // 전체 범죄 건수
  const totalCrimes = records.reduce((sum, record) => sum + record.total, 0);
  
  // 범죄 대분류별 합계
  const categoryMajorMap = new Map<string, number>();
  records.forEach((record) => {
    const current = categoryMajorMap.get(record.categoryMajor) || 0;
    categoryMajorMap.set(record.categoryMajor, current + record.total);
  });
  
  const categoryMajorTotals: CategoryMajorData[] = Array.from(
    categoryMajorMap.entries()
  )
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
  
  // 시간대별 전체 합계
  const timeSlotMap = new Map<string, number>();
  records.forEach((record) => {
    Object.entries(record.timeSlots).forEach(([slot, count]) => {
      const current = timeSlotMap.get(slot) || 0;
      timeSlotMap.set(slot, current + count);
    });
  });
  
  const timeSlotTotals: TimeSlotData[] = [
    '0시00분-02시59분',
    '03시00분-05시59분',
    '06시00분-08시59분',
    '09시00분-11시59분',
    '12시00분-14시59분',
    '15시00분-17시59분',
    '18시00분-20시59분',
    '21시00분-23시59분',
    '미상',
  ]
    .map((slot) => ({
      time: slot,
      count: timeSlotMap.get(slot) || 0,
    }))
    .filter((item) => item.time !== '미상'); // 미상 제외
  
  // 요일별 전체 합계
  const dayMap = new Map<DayOfWeek, number>();
  records.forEach((record) => {
    Object.entries(record.daysOfWeek).forEach(([day, count]) => {
      const current = dayMap.get(day as DayOfWeek) || 0;
      dayMap.set(day as DayOfWeek, current + count);
    });
  });
  
  const dayOrder: DayOfWeek[] = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeekTotals: DayOfWeekData[] = dayOrder.map((day) => ({
    day,
    count: dayMap.get(day) || 0,
  }));
  
  // 가장 많이 발생한 범죄 (상위 10개)
  const topCrimes = records
    .map((record) => ({
      categoryMajor: record.categoryMajor,
      categoryMiddle: record.categoryMiddle,
      total: record.total,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);
  
  return {
    totalCrimes,
    categoryMajorTotals,
    timeSlotTotals,
    dayOfWeekTotals,
    topCrimes,
  };
}

// 범죄 중분류로 데이터 찾기
export function findCrimeByCategoryMiddle(
  records: CrimeRecord[],
  categoryMiddle: string
): CrimeRecord | undefined {
  return records.find(
    (record) => record.categoryMiddle === decodeURIComponent(categoryMiddle)
  );
}

// 범죄 대분류로 데이터 찾기
export function findCrimesByCategoryMajor(
  records: CrimeRecord[],
  categoryMajor: string
): CrimeRecord[] {
  return records.filter((record) => record.categoryMajor === categoryMajor);
}

