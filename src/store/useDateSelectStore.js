import { create } from 'zustand';

export const useDateSelectStore = create((set) => ({
  date: '', 
  setDate: (newDate) => set({ date: newDate }),
}));
