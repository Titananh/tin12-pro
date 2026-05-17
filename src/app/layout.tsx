import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1220",
};

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
      <body className={`${geist.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}