import { ArrowRight, Sparkles } from "lucide-react";
import type { MarkedLocation } from "../../types";

interface LocationCardProps {
  location: MarkedLocation;
  isActive: boolean;
  onSelect: (location: MarkedLocation) => void;
  onAsk: (location: MarkedLocation) => void;
}

export function LocationCard({ location, isActive, onSelect, onAsk }: LocationCardProps) {
  return (
    <div
      className={`p-4 rounded-2xl bg-slate-950 border border-slate-850 hover:border-slate-800 transition-all flex flex-col justify-between border-l-4 ${
        isActive ? "border-indigo-500" : ""
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-[9px] font-bold font-mono px-2 py-0 rounded ${location.badgeBg} ${location.textColor} border ${location.borderColor}`}>
            {location.type}
          </span>
          <span className="text-[9px] font-mono text-slate-600 uppercase font-semibold">{location.size} hotspot</span>
        </div>

        <h4 className="text-sm font-bold text-white tracking-tight flex items-center gap-1 mb-1">
          <location.icon className="w-4 h-4 text-slate-400" />
          {location.name}
        </h4>

        <p className="text-[11px] text-slate-400 leading-relaxed mb-3">{location.details}</p>

        <div className="flex flex-wrap gap-1 mb-4">
          {location.features.map((feat, idx) => (
            <span key={`${location.id}-${feat}`} className="text-[9px] px-1 py-0 rounded bg-slate-900 border border-slate-800 text-slate-300">
              {feat}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-2 pt-3 border-t border-slate-900">
        <button
          onClick={() => onSelect(location)}
          className="flex-1 text-center py-1 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 text-[10px] font-bold transition-all cursor-pointer"
        >
          Pin on Map
        </button>
        <button
          onClick={() => onAsk(location)}
          className="flex-1 text-center py-1 rounded-lg bg-indigo-600/10 hover:bg-indigo-600 border border-indigo-500/20 hover:border-indigo-500 text-indigo-400 hover:text-white text-[10px] font-bold transition-all cursor-pointer"
        >
          Ask AI Bot
        </button>
      </div>
    </div>
  );
}
