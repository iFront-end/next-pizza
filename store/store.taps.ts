import {create} from "zustand";

interface State {
  activeId: string
  setActiveId: (activeId: string) => void
}

export const useStoreTaps = create<State>()(set => ({
  activeId: "1",
  setActiveId: (activeId: string) => set({ activeId })
}))
