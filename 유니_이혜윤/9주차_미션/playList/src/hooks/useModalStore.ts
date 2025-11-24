import { create } from "zustand";
import { useShallow } from "zustand/shallow";

interface ModalActions {
  open: () => void;
  close: () => void;
}

interface ModalState {
  isOpen: boolean;
  actions: ModalActions;
}

export const useModalStore = create<ModalState>()((set) => ({
  isOpen: false,
  actions: {
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
  },
}));

export const useModalInfo = () =>
  useModalStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
    }))
  );
export const useModalActions = () => useModalStore((state) => state.actions);
