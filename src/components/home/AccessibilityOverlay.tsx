export function AccessibilityOverlay() {
  const routes = [
    {
      id: "a1",
      position: "top-[28%] left-[42%]",
      title: "Accessible Route",
      description: "Elevator 1 → Gate D",
    },
    {
      id: "a2",
      position: "top-[58%] left-[62%]",
      title: "Wheelchair Access",
      description: "Ramp Access Available",
    },

    {
      id: "a3",
      position: "top-[18%] left-[25%]",
      title: "Accessible Entrance",
      description: "Priority Entry Lane",
    },
    {
      id: "a4",
      position: "top-[22%] left-[68%]",
      title: "Accessible Route",
      description: "Elevator 2 → Upper Deck",
    },
    {
      id: "a5",
      position: "top-[40%] left-[18%]",
      title: "Wheelchair Access",
      description: "Ramp to Lower Bowl",
    },
    {
      id: "a6",
      position: "top-[45%] left-[78%]",
      title: "Accessible Seating",
      description: "Reserved Seating Area",
    },
    {
      id: "a7",
      position: "top-[68%] left-[28%]",
      title: "Accessible Restroom",
      description: "Fully Equipped Facility",
    },
    {
      id: "a8",
      position: "top-[72%] left-[52%]",
      title: "Elevator Access",
      description: "Ground → Concourse",
    },
    {
      id: "a9",
      position: "top-[62%] left-[82%]",
      title: "Medical Assistance",
      description: "Accessibility Support Desk",
    },
  ];

  return (
    <>
      {routes.map((route) => (
        <div
          key={route.id}
          className={`absolute ${route.position} -translate-x-1/2 -translate-y-1/2`}
        >
          <div className="bg-emerald-950/90 border border-emerald-500/40 rounded-xl px-3 py-2">
            <p className="text-[10px] font-bold text-emerald-400">
              {route.title}
            </p>
            <p className="text-[10px] text-slate-300">
              {route.description}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}