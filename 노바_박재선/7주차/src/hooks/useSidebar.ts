import { useEffect, useState } from "react";

export const useSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const open = () => {
    setIsSidebarOpen(true);
  };

  const close = () => {
    setIsSidebarOpen(false);
  };

  const toggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSidebarOpen) {
        close();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    if (isSidebarOpen) {
      //사이드바가 열리면 body 스크롤 방지함
      document.body.style.overflow = "hidden";
    } else {
      //사이드바 닫히면 body 스크롤 복원
      document.body.style.overflow = "unset";
    }

    //클린업: 컴포넌트 언마운티 시 스크롤 복원.
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  return { isSidebarOpen, open, close, toggle };
};
