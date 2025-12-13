import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Crime Insight 2019",
    template: "%s | Crime Insight 2019",
  },
  description: "범죄 발생의 시간적, 요일별 패턴을 분석하는 대시보드. 2019년 경찰청 범죄 데이터를 기반으로 시간대별, 요일별 범죄 발생 통계를 제공합니다.",
  keywords: ["범죄 통계", "범죄 분석", "데이터 시각화", "대시보드", "범죄 패턴"],
  authors: [{ name: "Crime Insight Team" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://crime-insight.vercel.app",
    siteName: "Crime Insight 2019",
    title: "Crime Insight 2019",
    description: "범죄 발생의 시간적, 요일별 패턴을 분석하는 대시보드",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crime Insight 2019",
    description: "범죄 발생의 시간적, 요일별 패턴을 분석하는 대시보드",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
