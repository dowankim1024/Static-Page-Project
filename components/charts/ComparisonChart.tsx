"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DayOfWeekData, TimeSlotData } from '@/types/crime';

interface ComparisonChartProps {
  data: DayOfWeekData[] | TimeSlotData[];
  averageData: DayOfWeekData[] | TimeSlotData[];
  dataKey: string;
  xAxisKey: string;
  title?: string;
  dataLabel: string;
  averageLabel: string;
}

export default function ComparisonChart({ 
  data, 
  averageData, 
  dataKey, 
  xAxisKey, 
  title,
  dataLabel,
  averageLabel,
}: ComparisonChartProps) {
  // 데이터 병합 및 포맷팅
  const formattedData = data.map((item, index) => {
    const avgItem = averageData[index];
    const baseItem: any = {
      ...item,
      average: avgItem ? avgItem.count : 0,
    };
    
    // 시간대 데이터인 경우 라벨 단축
    if (xAxisKey === 'time') {
      const timeItem = item as TimeSlotData;
      const timeLabel = timeItem.time
        .replace('시00분-', '-')
        .replace('시59분', '시')
        .split('-')[0] + '시';
      baseItem.timeLabel = timeLabel;
    }
    
    return baseItem;
  });

  return (
    <div className="w-full h-full">
      {title && (
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb', 
              borderRadius: '8px' 
            }}
            formatter={(value: number) => [value.toLocaleString(), '발생 건수']}
          />
          <Legend />
          <Bar 
            dataKey={dataKey} 
            fill="#1f2937" 
            name={dataLabel}
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="average" 
            fill="#9ca3af" 
            name={averageLabel}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

