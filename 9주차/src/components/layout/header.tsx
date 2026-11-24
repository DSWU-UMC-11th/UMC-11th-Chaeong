"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/api/members/me";
import { useAuthStore } from "@/stores/auth-store";
import { cn } from "@/utils/cn";

export function Header() {
  const pathname = usePathname();
  const accessToken = useAuthStore((state) => state.accessToken);
  const meQuery = useQuery({ queryKey: ["members", "me"], queryFn: getMe, enabled: Boolean(accessToken), staleTime: 5 * 60 * 1000, retry: false });
  const menuClass = (active: boolean) => cn("font-bold text-sm leading-[17px]", active ? "text-[#17191E] underline" : "text-[#606774]");

  return (
    <header className="flex flex-row justify-between items-center px-4 sm:px-8 lg:px-20 py-6 w-full max-w-[1440px] min-h-[91px] bg-white box-border">
      <div className="flex items-center gap-[42px] h-8">
        <Link href="/" className="flex items-center gap-2.5 h-8" aria-label="UMCine 홈">
          <span className="flex items-center justify-center w-8 h-8 border-2 border-[#17191E] rounded-lg"><Image src="/images/movie-icons/movie.svg" alt="" width={24} height={24} className="w-6 h-6" /></span>
          <span className="font-black text-xl tracking-[-0.7px] text-[#17191E]">UMCine</span>
        </Link>
        <nav className="flex items-center gap-[30px]">
          <Link href="/" className={menuClass(pathname === "/")}>영화</Link>
          <Link href="/search" className={menuClass(pathname === "/search")}>검색</Link>
          <Link href="/my-info" className={menuClass(pathname.startsWith("/my-info"))}>내 정보</Link>
        </nav>
      </div>
      <div className="flex items-center gap-2.5">
        <Link href="/search" aria-label="검색" className="flex items-center justify-center w-[42px] h-[42px] bg-white border border-[#E3E6EB] rounded-lg"><Image src="/images/movie-icons/search.svg" alt="" width={24} height={24} className="w-6 h-6" /></Link>
        {!accessToken ? <Link href="/login" className="flex items-center justify-center px-4 h-[42px] bg-[#2563EB] rounded-lg font-extrabold text-sm text-white">로그인</Link> : meQuery.isLoading ? <span className="h-10 w-24 animate-pulse rounded-lg bg-gray-200" /> : <Link href="/my-info" className="flex items-center justify-center px-4 h-[42px] bg-[#2563EB] rounded-lg font-extrabold text-sm text-white">마이페이지</Link>}
      </div>
    </header>
  );
}

