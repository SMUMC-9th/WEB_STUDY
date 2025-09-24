import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="flex h-screen flex-col items-center justify-center bg-gray-100 dark:from-[#0f1015] dark:to-[#1a1b1f]">
      <h1 className="text-[5rem] font-extrabold leading-none text-gray-900 dark:text-white drop-shadow-sm">
        404
      </h1>

      <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
        찾으시는 페이지가 없습니다.
      </p>

      <Link
        to="/"
        className="mt-10 inline-flex items-center rounded-full px-8 py-3 text-lg font-medium border border-gray-200 text-black shadow "
      >
        홈으로 가기
      </Link>
    </section>
  );
}
