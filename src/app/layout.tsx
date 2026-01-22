import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const siteUrl = "https://two-mu26.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "지벤작업복 | 프리미엄 워크웨어 전문몰",
    template: "%s | 지벤작업복",
  },
  description:
    "지벤(ZIBEN) 공식 파트너. 내구성과 착용감을 겸비한 프리미엄 작업복, 유니폼, 안전화를 합리적인 가격에 만나보세요. 단체 주문 할인, 무료 로고 자수 서비스.",
  alternates: {
    canonical: siteUrl,
    languages: { ko: `${siteUrl}/` },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "지벤작업복 | 프리미엄 워크웨어 전문몰",
    description:
      "현장에서 검증된 지벤 작업복. 건설, 제조, 물류 현장을 위한 프리미엄 워크웨어를 합리적인 가격에 제공합니다.",
    siteName: "지벤작업복",
    locale: "ko_KR",
    images: [
      {
        url: `${siteUrl}/ziben-og.png`, // public/ziben-og.png
        width: 1200,
        height: 630,
        alt: "지벤작업복 - 프리미엄 워크웨어 전문몰",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "지벤작업복 | 프리미엄 워크웨어 전문몰",
    description: "내구성과 착용감을 겸비한 프리미엄 작업복. 단체 주문 할인 및 무료 로고 자수.",
    images: [`${siteUrl}/ziben-og.png`], // public/ziben-og.png
  },
  keywords: [
    "지벤",
    "ZIBEN",
    "작업복",
    "워크웨어",
    "유니폼",
    "안전화",
    "단체복",
    "근무복",
    "산업용작업복",
  ],
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  category: "ecommerce",
  verification: {
    // google: "구글서치콘솔코드",
    // naver: "네이버서치어드바이저코드",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
