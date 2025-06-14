import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import superjson from "superjson";

interface ReadState {
  lastRead: Map<number, number>;
  collections: Set<number>;
  collect: (id: number) => void;
  cancelCollect: (id: number) => void;
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
      collections: new Set(),
      newRead: (id: number, chapter: number) =>
        set((prev) => ({
          lastRead: new Map(prev.lastRead).set(id, chapter),
        })),
      collect: (id: number) =>
        set((prev) => {
          if (prev.collections.has(id)) {
            return prev;
          }
          return {
            collections: new Set(prev.collections).add(id),
          };
        }),
      cancelCollect: (id: number) =>
        set((prev) => {
          if (!prev.collections.has(id)) {
            return prev;
          }
          const newSet = new Set(prev.collections);
          newSet.delete(id);
          return {
            collections: newSet,
          };
        }),
    }),
    {
      name: "read-storage",
      storage,
    }
  )
);
