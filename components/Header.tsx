import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold text-gray-900">
          Crime Insight 2019
        </Link>
        <div className="flex gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            홈
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            소개
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            대시보드
          </Link>
        </div>
      </nav>
    </header>
  );
}

