import {useEffect, useState} from "react";
import useThrottle from "../hooks/useThrottle.ts";

export default function ThrottlePage() {

  // 현재 스크롤 위치 저장용 상태
  const [scrollY, setScrollY] = useState<number>(0);

  // 스크롤 이벤트가 발생할 때 실행할 함수 (스크롤 할때마다 스크롤 위치를 상태에 저장)
  const handleScroll = useThrottle(() => {
    setScrollY(window.scrollY);
  }, 2000);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll); // 스크롤 할 떄마다 handleScroll 실행해줘

    // 컴포넌트 사라질 때 리스너 해제
    return () => window.removeEventListener('scroll', handleScroll);
  },[handleScroll]);

  console.log("Re-rendering")

  return (
    <div className='h-dvh flex flex-col justify-center items-center'>

      <div>
        <h1>throttle?</h1>
        <p>ScrollY: {scrollY}px</p>
      </div>

    </div>
  );
}
