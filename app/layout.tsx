import { Noto_Sans_Telugu } from 'next/font/google';
import type { Metadata } from "next";
import "./globals.css";

const teluguFont = Noto_Sans_Telugu({
  subsets: ['telugu'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: "My Telugu App",
  description: "రామాయణం మరియు మహాభారతం డిజిటల్ పఠనం",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="te">
      <body className={teluguFont.className}>{children}</body>
    </html>
  );
}