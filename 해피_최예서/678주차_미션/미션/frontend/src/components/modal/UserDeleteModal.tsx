import useDeleteUser from "../../hooks/mutations/user/useDeleteUser.ts";
import { useNavigate } from "react-router-dom";

interface UserDeleteModalProps {
  onClose: () => void;
}

export default function UserDeleteModal({ onClose }: UserDeleteModalProps) {
  const { mutate: deleteUserMutate } = useDeleteUser();
  const navigate = useNavigate();

  const handleDelete = () => {
    if (confirm("정말 탈퇴하시겠습니까?")) {
      deleteUserMutate(undefined, {
        onSuccess: () => {
          alert("탈퇴가 완료되었습니다.");
          navigate("/signin");
        },
        onError: () => {
          alert("탈퇴 중 오류가 발생했습니다.");
        },
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-80 rounded-2xl shadow-xl p-6 text-center animate-fadeIn">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          회원 탈퇴 확인
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          정말 탈퇴하시겠습니까?
          <br />
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            취소
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
          >
            탈퇴하기
          </button>
        </div>
      </div>
    </div>
  );
}
