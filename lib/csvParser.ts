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
import { TIME_SLOT_ORDER, DAY_ORDER } from './dataFormatters';

// CSV 파일에서 범죄 데이터 읽기
export function parseCrimeData(): CrimeRecord[] {
  try {
    const filePath = path.join(process.cwd(), 'data', 'crime_data.csv');
    
    // 파일 존재 여부 확인
    if (!fs.existsSync(filePath)) {
      throw new Error(`CSV 파일을 찾을 수 없습니다: ${filePath}`);
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf-8');
  
    // \r\n 또는 \n으로 줄바꿈 처리하고, 각 줄의 \r 제거
    const lines = fileContents
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
    
    if (lines.length === 0) {
      throw new Error('CSV 파일이 비어있습니다.');
    }
    
    // 헤더에서 각 컬럼의 앞뒤 공백 제거
    const headers = lines[0].split(',').map(header => header.trim());
    
    // 헤더 인덱스 찾기
    const categoryMajorIdx = headers.indexOf('범죄대분류');
    const categoryMiddleIdx = headers.indexOf('범죄중분류');
    
    if (categoryMajorIdx === -1 || categoryMiddleIdx === -1) {
      throw new Error('CSV 파일의 필수 컬럼(범죄대분류, 범죄중분류)을 찾을 수 없습니다.');
    }
    
    // 시간대 컬럼 인덱스 찾기
    const timeSlotColumns: Array<{ slot: TimeSlot; idx: number }> = [
      ...TIME_SLOT_ORDER,
      '미상' as TimeSlot,
    ].map((slot) => ({
      slot: slot as TimeSlot,
      idx: headers.indexOf(slot),
    }));
    
    // 요일 컬럼 인덱스 찾기
    const dayColumns: Array<{ day: DayOfWeek; idx: number }> = DAY_ORDER.map((day) => ({
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
      
      if (!categoryMajor || !categoryMiddle) {
        console.warn(`행 ${i + 1}: 범죄 대분류 또는 중분류가 없습니다. 건너뜁니다.`);
        continue;
      }
      
      // 시간대별 데이터 파싱
      const timeSlots: Record<TimeSlot, number> = {} as Record<TimeSlot, number>;
      let timeSlotTotal = 0;
      
      for (const { slot, idx } of timeSlotColumns) {
        const count = parseInt(values[idx] || '0', 10);
        if (isNaN(count)) {
          console.warn(`행 ${i + 1}, 시간대 ${slot}: 숫자 변환 실패. 0으로 처리합니다.`);
        }
        timeSlots[slot] = isNaN(count) ? 0 : count;
        timeSlotTotal += isNaN(count) ? 0 : count;
      }
      
      // 요일별 데이터 파싱
      const daysOfWeekData: Record<DayOfWeek, number> = {} as Record<DayOfWeek, number>;
      let dayTotal = 0;
      
      for (const { day, idx } of dayColumns) {
        const count = parseInt(values[idx] || '0', 10);
        if (isNaN(count)) {
          console.warn(`행 ${i + 1}, 요일 ${day}: 숫자 변환 실패. 0으로 처리합니다.`);
        }
        daysOfWeekData[day] = isNaN(count) ? 0 : count;
        dayTotal += isNaN(count) ? 0 : count;
      }
      
      records.push({
        categoryMajor,
        categoryMiddle,
        timeSlots,
        daysOfWeek: daysOfWeekData,
        total: timeSlotTotal + dayTotal,
      });
    }
    
    if (records.length === 0) {
      throw new Error('CSV 파일에서 유효한 데이터를 찾을 수 없습니다.');
    }
    
    return records;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`데이터 파싱 중 오류가 발생했습니다: ${error.message}`);
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
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
  
  const timeSlotTotals: TimeSlotData[] = TIME_SLOT_ORDER.map((slot) => ({
    time: slot,
    count: timeSlotMap.get(slot) || 0,
  }));
  
  // 요일별 전체 합계
  const dayMap = new Map<DayOfWeek, number>();
  records.forEach((record) => {
    Object.entries(record.daysOfWeek).forEach(([day, count]) => {
      const current = dayMap.get(day as DayOfWeek) || 0;
      dayMap.set(day as DayOfWeek, current + count);
    });
  });
  
  const dayOfWeekTotals: DayOfWeekData[] = DAY_ORDER.map((day) => ({
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

// 전체 평균 계산 (비교 차트용)
export function calculateAverageStats(records: CrimeRecord[]): {
  timeSlotAverages: TimeSlotData[];
  dayOfWeekAverages: DayOfWeekData[];
} {
  const recordCount = records.length;
  
  // 시간대별 평균
  const timeSlotSum = new Map<string, number>();
  records.forEach((record) => {
    Object.entries(record.timeSlots).forEach(([slot, count]) => {
      if (slot !== '미상') {
        const current = timeSlotSum.get(slot) || 0;
        timeSlotSum.set(slot, current + count);
      }
    });
  });
  
  const timeSlotAverages: TimeSlotData[] = TIME_SLOT_ORDER.map((slot) => ({
    time: slot,
    count: Math.round((timeSlotSum.get(slot) || 0) / recordCount),
  }));
  
  // 요일별 평균
  const daySum = new Map<DayOfWeek, number>();
  records.forEach((record) => {
    Object.entries(record.daysOfWeek).forEach(([day, count]) => {
      const current = daySum.get(day as DayOfWeek) || 0;
      daySum.set(day as DayOfWeek, current + count);
    });
  });
  
  const dayOfWeekAverages: DayOfWeekData[] = DAY_ORDER.map((day) => ({
    day,
    count: Math.round((daySum.get(day) || 0) / recordCount),
  }));
  
  return {
    timeSlotAverages,
    dayOfWeekAverages,
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
