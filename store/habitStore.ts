import { create } from "zustand";

export interface Habit {
  _id: string;
  habit: string;
  status: boolean;
}

interface HabitState {
  habits: Habit[];
  setHabits: (list: Habit[]) => void;
  toggleHabit: (id: string) => void;
  deleteHabit: (id: string) => void;
}

export const useHabitProgressStore = create<HabitState>((set) => ({
  habits: [],

  setHabits: (list) => set({ habits: list }),

  toggleHabit: (id) =>
    set((state) => ({
      habits: state.habits.map((h) =>
        h._id === id ? { ...h, status: !h.status } : h
      ),
    })),

  deleteHabit: (id) =>
    set((state) => ({
      habits: state.habits.filter((h) => h._id !== id),
    })),
}));
