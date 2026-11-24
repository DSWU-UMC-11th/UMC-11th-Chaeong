"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import { useAuthStore } from "@/stores/auth-store";

function AuthHydration() {
  useEffect(() => { void useAuthStore.persist.rehydrate(); }, []);
  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { staleTime: 5 * 60 * 1000 } } }));
  return <QueryClientProvider client={queryClient}><AuthHydration />{children}</QueryClientProvider>;
}
