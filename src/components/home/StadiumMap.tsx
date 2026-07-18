import { CrowdOverlay } from "./CrowdOverlay";
import { QueueOverlay } from "./QueueOverlay";
import { GateLoadOverlay } from "./GateLoadOverlay";
import { AccessibilityOverlay } from "./AccessibilityOverlay";
import { EmergencyOverlay } from "./EmergencyOverlay";
import { OperationsLegend } from "./OperationsLegend";
import type { MapView } from "../../types/operations";
import type { MarkedLocation } from "../../types";

interface StadiumMapProps {
  view: MapView;
  locations: MarkedLocation[];
  activeLocationId: string;
  onSelectLocation: (location: MarkedLocation) => void;
}

export function StadiumMap({
  view,
  locations,
  activeLocationId,
  onSelectLocation,
}: StadiumMapProps) {
  return (
    <div className="bg-slate-950 rounded-2xl relative flex items-center justify-center overflow-hidden p-4 min-h-[440px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.07)_0%,_transparent_75%)]" />

      <div className="relative w-80 h-48 border-4 border-slate-900 rounded-full flex items-center justify-center opacity-40">
        <div className="w-56 h-32 border-2 border-slate-800 rounded-full flex items-center justify-center">
          <div className="w-24 h-12 border border-dashed border-slate-700 rounded-full bg-slate-950/80" />
        </div>
      </div>

      {view === "locations" &&
        locations.map((location) => {
          const isActive =
            activeLocationId === location.id;

          let sizeClasses = "w-4 h-4";
          let pingClasses = "w-4 h-4";
          let innerCircleClasses = "w-1 h-1";

          if (location.size === "big") {
            sizeClasses = "w-7 h-7";
            pingClasses = "w-7 h-7";
            innerCircleClasses = "w-2 h-2";
          } else if (
            location.size === "medium"
          ) {
            sizeClasses = "w-5 h-5";
            pingClasses = "w-5 h-5";
          }

          return (
            <div
              key={location.id}
              className={`absolute ${location.position} -translate-x-1/2 -translate-y-1/2 group z-20`}
            >
              <button
                onClick={() =>
                  onSelectLocation(location)
                }
                className={`relative ${sizeClasses} rounded-full ${
                  location.dotClass
                } flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? "scale-125 ring-4 ring-white/30"
                    : "hover:scale-110"
                }`}
              >
                <span
                  className={`absolute ${pingClasses} rounded-full ${location.pingClass} animate-ping`}
                />

                <span
                  className={`${innerCircleClasses} rounded-full bg-white`}
                />
              </button>

              {/* TOOLTIP */}
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900/95 border border-slate-700 px-3 py-2 rounded-xl backdrop-blur-md text-[10px] font-bold text-slate-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl z-50">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${location.dotClass}`}
                  />
                  <span>{location.name}</span>
                </div>

                <div className="text-slate-400 text-[9px] mt-1">
                  {location.type}
                </div>
              </div>
            </div>
          );
        })}

      {view === "crowd" && <CrowdOverlay />}

      {view === "queue" && <QueueOverlay />}

      {view === "gateLoad" && (
        <GateLoadOverlay />
      )}

      {view === "accessibility" && (
        <AccessibilityOverlay />
      )}

      {view === "emergency" && (
        <EmergencyOverlay />
      )}

      <OperationsLegend mode={view} />
    </div>
  );
}