import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Sparkles, X } from "lucide-react";

import type { MarkedLocation } from "../types";
import type { MapView } from "../types/operations";

import { MapFilters } from "./home/MapFilters";
import { StadiumMap } from "./home/StadiumMap";

interface HomeTabProps {
  locations: MarkedLocation[];
  activeLocationId: string;
  isSidebarOpen: boolean;
  selectedLocation: MarkedLocation | undefined;
  onSelectLocation: (location: MarkedLocation) => void;
  onQueryLocation: (location: MarkedLocation) => void;
  onCloseSidebar: () => void;
}

export function HomeTab({
  locations,
  activeLocationId,
  isSidebarOpen,
  selectedLocation,
  onSelectLocation,
  onQueryLocation,
  onCloseSidebar,
}: HomeTabProps) {
  const { t } = useTranslation();

  const [activeView, setActiveView] =
    useState<MapView>("locations");

  const activeLocation = useMemo(
    () =>
      locations.find(
        (location) =>
          location.id === activeLocationId
      ),
    [locations, activeLocationId]
  );

  return (
    <div className="space-y-6">
      <div className="bg-indigo-950/20 border border-indigo-500/15 rounded-3xl p-4 md:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            {t("worldCupNavigator")}
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            Real-time stadium intelligence with
            crowd, queue, accessibility,
            emergency and gate monitoring.
          </p>
        </div>

        <div className="flex gap-2 shrink-0">
          <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded-xl border border-indigo-500/20 font-mono font-semibold">
            {locations.length}{" "}
            {t("activeHotspots")}
          </span>

          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-xl border border-emerald-500/20 font-mono font-semibold">
            AI Route Ready
          </span>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4">
        <MapFilters
          activeView={activeView}
          onChange={setActiveView}
        />
      </div>

      <section className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden p-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 min-h-[500px]">
          <div
            className={`${
              isSidebarOpen
                ? "lg:col-span-8"
                : "lg:col-span-12"
            } transition-all duration-300`}
          >
            <StadiumMap
              view={activeView}
              locations={locations}
              activeLocationId={
                activeLocationId
              }
              onSelectLocation={
                onSelectLocation
              }
            />
          </div>

          {isSidebarOpen &&
            selectedLocation && (
              <div className="lg:col-span-4 bg-slate-900 rounded-2xl border border-slate-800 p-5 relative">
                <button
                  onClick={onCloseSidebar}
                  className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="space-y-5">
                  <div>
                    <span
                      className={`text-[10px] font-semibold px-2 py-1 rounded-md border ${selectedLocation.badgeBg} ${selectedLocation.textColor} ${selectedLocation.borderColor}`}
                    >
                      {
                        selectedLocation.type
                      }
                    </span>

                    <h3 className="text-xl font-bold text-white mt-3">
                      {
                        selectedLocation.name
                      }
                    </h3>

                    <p className="text-xs text-slate-400 mt-1">
                      Arena landmark details
                    </p>
                  </div>

                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${selectedLocation.badgeBg} ${selectedLocation.borderColor}`}
                  >
                    <selectedLocation.icon className="w-7 h-7 text-white" />
                  </div>

                  {selectedLocation.details && (
                    <div>
                      <h4 className="text-sm font-semibold text-slate-200 mb-2">
                        Description
                      </h4>

                      <p className="text-sm text-slate-400">
                        {
                          selectedLocation.details
                        }
                      </p>
                    </div>
                  )}

                  {selectedLocation.features &&
                    selectedLocation
                      .features.length >
                      0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-slate-200 mb-2">
                          Features
                        </h4>

                        <div className="flex flex-wrap gap-2">
                          {selectedLocation.features.map(
                            (
                              feature,
                              index
                            ) => (
                              <span
                                key={index}
                                className="px-2 py-1 text-xs rounded-lg bg-slate-800 text-slate-300 border border-slate-700"
                              >
                                {feature}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}

                  <button
                    onClick={() =>
                      onQueryLocation(
                        selectedLocation
                      )
                    }
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl py-3 font-semibold transition-colors"
                  >
                    Ask AI About This
                    Location
                  </button>

                  {activeLocation && (
                    <div className="text-xs text-slate-500 border-t border-slate-800 pt-4">
                      Active Location:
                      <span className="ml-2 text-slate-300">
                        {
                          activeLocation.name
                        }
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
        </div>
      </section>
    </div>
  );
}

export default HomeTab;