import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

type SidebarOptions = {
  defaultOpen?: boolean;
  lockScroll?: boolean;
  closeOnEsc?: boolean;
  closeOnRouteChange?: boolean;
};

export function useSidebar(options: SidebarOptions = {}) {
  const {
    defaultOpen = false,
    lockScroll = true,
    closeOnEsc = true,
    closeOnRouteChange = true,
  } = options;

  const [open, setOpen] = useState(defaultOpen);
  const location = useLocation();
  const prevOverflow = useRef<string>("");

  const openSidebar = useCallback(() => setOpen(true), []);
  const closeSidebar = useCallback(() => setOpen(false), []);
  const toggleSidebar = useCallback(() => setOpen((v) => !v), []);

  // ESC로 닫기
  useEffect(() => {
    if (!closeOnEsc) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSidebar();
    };
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, closeOnEsc, closeSidebar]);

  // 스크롤 잠금
  useEffect(() => {
    if (!lockScroll) return;
    if (typeof document === "undefined") return;

    if (open) {
      prevOverflow.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = prevOverflow.current || "";
    }
    return () => {
      document.body.style.overflow = prevOverflow.current || "";
    };
  }, [open, lockScroll]);

  useEffect(() => {
    if (!closeOnRouteChange) return;
    closeSidebar();
  }, [location.key]);

  return {
    open,
    openSidebar,
    closeSidebar,
    toggleSidebar,
    setOpen,
  };
}

export default useSidebar;
