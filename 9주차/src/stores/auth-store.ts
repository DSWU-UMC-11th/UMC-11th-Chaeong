import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
  accessToken: string | null;
  hasHydrated: boolean;
  setAccessToken: (accessToken: string | null) => void;
  setHasHydrated: (value: boolean) => void;
}

const storage = createJSONStorage(() => typeof window === "undefined"
  ? { getItem: () => null, setItem: () => undefined, removeItem: () => undefined }
  : localStorage);

export const useAuthStore = create<AuthStore>()(persist(
  (set) => ({ accessToken: null, hasHydrated: false, setAccessToken: (accessToken) => set({ accessToken }), setHasHydrated: (hasHydrated) => set({ hasHydrated }) }),
  {
    name: "umcine-auth-store",
    storage,
    partialize: (state) => ({ accessToken: state.accessToken }) as AuthStore,
    skipHydration: true,
    onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
  },
));
