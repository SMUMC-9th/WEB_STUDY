import HamburgerButton from "./button/HamburgerButton.tsx";
import {useSidebar} from "../../hooks/useSidebar.tsx";

export default function Navbar() {
  const {isOpen, toggle} = useSidebar();
  return (
    <div className="w-[1201px] h-16 relative">
      <div className="w-[1201px] h-16 left-0 top-0 absolute bg-slate-800" />
      <div className="w-4 h-4 left-[1152px] top-[26px] absolute outline outline-[0.20px] outline-stone-300" />
      <div className="w-1.5 h-1 left-[1158px] top-[33px] absolute bg-white" />
      <div className="w-1.5 h-1 left-[1158px] top-[33px] absolute bg-white" />
      <div className="left-[1065px] top-[16px] absolute justify-start text-white text-sm font-bold font-['Nunito_Sans']">Moni Roy Admin</div>
      <div className="w-11 h-11 left-[1001px] top-[13px] absolute bg-zinc-300" />
      <div className="w-11 h-11 left-[1001px] top-[13px] absolute bg-zinc-300" />
      <img className="w-12 h-14 left-[999px] top-[8px] absolute" src="https://placehold.co/50x54" />
      <div className="left-[907px] top-[27px] absolute justify-start text-zinc-100 text-sm font-semibold font-['Nunito_Sans'] tracking-tight">English</div>
      <div className="w-2 h-1 left-[965.92px] top-[31.67px] absolute bg-neutral-300" />
      <div className="w-2 h-1 left-[965.92px] top-[31.67px] absolute bg-neutral-300" />
      <div className="w-10 h-7 left-[851px] top-[22px] absolute bg-zinc-300 rounded-[5px]" />
      <div className="w-10 h-7 left-[851px] top-[22px] absolute bg-zinc-300 rounded-[5px]" />
      <img className="w-10 h-7 left-[851px] top-[22px] absolute" src="https://placehold.co/40x27" />
      <div className="w-1.5 h-1.5 left-[805px] top-[43.50px] absolute opacity-90 bg-white rounded-sm" />
      <div className="w-4 h-4 left-[808px] top-[18px] absolute opacity-20 bg-red-500/60" />
      <div className="w-4 h-4 left-[809px] top-[19px] absolute bg-red-500" />
      <div className="left-[813px] top-[19px] absolute justify-start text-white text-xs font-bold font-['Nunito_Sans']">6</div>
      <div className="w-6 h-6 left-[30px] top-[23px] absolute" />
      <HamburgerButton onClick={toggle} isOpen={isOpen} />
      <div className="w-96 h-9 left-[78px] top-[16px] absolute bg-gray-700 rounded-[19px] border-[0.60px] border-stone-300/10" />
      <div className="left-[122px] top-[26px] absolute opacity-80 text-center justify-start text-white text-sm font-semibold font-['Nunito_Sans'] tracking-tight">Search</div>
        {/* 돋보기 */}
    </div>
  );
}
