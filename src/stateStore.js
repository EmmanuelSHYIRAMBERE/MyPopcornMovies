import { create } from "zustand";

export const useRatingStore = create((set) => ({
  rating: 0,
  tempRating: 0,
  setRating: (rating) => set(() => ({ rating: rating })),
  setTempRating: (rating) => set(() => ({ tempRating: rating })),
}));
