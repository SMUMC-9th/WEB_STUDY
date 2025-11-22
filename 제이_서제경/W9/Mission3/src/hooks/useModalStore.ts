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

export const useModalInfo = () => {
  const isOpen = useModalStore((state) => state.isOpen);
  return { isOpen };
};

export const useModalActions = () => {
  return useModalStore((state) => state.actions);
};
