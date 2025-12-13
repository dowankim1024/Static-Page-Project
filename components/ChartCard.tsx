import { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  children: ReactNode;
  description?: string;
  variant?: 'default' | 'comparison';
}

export default function ChartCard({ 
  title, 
  children, 
  description,
  variant = 'default' 
}: ChartCardProps) {
  const containerClass = variant === 'comparison'
    ? 'bg-gray-50 rounded-lg p-6'
    : 'bg-white rounded-lg shadow-md p-6';

  return (
    <div className={containerClass}>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      {description && (
        <p className="text-sm text-gray-500 mb-4">{description}</p>
      )}
      {children}
    </div>
  );
}

