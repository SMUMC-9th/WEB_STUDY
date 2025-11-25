import { Siren } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Modal = ({
  isOpen,
  title,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-50 w-80 rounded-xl shadow-xl p-6 text-center">
        <div className="flex justify-center mb-7">
          <Siren className="w-16 h-16 text-red-300" />
        </div>
        <h2 className="text-md mb-2">{title}</h2>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={onConfirm}
            className="bg-red-400 text-sm text-white px-4 py-2 rounded hover:scale-95 transition"
          >
            {confirmText}
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-200 text-sm px-4 py-2 rounded hover:scale-95 transition"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
