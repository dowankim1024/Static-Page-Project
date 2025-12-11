"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  crimeList: string[];
}

export default function SearchBar({ crimeList }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // 검색어에 따라 범죄 목록 필터링
  const filteredCrimeList = crimeList.filter((crime) =>
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
  );
}

