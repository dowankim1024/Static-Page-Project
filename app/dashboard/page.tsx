"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// 임시 범죄 목록 데이터 (추후 실제 데이터로 교체)
const mockCrimeList = [
  "사기",
  "절도",
  "강도",
  "살인",
  "강간",
  "폭행",
  "상해",
  "협박",
  "공갈",
  "방화",
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // 검색어에 따라 범죄 목록 필터링
  const filteredCrimeList = mockCrimeList.filter((crime) =>
    crime.includes(searchQuery)
  );

  // 검색 폼 제출 핸들러
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 검색어가 비어있으면 아무것도 하지 않음
    if (!searchQuery.trim()) {
      return;
    }

    // 검색 결과가 1개면 바로 해당 페이지로 이동
    if (filteredCrimeList.length === 1) {
      router.push(`/detail/${encodeURIComponent(filteredCrimeList[0])}`);
      return;
    }

    // 검색 결과가 여러 개면 첫 번째 결과로 이동
    if (filteredCrimeList.length > 1) {
      router.push(`/detail/${encodeURIComponent(filteredCrimeList[0])}`);
      return;
    }

    // 검색 결과가 없으면 에러 처리 (404 페이지로 이동하거나 메시지 표시)
    // 여기서는 사용자에게 알림만 표시 (404는 실제로 존재하지 않는 페이지일 때 사용)
    alert(`"${searchQuery}"에 대한 검색 결과가 없습니다.`);
  };

  // 외부 클릭 시 자동완성 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowAutocomplete(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-gray-50">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">대시보드</h1>
        
        {/* Search Bar with Autocomplete */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div ref={searchContainerRef} className="relative">
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="범죄 유형을 검색하세요 (예: 사기, 절도)"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowAutocomplete(true);
                    }}
                    onFocus={() => {
                      if (searchQuery) {
                        setShowAutocomplete(true);
                      }
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                  />
                  {/* Autocomplete Dropdown */}
                  {showAutocomplete && searchQuery && filteredCrimeList.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                      <ul className="py-1">
                        {filteredCrimeList.map((crime) => (
                          <li key={crime}>
                            <Link
                              href={`/detail/${encodeURIComponent(crime)}`}
                              onClick={() => {
                                setShowAutocomplete(false);
                                setSearchQuery(crime);
                              }}
                              className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition-colors"
                            >
                              {crime}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {showAutocomplete && searchQuery && filteredCrimeList.length === 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                      <div className="px-4 py-3 text-gray-500 text-sm">
                        검색 결과가 없습니다.
                      </div>
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors font-medium"
                >
                  검색
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8">
          {/* 요일별 발생 현황 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">요일별 발생 현황</h2>
            <div className="h-64 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 rounded">
              Bar Chart 영역 (추후 구현)
            </div>
          </div>

          {/* 시간대별 발생 현황 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">시간대별 발생 현황</h2>
            <div className="h-64 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 rounded">
              Area/Line Chart 영역 (추후 구현)
            </div>
          </div>
        </div>

        {/* 범죄 대분류 비중 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">범죄 대분류 비중</h2>
          <div className="h-64 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 rounded">
            Pie Chart 영역 (추후 구현)
          </div>
        </div>

        {/* 범죄 목록 리스트 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              범죄 목록
            </h2>
            {searchQuery && (
              <span className="text-sm text-gray-600 font-medium">
                {filteredCrimeList.length}개 결과
              </span>
            )}
          </div>
          {searchQuery ? (
            filteredCrimeList.length > 0 ? (
              <ul className="space-y-2">
                {filteredCrimeList.map((crime) => (
                  <li key={crime}>
                    <Link
                      href={`/detail/${encodeURIComponent(crime)}`}
                      className="block px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                    >
                      <span className="text-gray-900 font-medium text-base">
                        {crime}
                      </span>
                      <span className="ml-2 text-sm text-gray-600">
                        → 상세 분석 보기
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 font-medium">
                  &quot;{searchQuery}&quot;에 대한 검색 결과가 없습니다.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 text-sm text-gray-500 hover:text-gray-900 underline"
                >
                  검색어 지우기
                </button>
              </div>
            )
          ) : (
            <ul className="space-y-2">
              {mockCrimeList.map((crime) => (
                <li key={crime}>
                  <Link
                    href={`/detail/${encodeURIComponent(crime)}`}
                    className="block px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                  >
                    <span className="text-gray-900 font-medium text-base">
                      {crime}
                    </span>
                    <span className="ml-2 text-sm text-gray-600">
                      → 상세 분석 보기
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
