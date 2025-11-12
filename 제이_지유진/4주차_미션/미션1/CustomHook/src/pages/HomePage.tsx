export default function HomePage() {
  const navigateToPopular = () => {
    window.location.href = "/popular";
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black z-0" />

      <div className="relative z-10 max-w-2xl px-6 py-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
          어서오세요
          <br /> <span className="text-red-500">유진의 영화 사이트</span>
        </h1>
        <p className="mt-6 text-lg text-gray-300">
          최신 인기 영화부터 개봉 예정작까지 한눈에!
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-lg transition"
            onClick={navigateToPopular}
          >
            지금 인기작 보기
          </button>
        </div>
      </div>

      <div className="absolute -top-20 -left-20 w-72 h-72 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse z-0" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse z-0" />
    </div>
  );
}
