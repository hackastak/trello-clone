import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>()((set) => ({
  isOpen: false,
  openModal: () => {
    set({ isOpen: true })
    console.log('OPEN THE FUCKING MODAL!')
  },
  closeModal: () => set({ isOpen: false }),
}));