export default function Footer() {
  return (
    <footer id="contact" className="border-t border-slate-800/60 bg-slate-950 px-6 py-5 sm:px-12">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 text-sm">
        <div className="flex items-center justify-center gap-2">
          <a
            href="https://linkedin.com/in/yohaneshs"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-button rounded border border-slate-800 px-3 py-1.5 text-slate-400 transition-colors hover:border-sky-500/50 hover:bg-sky-500/10 hover:text-sky-400"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Zeatherx"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-button rounded border border-slate-800 px-3 py-1.5 text-slate-400 transition-colors hover:border-sky-500/50 hover:bg-sky-500/10 hover:text-sky-400"
          >
            GitHub
          </a>
          <a
            href="mailto:yohaneshartosampurno@gmail.com"
            className="footer-button rounded border border-slate-800 px-3 py-1.5 text-slate-400 transition-colors hover:border-sky-500/50 hover:bg-sky-500/10 hover:text-sky-400"
          >
            Email
          </a>
        </div>

        <span className="font-mono text-xs text-slate-500">SGVsb8hIQ==</span>
      </div>
    </footer>
  )
}