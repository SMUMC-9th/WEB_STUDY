interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  confirmText = "예",
  cancelText = "아니요",
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-neutral-800 p-6 rounded-lg shadow-xl w-80 text-center">
        <p className="text-white text-lg mb-8">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-neutral-300 text-black rounded-md hover:bg-neutral-400 transition cursor-pointer font-bold"
          >
            {confirmText}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition cursor-pointer font-bold"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
