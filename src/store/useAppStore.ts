"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  isLive: boolean;
  toggleLive: () => void;
  viewMode: "map" | "grid";
  setViewMode: (mode: "map" | "grid") => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: () => set({ isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false }),
      isLive: true,
      toggleLive: () => set((state) => ({ isLive: !state.isLive })),
      viewMode: "map",
      setViewMode: (mode) => set({ viewMode: mode }),
    }),
    {
      name: "app-storage",
    }
  )
);
