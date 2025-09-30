export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black px-4">
      <h1 className="text-[8rem] md:text-[12rem] font-extrabold text-red-600 drop-shadow-lg">
        404
      </h1>

      <p className="text-white text-xl md:text-2xl mt-4 text-center">
        페이지를 찾을 수 없습니다.
      </p>

      <button
        onClick={() => (window.location.href = "/")}
        className="mt-8 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-lg transition"
      >
        홈으로 돌아가기
      </button>

      <div className="absolute top-10 -left-10 w-72 h-72 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-10 -right-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
    </div>
  );
}
