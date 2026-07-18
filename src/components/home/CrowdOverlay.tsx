import { crowdZones } from "../../data/operationsData";

export function CrowdOverlay() {
  return (
    <>
      {crowdZones.map((zone) => {
        const color =
          zone.level === "high"
            ? "bg-red-500"
            : zone.level === "medium"
            ? "bg-yellow-500"
            : "bg-emerald-500";

        const size =
          zone.level === "high"
            ? "w-24 h-24"
            : zone.level === "medium"
            ? "w-16 h-16"
            : "w-12 h-12";

        return (
          <div
            key={zone.id}
            className={`absolute ${zone.position} -translate-x-1/2 -translate-y-1/2`}
          >
            <div
              className={`${size} rounded-full ${color} opacity-35 animate-pulse`}
            />
          </div>
        );
      })}
    </>
  );
}