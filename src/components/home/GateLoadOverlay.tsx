import { gateLoads } from "../../data/operationsData";

export function GateLoadOverlay() {
  return (
    <div className="absolute top-4 right-4 bg-slate-950 border border-slate-800 rounded-xl p-3 w-48">
      <h4 className="text-xs text-white font-bold mb-3">
        Gate Load %
      </h4>

      <div className="space-y-2">
        {gateLoads.map((gate) => (
          <div key={gate.gate}>
            <div className="flex justify-between text-[10px] text-slate-300">
              <span>Gate {gate.gate}</span>
              <span>{gate.load}%</span>
            </div>

            <div className="h-2 rounded bg-slate-800 overflow-hidden">
              <div
                className={`h-full ${
                  gate.load > 80
                    ? "bg-red-500"
                    : gate.load > 50
                    ? "bg-yellow-500"
                    : "bg-emerald-500"
                }`}
                style={{ width: `${gate.load}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}