import { useEffect, useState } from "react";
import useThrottle from "../hooks/useThrottle";

const ThrottlePage = () => {
  const [scrollY, setScrollY] = useState<number>(0);

  const handelScroll = useThrottle(() => {
    setScrollY(window.scrollY);
  }, 2000);

  useEffect(() => {
    window.addEventListener("scroll", handelScroll);

    return () => window.removeEventListener("scroll", handelScroll);
  }, [handelScroll]);
  return (
    <div className="h-dvh flex flex-col items-center justify-center">
      <div>
        <h1>throttle이 무엇일까요ㅕ?</h1>
        <p>ScrollY: {scrollY}px</p>
      </div>
    </div>
  );
};

export default ThrottlePage;
