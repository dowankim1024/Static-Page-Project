"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CrimeSelectorProps {
  crimes: Array<{
    categoryMajor: string;
    categoryMiddle: string;
  }>;
  currentCrime: string;
}

export default function CrimeSelector({ crimes, currentCrime }: CrimeSelectorProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // 대분류별로 그룹화
  const groupedCrimes = crimes.reduce((acc, crime) => {
    if (!acc[crime.categoryMajor]) {
      acc[crime.categoryMajor] = [];
    }
    acc[crime.categoryMajor].push(crime.categoryMiddle);
    return acc;
  }, {} as Record<string, string[]>);

  const handleSelect = (crimeMiddle: string) => {
    router.push(`/detail/${encodeURIComponent(crimeMiddle)}`);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full sm:w-auto px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 text-left flex items-center justify-between"
      >
        <span className="text-gray-900 font-medium">{currentCrime}</span>
        <svg
          className={`ml-2 h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* 오버레이 - 외부 클릭 시 닫기 */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          {/* 드롭다운 메뉴 */}
          <div className="absolute z-20 mt-2 w-full sm:w-80 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-auto">
            <div className="py-1">
              {Object.entries(groupedCrimes).map(([categoryMajor, crimeList]) => (
                <div key={categoryMajor}>
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50 sticky top-0">
                    {categoryMajor}
                  </div>
                  {crimeList.map((crimeMiddle) => (
                    <button
                      key={crimeMiddle}
                      type="button"
                      onClick={() => handleSelect(crimeMiddle)}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors ${
                        crimeMiddle === currentCrime
                          ? 'bg-gray-100 text-gray-900 font-medium'
                          : 'text-gray-700'
                      }`}
                    >
                      {crimeMiddle}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

