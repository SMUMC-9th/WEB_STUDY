import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

interface BackToTopProps {
  threshold?: number; // 버튼 표시 시작 스크롤 높이
}

const BackToTop = ({ threshold = 300 }: BackToTopProps) => {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  const scrollToTop = () => {
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      title="최상단으로 이동"
      className={`fixed bottom-20 right-6 z-[100] rounded-full shadow-lg bg-black p-3 transition-all cursor-pointer  ${
        isVisible ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <ArrowUp className="w-5 h-5 text-white" />
    </button>
  );
};

export default BackToTop;
