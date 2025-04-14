import { create } from "zustand";

export const useChartLimitStore = create((set) => ({
  limit: 10,
  setLimit: (newLimit) => set({ limit: newLimit }),
}));
