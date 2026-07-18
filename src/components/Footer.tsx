export function Footer() {
  return (
    <footer className="mt-8 py-6 px-6 md:px-8 border-t border-slate-900 bg-slate-950/60 text-[10px] text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap gap-4 md:gap-6 uppercase tracking-wider font-mono">
          <span>Version 1.1.0-world-cup</span>
          <span>Data: Stadium.json (Grounded)</span>
          <span className="text-indigo-400 font-bold">Accessibility Ready</span>
        </div>
        <p className="font-mono">© {new Date().getFullYear()} Stadium Assist AI Systems. All rights reserved.</p>
      </div>
    </footer>
  );
}
