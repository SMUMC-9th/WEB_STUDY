import Tag from "./Tag";
import { useTheme } from "../context/ThemeProvider";

export default function ProfileCard() {
  const { theme } = useTheme();

  return (
    <main
      className={`min-h-screen flex justify-center items-center transition-colors duration-300 ${
        theme === "LIGHT" ? "bg-gray-100" : "bg-gray-900"
      }`}
    >
      <div
        className={`flex flex-col justify-center items-center rounded-xl w-[350px] py-10 px-6 transition-colors duration-300 ${
          theme === "LIGHT"
            ? "bg-white text-gray-900"
            : "bg-gray-800 text-white"
        }`}
      >
        <img
          src="https://i.pinimg.com/1200x/16/48/2c/16482c6341fd050a746c96f18e47b7b6.jpg"
          alt="profile"
          className="w-60 h-60 rounded-full shadow-md"
        />

        <div className="flex items-center mt-5 gap-2">
          <h1 className="text-2xl font-bold">혜윤</h1>
          <Tag text="WEB" />
        </div>

        <p className="mt-3 text-center text-sm opacity-80">
          사람들에게 <strong>편리한 서비스</strong>를 만드는 게 목표입니다.
        </p>

        <div className="flex gap-3 mt-6 text-lg">
          <Tag text=" 🐻야구" />
          <Tag text=" 🎶음악" />
          <Tag text=" 🛫여행" />
        </div>

        <div className="mt-2 flex flex-wrap gap-2 justify-center">
          <Tag text="React" />
          <Tag text="TypeScript" />
          <Tag text="TailwindCSS" />
        </div>

        <div className="mt-7">
          <a
            href="https://www.instagram.com/hyeyoon_23?igsh=b3E4NWxqN2Vzdmw0&utm_source=qr"
            target="_blank"
            className={`px-2 py-1 rounded-xl text-sm font-semibold bg-gray-200 text-pink-300
             `}
          >
            @hyeyoon_23
          </a>
        </div>
      </div>
    </main>
  );
}
