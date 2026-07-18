import { useTranslation } from "react-i18next";
import { Accessibility, Activity, CheckCircle2, Layers, Search } from "lucide-react";
import type { MarkedLocation } from "../types";
import { LocationCard } from "./home/LocationCard";

interface DashboardTabProps {
  locations: MarkedLocation[];
  searchQuery: string;
  activeCategory: "all" | "gates" | "food" | "restrooms" | "others";
  filteredLocations: MarkedLocation[];
  activeLocationId: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (category: "all" | "gates" | "food" | "restrooms" | "others") => void;
  onSelectLocation: (location: MarkedLocation) => void;
  onAskLocation: (location: MarkedLocation) => void;
  onResetFilters: () => void;
}

export function DashboardTab({
  locations,
  searchQuery,
  activeCategory,
  filteredLocations,
  activeLocationId,
  onSearchChange,
  onCategoryChange,
  onSelectLocation,
  onAskLocation,
  onResetFilters,
}: DashboardTabProps) {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" aria-label="Essential Hotspots">
        <button onClick={() => onSelectLocation(locations.find((loc) => loc.id === "gate-d")!)} className="text-left bg-indigo-950/20 hover:bg-indigo-950/30 border border-indigo-500/20 rounded-2xl p-4 flex items-center justify-between group transition-all active:scale-98 cursor-pointer">
          <div>
            <p className="text-[10px] text-indigo-400 font-mono font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><Accessibility className="w-3 h-3" /> {t("designatedAccess")}</p>
            <h3 className="text-lg font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">Gate D</h3>
            <p className="text-[10px] text-slate-400 mt-1 font-mono">{t("wheelchairRamp")}</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-all text-indigo-400"><Accessibility className="h-5 w-5" /></div>
        </button>

        <button onClick={() => onSelectLocation(locations.find((loc) => loc.id === "gate-c")!)} className="text-left bg-red-950/15 hover:bg-red-950/25 border border-red-500/20 rounded-2xl p-4 flex items-center justify-between group transition-all active:scale-98 cursor-pointer">
          <div>
            <p className="text-[10px] text-red-400 font-mono font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><Activity className="w-3 h-3" /> {t("firstAidStations")}</p>
            <h3 className="text-lg font-bold text-slate-100 group-hover:text-red-300 transition-colors">Gate C & Sec 215</h3>
            <p className="text-[10px] text-slate-400 mt-1 font-mono">{t("medicalStations")}</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-all text-red-400"><Activity className="h-5 w-5" /></div>
        </button>

        <div className="text-left bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><Layers className="w-3 h-3 text-indigo-400" /> {t("groundedDatabase")}</p>
            <h3 className="text-lg font-bold text-slate-100">{locations.length} {t("coordinates")}</h3>
            <p className="text-[10px] text-slate-400 mt-1 font-mono">{t("offlineLayout")}</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700"><CheckCircle2 className="h-5 w-5 text-emerald-400" /></div>
        </div>
      </section>

      <section className="bg-slate-900 border border-slate-800 rounded-3xl p-5 md:p-6 space-y-6" aria-label="Arena Database Inspector">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">{t("arenaLocationDirectory")}</h3>
            <p className="text-xs text-slate-400 mt-0">{t("dashboardDescription")}</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2 h-4 w-4 text-slate-500" />
            <input type="text" value={searchQuery} onChange={(event) => onSearchChange(event.target.value)} placeholder={t("searchLandmarks")} className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 text-xs md:text-sm rounded-xl py-2 pl-10 pr-4 text-slate-200 placeholder:text-slate-600 outline-none transition-all" aria-label={t("searchStadiumDirectory") || "Search stadium directory"} />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 border-b border-slate-800/80 pb-4">
          {[
            { key: "all", label: t("allLocations") },
            { key: "gates", label: t("gatesTransit") },
            { key: "food", label: t("foodVendors") },
            { key: "restrooms", label: t("restrooms") },
            { key: "others", label: t("servicesSpots") },
          ].map((item) => (
            <button key={item.key} onClick={() => onCategoryChange(item.key as typeof activeCategory)} className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${activeCategory === item.key ? "bg-indigo-600 text-white" : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"}`}>
              {item.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLocations.map((location) => (
            <LocationCard key={location.id} location={location} isActive={location.id === activeLocationId} onSelect={onSelectLocation} onAsk={onAskLocation} />
          ))}

          {filteredLocations.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-500">
              <p className="text-sm font-mono">{t("noMatchingLocations")}</p>
              <button onClick={onResetFilters} className="text-xs text-indigo-400 mt-2 hover:underline focus:outline-none">{t("resetFilters")}</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
