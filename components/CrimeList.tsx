"use client";

import Link from "next/link";

interface CrimeListProps {
  crimes: Array<{
    categoryMajor: string;
    categoryMiddle: string;
    total: number;
  }>;
  searchQuery?: string;
  onSearchQueryChange?: (query: string) => void;
}

export default function CrimeList({ crimes, searchQuery = "", onSearchQueryChange }: CrimeListProps) {
  // 검색어 필터링
  const filteredCrimes = searchQuery
    ? crimes.filter((crime) =>
        crime.categoryMiddle.includes(searchQuery) ||
        crime.categoryMajor.includes(searchQuery)
      )
    : crimes;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">범죄 목록</h2>
        {searchQuery && (
          <span className="text-sm text-gray-600 font-medium">
            {filteredCrimes.length}개 결과
          </span>
        )}
      </div>
      {searchQuery && filteredCrimes.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 font-medium">
            &quot;{searchQuery}&quot;에 대한 검색 결과가 없습니다.
          </p>
          {onSearchQueryChange && (
            <button
              onClick={() => onSearchQueryChange("")}
              className="mt-4 text-sm text-gray-500 hover:text-gray-900 underline"
            >
              검색어 지우기
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  대분류
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  중분류
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  발생 건수
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상세보기
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCrimes.map((crime, index) => (
                <tr key={`${crime.categoryMajor}-${crime.categoryMiddle}-${index}`} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {crime.categoryMajor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {crime.categoryMiddle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {crime.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link
                      href={`/detail/${encodeURIComponent(crime.categoryMiddle)}`}
                      className="text-gray-900 hover:text-gray-700 font-medium"
                    >
                      보기 →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

