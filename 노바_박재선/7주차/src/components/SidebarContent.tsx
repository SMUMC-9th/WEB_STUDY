import { useNavigate } from "react-router-dom";
import { Search, UserRound } from "lucide-react";
import { useState } from "react";
import useDeleteUser from "../hooks/mutations/useDeleteUser";
import ConfirmModal from "./ConfirmModal";

interface SidebarContentProps {
  onClose?: () => void;
}

export const SidebarContent = ({ onClose }: SidebarContentProps) => {
  const nav = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: deleteAccount, isPending } = useDeleteUser();

  const handleNavigate = (path: string) => {
    nav(path);
    onClose?.(); //모바일에서만 함수전달함. 클릭하면 사이드바 닫을수 잇도록 함
  };

  const handleWithdrawClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmWithdraw = () => {
    deleteAccount(undefined, {
      onSuccess: () => {
        setIsModalOpen(false);
        localStorage.clear();
        alert("회원 탈퇴가 완료되었습니다.");
        nav("/");
      },
      onError: (error) => {
        console.error(error);
        alert("오류가 발생했습니다.");
      },
    });
  };

  return (
    <>
      <div className="flex flex-col relative w-60 h-full">
        <nav className="flex flex-col space-y-4 mt-10 p-6">
          <button
            onClick={() => handleNavigate("/search")}
            className="text-gray-300 hover:text-white p-3 rounded-md text-lg text-left cursor-pointer transition"
          >
            <div className="flex items-center text-center gap-2">
              <Search />
              <p>찾기</p>
            </div>
          </button>
          <button
            onClick={() => handleNavigate("/mypage")}
            className="text-gray-300 hover:text-white p-3 rounded-md text-lg text-left cursor-pointer transition"
          >
            <div className="flex items-center text-center gap-2">
              <UserRound />
              <p>마이페이지</p>
            </div>
          </button>
        </nav>
        <nav className="fixed bottom-[30px] left-[30px]">
          <button
            onClick={handleWithdrawClick}
            disabled={isPending}
            className="text-gray-500 hover:text-white  p-3 rounded-md text-sm text-left w-full b-30 left-10 cursor-pointer transition"
          >
            탈퇴하기
          </button>
        </nav>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmWithdraw}
        message="정말 탈퇴하시겠습니까?"
      />
    </>
  );
};
