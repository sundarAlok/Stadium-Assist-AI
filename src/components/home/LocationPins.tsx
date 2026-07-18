import type { MarkedLocation } from "../../types";

interface Props {
  locations: MarkedLocation[];
  activeLocationId: string;
  onSelectLocation: (
    location: MarkedLocation
  ) => void;
}

export function LocationPins({
  locations,
  activeLocationId,
  onSelectLocation,
}: Props) {
  return (
    <>
      {locations.map((location) => {
        const isActive =
          activeLocationId === location.id;

        return (
          <div
            key={location.id}
            className={`absolute ${location.position} -translate-x-1/2 -translate-y-1/2`}
          >
            <button
              onClick={() => onSelectLocation(location)}
              className={`relative w-5 h-5 rounded-full ${
                location.dotClass
              } flex items-center justify-center ${
                isActive
                  ? "scale-125 ring-4 ring-white/30"
                  : ""
              }`}
            >
              <span
                className={`absolute inset-0 rounded-full ${location.pingClass} animate-ping`}
              />
              <span className="w-2 h-2 rounded-full bg-white" />
            </button>
          </div>
        );
      })}
    </>
  );
}