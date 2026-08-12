import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "쿠키런: 킹덤 퀴즈 & 맞추기 웹 게임",
  description: "쿠키런 킹덤의 대사, 스킬, 초성, 그림자, 속성을 활용한 웹 게임",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-amber-950 font-sans">{children}</body>
    </html>
  );
}

