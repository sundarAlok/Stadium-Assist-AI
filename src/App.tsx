import { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "motion/react";
import { FAQS } from "./data/faqs";
import { MARKED_LOCATIONS } from "./data/locations";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import type { Message, MarkedLocation, TabId } from "./types";
import { LANGUAGES, type LanguageCode } from "./languages";

const ChatTab = lazy(() => import("./components/ChatTab").then((module) => ({ default: module.ChatTab })));
const DashboardTab = lazy(() => import("./components/DashboardTab").then((module) => ({ default: module.DashboardTab })));
const FAQTab = lazy(() => import("./components/FAQTab").then((module) => ({ default: module.FAQTab })));
const AIInsightsTab = lazy(() => import("./components/AIInsightsTab").then((module) => ({ default: module.AIInsightsTab })));
const HomeTab = lazy(() => import("./components/HomeTab").then((module) => ({ default: module.HomeTab })));

export default function App() {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Welcome to Stadium Assist AI! 🏟️ Our World Cup stadium guide is grounded in verified venue data. Tap any interactive location or ask for crowd-aware directions.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "gates" | "food" | "restrooms" | "others">("all");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [activeLocationId, setActiveLocationId] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [language, setLanguage] = useState<LanguageCode>("en");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const selectLocation = useCallback((loc: MarkedLocation) => {
    setActiveLocationId(loc.id);
    setIsSidebarOpen(true);
  }, []);

  const handleSendMessage = useCallback(async (textToSend: string) => {
    if (!textToSend.trim()) return;

    setActiveTab("chat");
    setApiError(null);
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((previous) => [...previous, userMessage]);
    setInputValue("");
    setIsLoading(true);

    const lowerText = textToSend.toLowerCase();
    const matchedLoc = MARKED_LOCATIONS.find((loc) =>
      lowerText.includes(loc.name.toLowerCase()) ||
      loc.features.some((feature) => lowerText.includes(feature.toLowerCase())) ||
      lowerText.includes(loc.id.toLowerCase())
    );

    if (matchedLoc) {
      selectLocation(matchedLoc);
    } else if (lowerText.includes("gate a") || lowerText.includes("parking")) {
      selectLocation(MARKED_LOCATIONS.find((loc) => loc.id === "gate-a")!);
    } else if (lowerText.includes("gate c") || lowerText.includes("medical") || lowerText.includes("aid")) {
      selectLocation(MARKED_LOCATIONS.find((loc) => loc.id === "gate-c")!);
    } else if (lowerText.includes("gate d") || lowerText.includes("wheelchair")) {
      selectLocation(MARKED_LOCATIONS.find((loc) => loc.id === "gate-d")!);
    } else if (lowerText.includes("204")) {
      selectLocation(MARKED_LOCATIONS.find((loc) => loc.id === "sec-204")!);
    } else if (lowerText.includes("104") || lowerText.includes("vegetarian") || lowerText.includes("food") || lowerText.includes("grill")) {
      selectLocation(MARKED_LOCATIONS.find((loc) => loc.id === "sec-104")!);
    } else if (lowerText.includes("restroom") || lowerText.includes("toilet")) {
      selectLocation(MARKED_LOCATIONS.find((loc) => loc.id === "sec-110-restrooms")!);
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend, language }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((previous) => [...previous, botMessage]);
    } catch (err: unknown) {
      console.error("Failed to send message:", err);
      setApiError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [language, selectLocation]);

  const handleClearChat = useCallback(() => {
    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text: `${t("welcome")}! 🏟️ ${t("welcomeDetail")} Tap any interactive location or ask for crowd-aware directions.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setApiError(null);
    setActiveLocationId("");
    setIsSidebarOpen(false);
  }, []);

  const queryLocation = useCallback((loc: MarkedLocation) => {
    selectLocation(loc);
    void handleSendMessage(loc.query);
  }, [handleSendMessage, selectLocation]);

  const formatChatMessage = useCallback((text: string) => {
    const regex = /(Gate A|Section 104|Gate C|Section 204|Gate B|Gate D|Main Stage|Section 110 Restrooms|Section 220 Restrooms|Section 208 Halal Eats|Section 112 Arena Bites|Elevator 3|Lost & Found|Water Hydration Station|Green Garden Grill)/g;
    const parts = text.split(regex);
    if (parts.length === 1) return <span>{text}</span>;

    return (
      <span>
        {parts.map((part, index) => {
          const matching = MARKED_LOCATIONS.find((location) => location.name === part);
          if (matching) {
            return (
              <span
                key={`${matching.id}-${index}`}
                onClick={() => {
                  selectLocation(matching);
                  setActiveTab("home");
                }}
                className={`inline-flex items-center gap-1 cursor-pointer hover:underline ${matching.badgeBg} ${matching.textColor} border ${matching.borderColor} px-2 py-0 rounded-lg font-mono text-xs font-bold mx-1`}
              >
                <matching.icon className="w-3 h-3" /> {matching.name}
              </span>
            );
          }
          return part;
        })}
      </span>
    );
  }, [selectLocation]);

  const selectedLoc = useMemo(() => MARKED_LOCATIONS.find((location) => location.id === activeLocationId), [activeLocationId]);

  const filteredLocations = useMemo(() => {
    return MARKED_LOCATIONS.filter((location) => {
      const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) || location.type.toLowerCase().includes(searchQuery.toLowerCase()) || location.details.toLowerCase().includes(searchQuery.toLowerCase()) || location.features.some((feature) => feature.toLowerCase().includes(searchQuery.toLowerCase()));
      if (!matchesSearch) return false;

      if (activeCategory === "all") return true;
      if (activeCategory === "gates") return location.type.toLowerCase().includes("gate") || location.type.toLowerCase().includes("transit");
      if (activeCategory === "food") return location.type.toLowerCase().includes("food") || location.type.toLowerCase().includes("halal") || location.type.toLowerCase().includes("snack") || location.type.toLowerCase().includes("bites");
      if (activeCategory === "restrooms") return location.type.toLowerCase().includes("restroom") || location.type.toLowerCase().includes("toilet");
      const isGate = location.type.toLowerCase().includes("gate") || location.type.toLowerCase().includes("transit");
      const isFood = location.type.toLowerCase().includes("food") || location.type.toLowerCase().includes("halal") || location.type.toLowerCase().includes("snack") || location.type.toLowerCase().includes("bites");
      const isRestroom = location.type.toLowerCase().includes("restroom") || location.type.toLowerCase().includes("toilet");
      return !isGate && !isFood && !isRestroom;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col antialiased">
      <a href="#tab-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-indigo-600 focus:text-white">Skip to main content</a>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main id="tab-content" className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8">
        <div className="mb-4 flex justify-end">
          <div className="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/80 px-3 py-2 shadow-lg shadow-slate-950/40">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">{t("siteLanguage")}</span>
            <label className="sr-only" htmlFor="site-language">Choose site language</label>
            <select
              id="site-language"
              value={language}
              onChange={(event) => {
                const nextLanguage = event.target.value as LanguageCode;
                setLanguage(nextLanguage);
                void i18n.changeLanguage(nextLanguage);
                window.localStorage.setItem("language", nextLanguage);
              }}
              className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none ring-0"
            >
              {LANGUAGES.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.flag} {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div key="home-tab" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.25 }}>
              <Suspense fallback={<div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 text-sm text-slate-400">Loading experience…</div>}>
                <HomeTab locations={MARKED_LOCATIONS} activeLocationId={activeLocationId} isSidebarOpen={isSidebarOpen} selectedLocation={selectedLoc} onSelectLocation={selectLocation} onQueryLocation={queryLocation} onCloseSidebar={() => setIsSidebarOpen(false)} />
              </Suspense>
            </motion.div>
          )}

          {activeTab === "chat" && (
            <motion.div key="chat-tab" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.25 }}>
              <Suspense fallback={<div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 text-sm text-slate-400">Loading chat…</div>}>
                <ChatTab messages={messages} inputValue={inputValue} isLoading={isLoading} apiError={apiError} language={language} onLanguageChange={setLanguage} onInputChange={setInputValue} onSendMessage={handleSendMessage} onClearChat={handleClearChat} onSelectLocation={selectLocation} onSetActiveTab={setActiveTab} formatChatMessage={formatChatMessage} messagesEndRef={messagesEndRef} chatInputRef={chatInputRef} />
              </Suspense>
            </motion.div>
          )}

          {activeTab === "dashboard" && (
            <motion.div key="dashboard-tab" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.25 }}>
              <Suspense fallback={<div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 text-sm text-slate-400">Loading dashboard…</div>}>
                <DashboardTab locations={MARKED_LOCATIONS} searchQuery={searchQuery} activeCategory={activeCategory} filteredLocations={filteredLocations} activeLocationId={activeLocationId} onSearchChange={setSearchQuery} onCategoryChange={setActiveCategory} onSelectLocation={selectLocation} onAskLocation={queryLocation} onResetFilters={() => { setSearchQuery(""); setActiveCategory("all"); }} />
              </Suspense>
            </motion.div>
          )}

          {activeTab === "faq" && (
            <motion.div key="faq-tab" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.25 }}>
              <Suspense fallback={<div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 text-sm text-slate-400">Loading FAQ…</div>}>
                <FAQTab faqs={FAQS} expandedFaq={expandedFaq} onToggleFaq={(index) => setExpandedFaq((current) => (current === index ? null : index))} onAskFaq={(query) => void handleSendMessage(query)} />
              </Suspense>
            </motion.div>
          )}

          {activeTab === "ai-insights" && (
            <motion.div key="ai-insights-tab" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.25 }}>
              <Suspense fallback={<div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 text-sm text-slate-400">Loading insights…</div>}>
                <AIInsightsTab />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
