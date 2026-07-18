interface OperationsLegendProps {
  mode: string;
}

export function OperationsLegend({
  mode,
}: OperationsLegendProps) {
  if (mode === "crowd") {
    return (
      <div className="absolute bottom-4 left-4 bg-slate-950/90 border border-slate-800 rounded-xl p-3">
        <div className="flex items-center gap-3 text-[10px]">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="text-slate-300">Low</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            <span className="text-slate-300">Medium</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="text-slate-300">High</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute bottom-4 left-4 bg-slate-950/90 border border-slate-800 rounded-xl px-3 py-2">
      <span className="text-[10px] text-slate-400">
        Live Operations Overlay
      </span>
    </div>
  );
}