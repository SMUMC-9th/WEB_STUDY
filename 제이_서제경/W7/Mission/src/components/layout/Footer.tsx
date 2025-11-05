export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white/60 backdrop-blur-md dark:bg-neutral-900/60 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between py-6 gap-2 text-sm text-neutral-500 dark:text-neutral-400">
          <p className="tracking-tight">
            © {new Date().getFullYear()}{" "}
            <span className="font-medium text-neutral-800 dark:text-neutral-200">
              UMsiC
            </span>
            . All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <a
              href="/privacy"
              className="hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
            >
              개인정보처리방침
            </a>
            <a
              href="/terms"
              className="hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
            >
              이용약관
            </a>
            <a
              href="mailto:contact@umsic.com"
              className="hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
            >
              문의하기
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
