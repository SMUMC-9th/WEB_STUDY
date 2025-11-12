import Inform from "./component/inform";
import { useTheme } from "./context/themeProvider";

export default function FrontCard() {
  const { isDarkmode, flippedCard } = useTheme();
  return (
    <div
      className={`flex flex-col items-center justify-center p-3 rounded-[20px] ${
        isDarkmode ? "bg-black" : "bg-white"
      } shadow-lg w-[400px] h-[600px] ${
        isDarkmode ? "text-white" : "text-black"
      }`}
      onClick={flippedCard}
    >
      <img
        src="https://imgnn.seoul.co.kr/img/upload/2024/08/06/SSC_20240806100040.jpg"
        alt=""
        className="w-[200px] h-[200px] object-cover rounded-[10px] mb-4"
      />
      <div className="text-center mb-4">
        <Inform label="이름" value="유진" />
        <Inform label="나이" value="22" />
        <Inform label="사는 곳" value="서울" />
        <Inform label="github" value="yujin5959" />
      </div>
    </div>
  );
}
