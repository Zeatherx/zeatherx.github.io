import { Sun, Moon } from 'lucide-react';

export default function Navbar({ theme, onToggleTheme }) {
  return (
    <header className="theme-nav fixed left-0 right-0 top-0 z-50 border-b border-slate-800/60 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 font-sans sm:px-6">
        <a href="#about" className="text-sm font-mono font-medium text-white transition-colors hover:text-sky-400">
          yohanes<span className="text-sky-400">.dev</span>
        </a>

        <nav aria-label="Primary navigation" className="flex items-center gap-3 text-xs font-mono sm:gap-8">
          <a href="#about" className="text-slate-400 transition-colors hover:text-white">
            About
          </a>
          <a href="#projects" className="text-slate-400 transition-colors hover:text-white">
            Work
          </a>
          <a href="#activities" className="text-slate-400 transition-colors hover:text-white">
            Activities
          </a>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle theme mode"
            className="group relative overflow-hidden rounded-lg border border-slate-800/80 bg-slate-900/80 p-2 text-slate-300 transition-all duration-300 hover:border-sky-500/30 hover:text-sky-400"
          >
            <span className="block transform transition-transform duration-500 ease-out group-hover:rotate-12">
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 animate-[spin_10s_linear_infinite]" />
              ) : (
                <Moon className="w-4 h-4 text-sky-400" />
              )}
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}
