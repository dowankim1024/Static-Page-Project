export default function LoadingSpinner() {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
        <p className="text-gray-600 text-lg">데이터를 불러오는 중...</p>
      </div>
    </div>
  );
}

