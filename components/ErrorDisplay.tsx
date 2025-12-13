'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorDisplayProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorDisplay({ error, reset }: ErrorDisplayProps) {
  useEffect(() => {
    // 에러를 로깅 서비스에 전송할 수 있습니다
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">문제가 발생했습니다</h2>
        <p className="text-gray-600 mb-6">
          데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
        </p>
        {error.message && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-red-800 font-mono">{error.message}</p>
          </div>
        )}
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            다시 시도
          </button>
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors"
          >
            대시보드로 이동
          </Link>
        </div>
      </div>
    </div>
  );
}

