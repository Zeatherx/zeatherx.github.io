import { Sun, Moon } from 'lucide-react';

export default function Navbar({ theme, onToggleTheme, isCtf = false }) {
  const sectionPath = isCtf ? import.meta.env.BASE_URL : ''

  return (
    <header className="theme-nav fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-slate-800/60">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between font-sans">
        
        {/* Brand / Name Logo */}
        <a href={`${sectionPath}#about`} className="text-sm font-mono font-medium text-white hover:text-sky-400 transition-colors">
          yohanes<span className="text-sky-400">.dev</span>
        </a>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6 sm:gap-8 text-xs font-mono">
          <a href={`${sectionPath}#about`} className="text-slate-400 hover:text-white transition-colors">
            About
          </a>
          <a href={`${sectionPath}#projects`} className="text-slate-400 hover:text-white transition-colors">
            Work
          </a>
          <a href={`${sectionPath}#activities`} className="text-slate-400 hover:text-white transition-colors">
            Activities
          </a>

          {/* Animated Lamp / Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme mode"
            className="p-2 rounded-lg bg-slate-900/80 border border-slate-800/80 text-slate-300 hover:text-sky-400 hover:border-sky-500/30 transition-all duration-300 relative overflow-hidden group"
          >
            <div className="transition-transform duration-500 ease-out transform group-hover:rotate-12">
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 animate-[spin_10s_linear_infinite]" />
              ) : (
                <Moon className="w-4 h-4 text-sky-400" />
              )}
            </div>
          </button>
        </nav>

      </div>
    </header>
  );
}