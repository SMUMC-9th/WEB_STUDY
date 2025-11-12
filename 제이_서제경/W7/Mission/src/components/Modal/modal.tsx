import { useEffect, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

type ModalProps = {
  isOpen?: boolean; // 모달이 열려 있는지
  title?: string; // 모달 상단 제목
  children: ReactNode; // 모달 내부 콘텐츠
  onClose: () => void; //닫을 때 실행할 콜백
};

export default function Modal({
  isOpen = true,
  title,
  children,
  onClose,
}: ModalProps) {
  // 모달의 현재 표시 여부
  const [isVisible, setIsVisible] = useState(isOpen);

  // 외부에서 값이 바뀌면 isOpen 내부 상태로 바꿔줌
  // 다른 컴포넌트에서 모달을 isopen=open으로 사용할 때 open은 부모의 상태임
  // isvisible은 내부 상태니까 동기화되도록 설정하는 것 외부/내부 상태 일치시켜주도록
  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  return createPortal(
    isVisible && (
      <div
        className={`z-1000 fixed w-screen h-screen inset-0 bg-black/30 flex items-center justify-center`}
      >
        <div className={`flex px-8 md:items-center items-center h-full`}>
          <div
            className={`relative bg-white md-[50px] px-5 py-10 flex flex-col rounded-2xl shadow-default max-h-[90dvh] w-full max-w-[105vw] overflow-y-auto gap-3`}
          >
            <div className="w-full flex items-center justify-between mb-2 px-7 md:px-0">
              <div className="font-bold">{title}</div>
              <X onClick={onClose} />
            </div>
            <div className="flex">{children}</div>
          </div>
        </div>
      </div>
    ),
    document.getElementById("modal-root")! //모달이 실제로 렌더링될 DOM 노드
  );
}
