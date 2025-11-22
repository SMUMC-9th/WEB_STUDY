import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="min-h-dvh bg-gradient-to-b from-zinc-50 to-zinc-100 text-zinc-900 dark:from-zinc-950 dark:to-zinc-900 dark:text-zinc-100 selection:bg-zinc-900/90 selection:text-white">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-[-10%] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-gradient-to-b from-zinc-300/40 to-zinc-500/20 blur-3xl dark:from-zinc-700/30 dark:to-zinc-800/10" />
      </div>

      <section className="mx-auto flex min-h-dvh max-w-3xl flex-col items-center justify-center px-6">
        <div className="w-full rounded-3xl border border-zinc-200/80 bg-white/70 p-10 shadow-[0_20px_60px_-20px_rgb(0_0_0/0.25)] backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-900/60">
          <h1
            id="notfound-title"
            className="text-center text-7xl font-semibold tracking-tight text-zinc-900/90 dark:text-zinc-50 md:text-8xl"
          >
            404
          </h1>

          <div className="mx-auto my-6 h-px w-24 bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-700" />

          <p className="mx-auto max-w-xl text-center text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
            요청하신 페이지를 찾을 수 없습니다. 주소가 정확한지 확인하거나 아래
            버튼을 눌러 홈으로 이동하세요.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              to="/"
              aria-label="홈으로 이동"
              className="group inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-900 shadow-sm outline-none transition-all hover:shadow-md focus-visible:ring-2 focus-visible:ring-zinc-400 active:scale-[0.98] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:border-zinc-600"
            >
              <span>홈으로 가기</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
