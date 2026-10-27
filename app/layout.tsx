import type { Metadata } from "next";
import { Source_Serif_4, IBM_Plex_Mono } from "next/font/google";
import { AppProvider } from "@/lib/store";
import "./globals.css";

const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Daybook — personal journal & goals",
  description: "Daily journaling with deadline-driven goals and streaks.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${mono.variable} font-serif min-h-screen flex flex-col`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
