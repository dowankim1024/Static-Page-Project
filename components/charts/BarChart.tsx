"use client";

import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DayOfWeekData, TimeSlotData } from '@/types/crime';

interface BarChartProps {
  data: DayOfWeekData[] | TimeSlotData[];
  dataKey: string;
  xAxisKey: string;
  title?: string;
}

export default function BarChart({ data, dataKey, xAxisKey, title }: BarChartProps) {
  // 시간대 데이터인 경우 라벨 단축
  const formattedData = data.map((item) => {
    if (xAxisKey === 'time') {
      const timeItem = item as TimeSlotData;
      // "0시00분-02시59분" -> "0-3시" 형태로 변환
      const timeLabel = timeItem.time
        .replace('시00분-', '-')
        .replace('시59분', '시')
        .split('-')[0] + '시';
      return { ...item, timeLabel };
    }
    return item;
  });

  return (
    <div className="w-full h-full">
      {title && (
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={formattedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey={xAxisKey === 'time' ? 'timeLabel' : xAxisKey}
            tick={{ fontSize: 12 }}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            formatter={(value: number) => [value.toLocaleString(), '발생 건수']}
          />
          <Legend />
          <Bar dataKey={dataKey} fill="#1f2937" name="발생 건수" />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}

