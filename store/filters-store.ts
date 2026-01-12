import { create } from "zustand";

interface FiltersState {
  clientName: string;
  eventFrom: string | undefined;
  eventTo: string | undefined;
  minValue: number;
  filtersCount: number;

  updateClientName: (name: string) => void;
  updateEventFrom: (date: string) => void;
  updateEventTo: (date: string) => void;
  updateMinValue: (minValue: number) => void;
  updateFiltersCount: (count: number) => void;

  clearFilters: () => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  clientName: "",
  eventFrom: "",
  eventTo: "",
  minValue: 0,
  filtersCount: 0,

  updateClientName: (name) => set({ clientName: name }),
  updateEventFrom: (date) => set({ eventFrom: date }),
  updateEventTo: (date) => set({ eventTo: date }),
  updateMinValue: (minValue) => set({ minValue }),

  updateFiltersCount: (count) => set({ filtersCount: count }),

  clearFilters: () =>
    set({ clientName: "", eventFrom: "", eventTo: "", minValue: 0 }),
}));
