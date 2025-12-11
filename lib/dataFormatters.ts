import { CrimeRecord, TimeSlotData, DayOfWeekData, TimeSlot, DayOfWeek } from '@/types/crime';

// 시간대 순서 (미상 제외)
export const TIME_SLOT_ORDER: TimeSlot[] = [
  '0시00분-02시59분',
  '03시00분-05시59분',
  '06시00분-08시59분',
  '09시00분-11시59분',
  '12시00분-14시59분',
  '15시00분-17시59분',
  '18시00분-20시59분',
  '21시00분-23시59분',
];

// 요일 순서
export const DAY_ORDER: DayOfWeek[] = ['일', '월', '화', '수', '목', '금', '토'];

/**
 * 시간대 라벨을 단축 형식으로 변환
 * "0시00분-02시59분" -> "0시-3시" 또는 "0시" (차트용)
 * @param timeSlot - 시간대 문자열
 * @param short - true면 "0시" 형식, false면 "0시-3시" 형식
 */
export function formatTimeSlotLabel(timeSlot: string, short: boolean = false): string {
  if (timeSlot === '미상') return timeSlot;
  
  let formatted = timeSlot
    .replace('시00분-', '-')
    .replace('시59분', '시');
  
  if (short) {
    // "0시-3시" -> "0시"
    formatted = formatted.split('-')[0] + '시';
  }
  
  return formatted;
}

/**
 * CrimeRecord를 TimeSlotData[]로 변환
 * @param record - 범죄 데이터 레코드
 * @param excludeUnknown - 미상 데이터 제외 여부 (기본: true)
 */
export function convertCrimeRecordToTimeSlotData(
  record: CrimeRecord,
  excludeUnknown: boolean = true
): TimeSlotData[] {
  const slots = excludeUnknown ? TIME_SLOT_ORDER : [...TIME_SLOT_ORDER, '미상' as TimeSlot];
  
  return slots.map((slot) => ({
    time: slot,
    count: record.timeSlots[slot] || 0,
  }));
}

/**
 * CrimeRecord를 DayOfWeekData[]로 변환
 * @param record - 범죄 데이터 레코드
 */
export function convertCrimeRecordToDayOfWeekData(record: CrimeRecord): DayOfWeekData[] {
  return DAY_ORDER.map((day) => ({
    day,
    count: record.daysOfWeek[day] || 0,
  }));
}

/**
 * 범죄 목록 데이터를 테이블용 형식으로 변환
 * @param records - 범죄 데이터 레코드 배열
 */
export function convertCrimeRecordsToTableData(records: CrimeRecord[]) {
  return records.map((record) => ({
    categoryMajor: record.categoryMajor,
    categoryMiddle: record.categoryMiddle,
    total: record.total,
  }));
}

/**
 * 범죄 목록에서 중분류 이름만 추출
 * @param records - 범죄 데이터 레코드 배열
 */
export function extractCategoryMiddleList(records: CrimeRecord[]): string[] {
  return records.map((record) => record.categoryMiddle);
}
