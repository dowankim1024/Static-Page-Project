interface StatCardProps {
  label: string;
  value: string | number;
}

export default function StatCard({ label, value }: StatCardProps) {
  const displayValue = typeof value === 'number' ? value.toLocaleString() : value;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-sm font-medium text-gray-500 mb-2">{label}</h3>
      <p className="text-3xl font-bold text-gray-900">{displayValue}</p>
    </div>
  );
}

