import { queueZones } from "../../data/operationsData";

export function QueueOverlay() {
  return (
    <>
      {queueZones.map((zone) => (
        <div
          key={zone.id}
          className={`absolute ${zone.position} -translate-x-1/2 -translate-y-1/2`}
        >
          <div className="bg-slate-950 border border-slate-700 px-2 py-1 rounded-lg text-xs text-white">
            Queue: {zone.value}m
          </div>
        </div>
      ))}
    </>
  );
}