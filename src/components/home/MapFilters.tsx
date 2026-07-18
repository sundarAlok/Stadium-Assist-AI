import {
  Accessibility,
  Activity,
  AlertTriangle,
  Users,
  BarChart3,
  MapPin,
} from "lucide-react";

import type { MapView } from "../../types/operations";

interface Props {
  activeView: MapView;
  onChange: (view: MapView) => void;
}

const filters = [
  {
    id: "locations",
    label: "Locations",
    icon: MapPin,
  },
  {
    id: "crowd",
    label: "Crowd",
    icon: Users,
  },
  {
    id: "queue",
    label: "Queue",
    icon: Activity,
  },
  {
    id: "gateLoad",
    label: "Gate Load",
    icon: BarChart3,
  },
  {
    id: "accessibility",
    label: "Access",
    icon: Accessibility,
  },
  {
    id: "emergency",
    label: "Emergency",
    icon: AlertTriangle,
  },
] as const;

export function MapFilters({
  activeView,
  onChange,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const Icon = filter.icon;

        return (
          <button
            key={filter.id}
            onClick={() =>
              onChange(filter.id as MapView)
            }
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeView === filter.id
                ? "bg-indigo-600 text-white"
                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <Icon className="w-4 h-4" />
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}