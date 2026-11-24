"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";

export function GuestGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  useEffect(() => { if (hasHydrated && accessToken) router.replace("/"); }, [accessToken, hasHydrated, router]);
  if (!hasHydrated || accessToken) return <main className="main-container">로그인 상태를 확인하고 있어요...</main>;
  return children;
}
