import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Search, UserRound } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenModal: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onOpenModal }) => {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 어둡게 */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* 사이드바 본체 */}
          <motion.div
            className="fixed top-0 left-0 h-full w-64 bg-neutral-900 text-white z-50 flex flex-col justify-between p-5 shadow-lg"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "tween" }}
          >
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-pink-400">메뉴</h2>
                <button onClick={onClose}>
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col gap-4">
                <button
                  onClick={() => {
                    navigate("/search");
                    onClose();
                  }}
                  className="hover:text-pink-400 text-left flex items-center"
                >
                  <Search className="inline-block mr-2" size={20} />
                  찾기
                </button>
                <button
                  onClick={() => {
                    navigate("/my");
                    onClose();
                  }}
                  className="hover:text-pink-400 text-left flex items-center"
                >
                  <UserRound
                    className="inline-block mr-2 fill-white outline-none"
                    size={20}
                  />
                  마이페이지
                </button>
              </nav>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenModal();
              }}
              className="text-white hover:text-red-300 mt-auto text-center"
            >
              탈퇴하기
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
