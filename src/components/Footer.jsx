export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t border-gray-100 dark:border-gray-900 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <span className="font-heading font-bold text-lg text-gray-900 dark:text-white">
            SJ<span className="text-accent-500">.</span>
          </span>
          <span>© 2026 Md Shahid Jamal. All rights reserved.</span>
        </div>

        <p className="text-gray-500 dark:text-gray-400">❤ Built with passion and lots of chai ☕</p>
      </div>
    </footer>
  );
}
