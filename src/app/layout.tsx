import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { GovHeader } from "@/components/ui/GovHeader";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

const jbMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NammaBTP City Surveillance Dashboard",
  description: "AI-powered traffic violation monitoring and detection system for city-wide deployment. Real-time camera feeds, violation analytics, and incident management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${jbMono.variable} h-full antialiased bg-[var(--bg-app)]`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans">
        <div className="app-backdrop" />
        <GovHeader />
        {children}
      </body>
    </html>
  );
}
