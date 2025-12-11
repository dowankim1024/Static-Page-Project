"use client";

import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CategoryMajorData } from '@/types/crime';

interface PieChartProps {
  data: CategoryMajorData[];
  title?: string;
}

// 차트 색상 팔레트
const COLORS = [
  '#1f2937', // gray-800
  '#374151', // gray-700
  '#4b5563', // gray-600
  '#6b7280', // gray-500
  '#9ca3af', // gray-400
  '#d1d5db', // gray-300
  '#e5e7eb', // gray-200
  '#f3f4f6', // gray-100
];

type PieChartData = CategoryMajorData & Record<string, string | number>;

export default function PieChart({ data, title }: PieChartProps) {
  // 상위 7개만 표시하고 나머지는 "기타"로 합침
  const displayData: PieChartData[] = (data.length > 7
    ? [
        ...data.slice(0, 7),
        {
          category: '기타',
          count: data.slice(7).reduce((sum, item) => sum + item.count, 0),
        },
      ]
    : data) as PieChartData[];

  const total = displayData.reduce((sum, item) => sum + item.count, 0);
  
  const renderLabel = (props: { name?: string; value?: number; percent?: number }) => {
    if (!props.name || props.percent === undefined) return '';
    const percentage = (props.percent * 100).toFixed(1);
    return `${props.name} (${percentage}%)`;
  };

  return (
    <div className="w-full h-full">
      {title && (
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={displayData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="count"
            nameKey="category"
          >
            {displayData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            formatter={(value: number) => [value.toLocaleString(), '발생 건수']}
          />
          <Legend 
            verticalAlign="bottom"
            height={36}
            formatter={(value: string) => {
              const item = displayData.find((d) => d.category === value);
              if (!item) return value;
              const percentage = ((item.count / total) * 100).toFixed(1);
              return `${value} (${percentage}%)`;
            }}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}

