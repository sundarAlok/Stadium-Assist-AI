import { useTranslation } from "react-i18next";
import {
  Accessibility,
  ShieldAlert,
  Users,
  Bus,
  Globe,
  Leaf,
  Siren,
  TrendingUp,
} from "lucide-react";

const insights = [
  {
    label: "Crowd Risk Score",
    value: "68 / 100",
    detail:
      "Moderate congestion predicted around North Concourse during the next 30 minutes.",
  },
  {
    label: "Fastest Entry Route",
    value: "Gate B",
    detail:
      "Estimated wait time 4 minutes with lowest congestion index.",
  },
  {
    label: "Accessibility Recommendation",
    value: "Gate D",
    detail:
      "Best route for wheelchair users with elevator and ramp access.",
  },
  {
    label: "Emergency Readiness",
    value: "96%",
    detail:
      "Medical, fire response, and security teams operating at optimal readiness.",
  },
];

export function AIInsightsTab() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-950 border border-indigo-500/20 rounded-3xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <ShieldAlert className="w-6 h-6 text-indigo-400" />
          <h2 className="text-xl font-bold text-white">
            {t("worldCupAiOperations")}
          </h2>

          <span className="ml-auto bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            AI ONLINE
          </span>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed">
          Stadium Assist AI continuously analyzes crowd movement,
          transportation demand, accessibility routes, volunteer deployment,
          emergency readiness, and venue operations to provide real-time
          recommendations for fans, staff, and organizers.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <p className="text-slate-500 text-xs">Attendance</p>
          <p className="text-2xl font-bold text-white">82,500</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <p className="text-slate-500 text-xs">AI Confidence</p>
          <p className="text-2xl font-bold text-emerald-400">97.8%</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <p className="text-slate-500 text-xs">Active Alerts</p>
          <p className="text-2xl font-bold text-yellow-400">4</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <p className="text-slate-500 text-xs">Operational Status</p>
          <p className="text-2xl font-bold text-sky-400">Optimal</p>
        </div>
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight) => (
          <div
            key={insight.label}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-indigo-500/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-mono">
                {insight.label}
              </p>

              <span className="rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 text-[10px] font-semibold">
                AI Generated
              </span>
            </div>

            <p className="text-2xl font-bold text-white mb-2">
              {insight.value}
            </p>

            <p className="text-sm text-slate-400">
              {insight.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Intelligence Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5">
          <h3 className="text-sm font-bold text-white mb-5 flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-400" />
            {t("crowdIntelligence")}
          </h3>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">
                Current Attendance
              </span>
              <span className="text-white font-semibold">
                82,500
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">
                Peak Congestion
              </span>
              <span className="text-yellow-400 font-semibold">
                North Concourse
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">
                Avg Wait Time
              </span>
              <span className="text-white font-semibold">
                7 min
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">
                Flow Improvement
              </span>
              <span className="text-emerald-400 font-semibold">
                +24%
              </span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-2">
              <div className="bg-indigo-500 h-2 rounded-full w-[78%]" />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5">
          <h3 className="text-sm font-bold text-white mb-5 flex items-center gap-2">
            <Accessibility className="w-4 h-4 text-emerald-400" />
            {t("accessibilityIntelligence")}
          </h3>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">
                Accessible Routes
              </span>
              <span className="text-white font-semibold">
                12
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">
                Elevators Online
              </span>
              <span className="text-emerald-400 font-semibold">
                100%
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">
                Recommended Gate
              </span>
              <span className="text-white font-semibold">
                Gate D
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">
                Accessible Restrooms
              </span>
              <span className="text-white font-semibold">
                6
              </span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full w-[99%]" />
            </div>
          </div>
        </div>
      </div>

      {/* Operations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <Bus className="w-5 h-5 text-indigo-400 mb-3" />
          <h4 className="text-white font-semibold mb-2">
            {t("transportationAi")}
          </h4>

          <p className="text-sm text-slate-400">
            Shuttle demand expected to increase by 18% immediately after
            match completion. AI suggests dynamic bus allocation.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <Leaf className="w-5 h-5 text-emerald-400 mb-3" />
          <h4 className="text-white font-semibold mb-2">
            {t("sustainability")}
          </h4>

          <p className="text-sm text-slate-400">
            Smart waste routing and optimized energy management could
            reduce venue resource consumption by 14%.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <Globe className="w-5 h-5 text-sky-400 mb-3" />
          <h4 className="text-white font-semibold mb-2">
            {t("multilingualSupport")}
          </h4>

          <p className="text-sm text-slate-400">
            Real-time support available in English, Spanish, French,
            Portuguese, Arabic, and Hindi.
          </p>
        </div>
      </div>

      {/* Readiness */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5">
        <h3 className="text-sm font-bold text-white mb-5 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-indigo-400" />
          {t("operationalReadiness")}
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-emerald-400">97%</p>
            <p className="text-xs text-slate-500 mt-1">
              Venue Readiness
            </p>
          </div>

          <div className="text-center">
            <p className="text-3xl font-bold text-indigo-400">94%</p>
            <p className="text-xs text-slate-500 mt-1">
              Crowd Flow
            </p>
          </div>

          <div className="text-center">
            <p className="text-3xl font-bold text-sky-400">99%</p>
            <p className="text-xs text-slate-500 mt-1">
              Accessibility
            </p>
          </div>

          <div className="text-center">
            <p className="text-3xl font-bold text-red-400">96%</p>
            <p className="text-xs text-slate-500 mt-1">
              Emergency Response
            </p>
          </div>

          <div className="text-center">
            <p className="text-3xl font-bold text-yellow-400">95%</p>
            <p className="text-xs text-slate-500 mt-1">
              Transport Network
            </p>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5">
        <h3 className="text-sm font-bold text-white mb-5 flex items-center gap-2">
          <Siren className="w-4 h-4 text-indigo-400" />
          {t("aiRecommendations")}
        </h3>

        <ul className="space-y-4 text-sm">
          <li className="border-l-4 border-emerald-500 pl-3 text-slate-300">
            High Impact: Redirect arriving supporters to Gate B to reduce
            queue pressure by up to 24%.
          </li>

          <li className="border-l-4 border-indigo-500 pl-3 text-slate-300">
            Medium Impact: Deploy additional volunteers around North
            Concourse before peak arrival.
          </li>

          <li className="border-l-4 border-sky-500 pl-3 text-slate-300">
            Accessibility: Prioritize accessible shuttle services toward
            Gate D.
          </li>

          <li className="border-l-4 border-red-500 pl-3 text-slate-300">
            Safety: Maintain medical standby near Section 215 and Gate C.
          </li>

          <li className="border-l-4 border-yellow-500 pl-3 text-slate-300">
            International Fans: Increase multilingual guidance coverage
            during peak movement periods.
          </li>
        </ul>
      </div>
    </div>
  );
}