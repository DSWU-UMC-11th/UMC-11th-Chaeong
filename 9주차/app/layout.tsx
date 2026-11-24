import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = { title: "UMCine", description: "영화 검색과 즐겨찾기를 제공하는 UMCine" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="ko"><body className="min-h-screen flex flex-col"><Providers><div className="app-container"><Header />{children}</div></Providers></body></html>;
}

