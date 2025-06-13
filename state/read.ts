import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import superjson from "superjson";

interface ReadState {
  lastRead: Map<number, number>;
  newRead: (id: number, chapter: number) => void;
}

const storage: PersistStorage<ReadState> = {
  getItem: async (name) => {
    const str = await AsyncStorage.getItem(name);
    if (!str) return null;
    return superjson.parse(str);
  },
  setItem: async (name, value) => {
    await AsyncStorage.setItem(name, superjson.stringify(value));
  },
  removeItem: async (name) => {
    await AsyncStorage.removeItem(name);
  },
};

export const useReadStore = create<ReadState>()(
  persist(
    (set) => ({
      lastRead: new Map(),
      newRead: (id: number, chapter: number) =>
        set((prev) => ({
          lastRead: new Map(prev.lastRead).set(id, chapter),
        })),
    }),
    {
      name: "read-storage",
      storage,
    }
  )
);
