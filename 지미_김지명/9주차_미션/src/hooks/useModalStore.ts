import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ModalActions {
  openModal: () => void;
  closeModal: () => void;
}

interface ModalState {
  isOpen: boolean;
  actions: ModalActions;
}

export const useModalStore = create<ModalState>()(
  immer((set) => ({
    isOpen: false,
    actions: {
      openModal: () => {
        set((state) => {
          state.isOpen = true;
        });
      },
      closeModal: () => {
        set((state) => {
          state.isOpen = false;
        });
      },
    },
  }))
);

// isOpen 상태만 추출
export const useModalIsOpen = () => useModalStore((state) => state.isOpen);

// actions만 추출
export const useModalActions = () => useModalStore((state) => state.actions);
