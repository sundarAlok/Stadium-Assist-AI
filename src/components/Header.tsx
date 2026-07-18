import { Activity, Bot, HelpCircle, MapPin, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo.png";
import type { TabId } from "../types";

interface HeaderProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  const { t } = useTranslation();
  const tabs: Array<{ id: TabId; label: string; icon: typeof MapPin }> = [
    { id: "home", label: t("home"), icon: MapPin },
    { id: "chat", label: t("chat"), icon: Bot },
    { id: "dashboard", label: t("dashboard"), icon: Activity },
    { id: "faq", label: t("faq"), icon: HelpCircle },
    { id: "ai-insights", label: t("aiInsights"), icon: Sparkles },
  ];

  return (
    <header className="py-5 px-6 md:px-8 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
            <img src={logo} alt="Stadium Assist AI Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2 font-display">
              STADIUM ASSIST <span className="text-indigo-400 font-mono text-xs border border-indigo-500/30 px-2 py-0 rounded ml-1">AI</span>
            </h1>
            <p className="text-[9px] text-slate-400 uppercase tracking-widest font-mono">World Cup Navigation & Arena Support</p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-center bg-slate-900 border border-slate-800 p-1 rounded-2xl" aria-label="Main Navigation">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-1 md:gap-2 px-3 md:px-5 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                  isActive ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25" : "text-slate-400 hover:text-white hover:bg-slate-850"
                }`}
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                role="tab"
              >
                <Icon className="w-3 h-3" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
