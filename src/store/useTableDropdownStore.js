import { create } from 'zustand';

export const useTableDropdownStore = create((set) => ({
  selectedOption: 'Altas',
  setSelectedOption: (option) => set({ selectedOption: option }),
}));
