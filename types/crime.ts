// 범죄 데이터 타입 정의

// 시간대 타입
export type TimeSlot = 
  | '0시00분-02시59분'
  | '03시00분-05시59분'
  | '06시00분-08시59분'
  | '09시00분-11시59분'
  | '12시00분-14시59분'
  | '15시00분-17시59분'
  | '18시00분-20시59분'
  | '21시00분-23시59분'
  | '미상';

// 요일 타입
export type DayOfWeek = '일' | '월' | '화' | '수' | '목' | '금' | '토';

// 범죄 데이터 행 타입
export interface CrimeRecord {
  // 범죄 대분류 (예: 강력범죄, 절도범죄, 폭력범죄 등)
  categoryMajor: string;
  
  // 범죄 중분류 (예: 살인기수, 강도, 사기 등)
  categoryMiddle: string;
  
  // 시간대별 발생 건수
  timeSlots: Record<TimeSlot, number>;
  
  // 요일별 발생 건수
  daysOfWeek: Record<DayOfWeek, number>;
  
  // 전체 합계
  total: number;
}

// 차트 데이터용 타입
export interface TimeSlotData {
  time: string;
  count: number;
}

export interface DayOfWeekData {
  day: DayOfWeek;
  count: number;
}

export interface CategoryMajorData {
  category: string;
  count: number;
}

// 대시보드 통계 타입
export interface DashboardStats {
  // 전체 범죄 건수
  totalCrimes: number;
  
  // 범죄 대분류별 합계
  categoryMajorTotals: CategoryMajorData[];
  
  // 시간대별 전체 합계
  timeSlotTotals: TimeSlotData[];
  
  // 요일별 전체 합계
  dayOfWeekTotals: DayOfWeekData[];
  
  // 가장 많이 발생한 범죄
  topCrimes: Array<{
    categoryMajor: string;
    categoryMiddle: string;
    total: number;
  }>;
}
