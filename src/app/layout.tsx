import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tin12 Pro Cánh Diều | Từ mất gốc Tin học 12 đến làm chủ lý thuyết",
  description: "Nền tảng EdTech cao cấp dành cho học sinh lớp 12 theo chương trình Tin học Cánh Diều. Học từ mất gốc đến luyện thi THPT với AI Tutor 24/7.",
  keywords: ["Tin học 12", "Cánh Diều", "EdTech", "luyện thi THPT", "AI Tutor", "học trực tuyến"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased h-full`}>
        {children}
      </body>
    </html>
  );
}