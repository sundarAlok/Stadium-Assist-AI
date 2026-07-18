export function EmergencyOverlay() {
  const alerts = [
    {
      id: "e1",
      position: "top-[24%] left-[70%]",
      status: "Monitoring",
      severity: "low",
    },
    {
      id: "e2",
      position: "top-[62%] left-[28%]",
      status: "Medical Team Nearby",
      severity: "medium",
    },
    {
      id: "e3",
      position: "top-[18%] left-[42%]",
      status: "Security Post",
      severity: "low",
    },
    {
      id: "e4",
      position: "top-[35%] left-[82%]",
      status: "Emergency Exit",
      severity: "low",
    },
    {
      id: "e5",
      position: "top-[48%] left-[18%]",
      status: "First Aid Station",
      severity: "medium",
    },
    {
      id: "e6",
      position: "top-[72%] left-[52%]",
      status: "Control Room",
      severity: "low",
    },
    {
      id: "e7",
      position: "top-[68%] left-[78%]",
      status: "Fire Response Team",
      severity: "medium",
    },
  ];

  return (
    <>
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`absolute ${alert.position} -translate-x-1/2 -translate-y-1/2`}
        >
          <div
            className={`w-8 h-8 rounded-full animate-pulse ${
              alert.severity === "medium"
                ? "bg-yellow-500/50"
                : "bg-emerald-500/50"
            }`}
          />

          <div className="mt-2 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-[10px] text-white whitespace-nowrap">
            {alert.status}
          </div>
        </div>
      ))}
    </>
  );
}