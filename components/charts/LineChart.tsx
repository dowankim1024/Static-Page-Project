"use client";

import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TimeSlotData } from '@/types/crime';

interface LineChartProps {
  data: TimeSlotData[];
  title?: string;
}

export default function LineChart({ data, title }: LineChartProps) {
  // 시간대 라벨 단축
  const formattedData = data.map((item) => {
    const timeLabel = item.time
      .replace('시00분-', '-')
      .replace('시59분', '시')
      .split('-')[0] + '시';
    return { ...item, timeLabel };
  });

  return (
    <div className="w-full h-full">
      {title && (
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={formattedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="timeLabel"
            tick={{ fontSize: 12 }}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            formatter={(value: number) => [value.toLocaleString(), '발생 건수']}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="count" 
            stroke="#1f2937" 
            strokeWidth={2}
            name="발생 건수"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}

