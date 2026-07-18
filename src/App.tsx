import { useState, useRef, useEffect } from "react";
import { 
  User, 
  Bot, 
  Send, 
  RefreshCw, 
  HelpCircle, 
  MapPin, 
  Accessibility, 
  Activity, 
  Utensils, 
  AlertCircle, 
  Trash2,
  Info,
  Layers,
  Sparkles,
  Search,
  CheckCircle2,
  ArrowRight,
  Compass,
  PhoneCall,
  Clock,
  ShieldAlert,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Message } from "./types";

interface MarkedLocation {
  id: string;
  name: string;
  type: string;
  size: "big" | "medium" | "small";
  dotClass: string;
  pingClass: string;
  textColor: string;
  borderColor: string;
  borderHoverColor: string;
  bgColor: string;
  glowClass: string;
  badgeBg: string;
  accentColor: string;
  position: string;
  details: string;
  query: string;
  icon: any;
  features: string[];
}

const MARKED_LOCATIONS: MarkedLocation[] = [
  // 7 Main Locations (marked with big points)
  {
    id: "gate-a",
    name: "Gate A",
    type: "Gate & Transport",
    size: "big",
    dotClass: "bg-indigo-500",
    pingClass: "bg-indigo-400",
    textColor: "text-indigo-400",
    borderColor: "border-indigo-500/20",
    borderHoverColor: "border-indigo-500/50",
    bgColor: "bg-indigo-950/20",
    glowClass: "shadow-[0_0_20px_rgba(99,102,241,0.6)]",
    badgeBg: "bg-indigo-500/10",
    accentColor: "indigo",
    position: "top-[20%] left-[12%]",
    details: "Primary entry gate located near Parking P1. Handles general access and coordinates with the main taxi drop-off terminal. Opens exactly 2 hours prior to scheduled event kickoff.",
    query: "Where is Gate A?",
    icon: MapPin,
    features: ["Parking P1 Access", "General Admittance", "Taxi Drops"]
  },
  {
    id: "sec-104",
    name: "Section 104",
    type: "Grounded Food Hub",
    size: "big",
    dotClass: "bg-emerald-500",
    pingClass: "bg-emerald-400",
    textColor: "text-emerald-400",
    borderColor: "border-emerald-500/20",
    borderHoverColor: "border-emerald-500/50",
    bgColor: "bg-emerald-950/20",
    glowClass: "shadow-[0_0_20px_rgba(16,185,129,0.6)]",
    badgeBg: "bg-emerald-500/10",
    accentColor: "emerald",
    position: "top-[75%] left-[24%]",
    details: "Host to the Green Garden Grill, our main designated healthy-bites vendor. Fully verified grounded menu offers premium vegetarian burgers and Gluten-Free plant-based alternatives.",
    query: "Where can I buy vegetarian food?",
    icon: Utensils,
    features: ["Vegetarian Burgers", "Gluten-Free Buns", "Plant Hot Dogs"]
  },
  {
    id: "gate-c",
    name: "Gate C",
    type: "Medical First Aid",
    size: "big",
    dotClass: "bg-red-500",
    pingClass: "bg-red-400",
    textColor: "text-red-400",
    borderColor: "border-red-500/20",
    borderHoverColor: "border-red-500/50",
    bgColor: "bg-red-950/20",
    glowClass: "shadow-[0_0_20px_rgba(239,68,68,0.6)]",
    badgeBg: "bg-red-500/10",
    accentColor: "red",
    position: "top-[22%] left-[84%]",
    details: "The stadium's central Medical Station, fully staffed with certified EMTs. Strategically situated at Gate C (North Plaza) for direct emergency access and response.",
    query: "Where is the medical station?",
    icon: Activity,
    features: ["24/7 EMT Staffed", "Heart Defibrillator", "Ice & Splints"]
  },
  {
    id: "sec-204",
    name: "Section 204",
    type: "Upper Level Directions",
    size: "big",
    dotClass: "bg-purple-500",
    pingClass: "bg-purple-400",
    textColor: "text-purple-400",
    borderColor: "border-purple-500/20",
    borderHoverColor: "border-purple-500/50",
    bgColor: "bg-purple-950/20",
    glowClass: "shadow-[0_0_20px_rgba(168,85,247,0.6)]",
    badgeBg: "bg-purple-500/10",
    accentColor: "purple",
    position: "top-[78%] left-[76%]",
    details: "Premium seating located on the Upper Concourse level. Can be reached easily by taking the North Escalator near Gate B, or utilizing Elevator 3 situated next to Gate C.",
    query: "How do I reach Section 204?",
    icon: Info,
    features: ["Upper Tier Views", "North Escalator Route", "Elevator 3 Access"]
  },
  {
    id: "gate-b",
    name: "Gate B",
    type: "Transit Hub",
    size: "big",
    dotClass: "bg-blue-500",
    pingClass: "bg-blue-400",
    textColor: "text-blue-400",
    borderColor: "border-blue-500/20",
    borderHoverColor: "border-blue-500/50",
    bgColor: "bg-blue-950/20",
    glowClass: "shadow-[0_0_20px_rgba(59,130,246,0.6)]",
    badgeBg: "bg-blue-500/10",
    accentColor: "blue",
    position: "top-[12%] left-[48%]",
    details: "Located opposite the central Metro transit exit. Features high-throughput ticket scanning, rapid entry turnstiles, and direct accessibility to surrounding eco bike rails.",
    query: "Where is Gate B?",
    icon: Compass,
    features: ["Metro Exit Access", "Rapid Turnstiles", "Security Line B"]
  },
  {
    id: "gate-d",
    name: "Gate D",
    type: "Wheelchair Entry",
    size: "big",
    dotClass: "bg-sky-500",
    pingClass: "bg-sky-400",
    textColor: "text-sky-400",
    borderColor: "border-sky-500/20",
    borderHoverColor: "border-sky-500/50",
    bgColor: "bg-sky-950/20",
    glowClass: "shadow-[0_0_20px_rgba(14,165,233,0.6)]",
    badgeBg: "bg-sky-500/10",
    accentColor: "sky",
    position: "top-[74%] left-[10%]",
    details: "Designated wheelchair accessible entrance on the West Concourse. Features wide access ramps, lower handrails, and priority service agents for immediate ticketing.",
    query: "Where is Gate D?",
    icon: Accessibility,
    features: ["Wheelchair Ramp", "Priority Assistance", "Elevator 1 Direct"]
  },
  {
    id: "main-stage",
    name: "Main Stage",
    type: "Event Field",
    size: "big",
    dotClass: "bg-amber-500",
    pingClass: "bg-amber-400",
    textColor: "text-amber-400",
    borderColor: "border-amber-500/20",
    borderHoverColor: "border-amber-500/50",
    bgColor: "bg-amber-950/20",
    glowClass: "shadow-[0_0_20px_rgba(245,158,11,0.6)]",
    badgeBg: "bg-amber-500/10",
    accentColor: "amber",
    position: "top-[48%] left-[48%]",
    details: "Centrally located stadium stage area for concerts and special events. Access strictly requires a field-access VIP wristband and credentials validation.",
    query: "Where is the Main Stage?",
    icon: Sparkles,
    features: ["Concert Stage", "Media Box", "Acoustic Arrays"]
  },

  // 5 Medium Locations (smaller / less relevant than main 7)
  {
    id: "sec-110-restrooms",
    name: "Section 110 Restrooms",
    type: "Family Restrooms",
    size: "medium",
    dotClass: "bg-pink-500",
    pingClass: "bg-pink-400",
    textColor: "text-pink-400",
    borderColor: "border-pink-500/20",
    borderHoverColor: "border-pink-500/50",
    bgColor: "bg-pink-950/20",
    glowClass: "shadow-[0_0_15px_rgba(236,72,153,0.5)]",
    badgeBg: "bg-pink-500/10",
    accentColor: "pink",
    position: "top-[52%] left-[16%]",
    details: "All-Gender and Family restroom facilities. Fully wheelchair accessible, equipped with infant changing stations and sensory-friendly sinks.",
    query: "Where are the restrooms at Section 110?",
    icon: RefreshCw,
    features: ["Baby Changing", "Wheelchair Stall", "Sensory Friendly"]
  },
  {
    id: "sec-220-restrooms",
    name: "Section 220 Restrooms",
    type: "Accessible Toilets",
    size: "medium",
    dotClass: "bg-rose-500",
    pingClass: "bg-rose-400",
    textColor: "text-rose-400",
    borderColor: "border-rose-500/20",
    borderHoverColor: "border-rose-500/50",
    bgColor: "bg-rose-950/20",
    glowClass: "shadow-[0_0_15px_rgba(244,63,94,0.5)]",
    badgeBg: "bg-rose-500/10",
    accentColor: "rose",
    position: "top-[50%] left-[84%]",
    details: "Standard Men's and Women's restroom cluster with large wheelchair accessible stalls and touchless washbasin installations.",
    query: "Where are the Section 220 restrooms?",
    icon: RefreshCw,
    features: ["Men & Women Cabinets", "Touchless Faucets", "Accessible Stalls"]
  },
  {
    id: "sec-208-halal",
    name: "Section 208 Halal Eats",
    type: "Premium Halal Food",
    size: "medium",
    dotClass: "bg-orange-500",
    pingClass: "bg-orange-400",
    textColor: "text-orange-400",
    borderColor: "border-orange-500/20",
    borderHoverColor: "border-orange-500/50",
    bgColor: "bg-orange-950/20",
    glowClass: "shadow-[0_0_15px_rgba(249,115,22,0.5)]",
    badgeBg: "bg-orange-500/10",
    accentColor: "orange",
    position: "top-[34%] left-[28%]",
    details: "Certified Halal vendor serving flavor-packed chicken shawarma wraps, Mediterranean falafel pockets, and refreshing mint lemonades.",
    query: "Find halal food options.",
    icon: Utensils,
    features: ["Chicken Shawarma", "Falafel Wraps", "Halal Certified"]
  },
  {
    id: "sec-112-bites",
    name: "Section 112 Arena Bites",
    type: "Snack Vendor",
    size: "medium",
    dotClass: "bg-lime-500",
    pingClass: "bg-lime-400",
    textColor: "text-lime-400",
    borderColor: "border-lime-500/20",
    borderHoverColor: "border-lime-500/50",
    bgColor: "bg-lime-950/20",
    glowClass: "shadow-[0_0_15px_rgba(132,204,22,0.5)]",
    badgeBg: "bg-lime-500/10",
    accentColor: "lime",
    position: "top-[64%] left-[68%]",
    details: "Great for quick matchday snacks. Sells classic stadium hot dogs, hot cheese nachos, soft baked pretzels, and draft beverages.",
    query: "Where is Arena Bites?",
    icon: Utensils,
    features: ["Hot Cheese Nachos", "Pretzels & Soda", "Fast Checkout"]
  },
  {
    id: "elevator-3",
    name: "Elevator 3 (Gate C)",
    type: "Accessibility Lift",
    size: "medium",
    dotClass: "bg-teal-500",
    pingClass: "bg-teal-400",
    textColor: "text-teal-400",
    borderColor: "border-teal-500/20",
    borderHoverColor: "border-teal-500/50",
    bgColor: "bg-teal-950/20",
    glowClass: "shadow-[0_0_15px_rgba(20,184,166,0.5)]",
    badgeBg: "bg-teal-500/10",
    accentColor: "teal",
    position: "top-[24%] left-[64%]",
    details: "High-speed elevator near Gate C providing direct transit access to Upper Concourse Level 2 and premium Section 204 seating.",
    query: "Where is Elevator 3?",
    icon: Layers,
    features: ["Upper Tier access", "Gate C proximity", "Priority Boarding"]
  },

  // 9 Smallest Locations
  {
    id: "parking-p1",
    name: "Parking P1",
    type: "VIP & Staff Parking",
    size: "small",
    dotClass: "bg-indigo-400",
    pingClass: "bg-indigo-300",
    textColor: "text-indigo-300",
    borderColor: "border-indigo-400/10",
    borderHoverColor: "border-indigo-400/30",
    bgColor: "bg-slate-900/40",
    glowClass: "",
    badgeBg: "bg-indigo-400/10",
    accentColor: "indigo",
    position: "top-[6%] left-[8%]",
    details: "Pre-booked VIP and player parking area, directly adjacent to Gate A entrance pathways.",
    query: "Where is Parking P1?",
    icon: MapPin,
    features: ["Premium Parking", "Direct Entry Path", "Security Monitored"]
  },
  {
    id: "elevator-1",
    name: "Elevator 1 (Gate A)",
    type: "General Lift",
    size: "small",
    dotClass: "bg-slate-400",
    pingClass: "bg-slate-300",
    textColor: "text-slate-300",
    borderColor: "border-slate-400/10",
    borderHoverColor: "border-slate-400/30",
    bgColor: "bg-slate-900/40",
    glowClass: "",
    badgeBg: "bg-slate-400/10",
    accentColor: "slate",
    position: "top-[30%] left-[6%]",
    details: "General passenger lift located inside the Gate A foyer, assisting in lower-level terrace transitions.",
    query: "Where is Elevator 1?",
    icon: Layers,
    features: ["Lower Terrace Transit", "Wheelchair Friendly", "Gate A foyer"]
  },
  {
    id: "merch-a",
    name: "Merchandise Stand A",
    type: "Official Team Gear",
    size: "small",
    dotClass: "bg-violet-400",
    pingClass: "bg-violet-300",
    textColor: "text-violet-300",
    borderColor: "border-violet-400/10",
    borderHoverColor: "border-violet-400/30",
    bgColor: "bg-slate-900/40",
    glowClass: "",
    badgeBg: "bg-violet-400/10",
    accentColor: "violet",
    position: "top-[8%] left-[34%]",
    details: "Our flagship superstore located near Gate B. Sells official matchday kits, custom printed player jerseys, scarfs, and pins.",
    query: "Where is Merchandise Stand A?",
    icon: Sparkles,
    features: ["Official Kits", "Jersey Printing", "Matchday Souvenirs"]
  },
  {
    id: "merch-b",
    name: "Merchandise Stand B",
    type: "Upper Level Souvenirs",
    size: "small",
    dotClass: "bg-fuchsia-400",
    pingClass: "bg-fuchsia-300",
    textColor: "text-fuchsia-300",
    borderColor: "border-fuchsia-400/10",
    borderHoverColor: "border-fuchsia-400/30",
    bgColor: "bg-slate-900/40",
    glowClass: "",
    badgeBg: "bg-fuchsia-400/10",
    accentColor: "fuchsia",
    position: "top-[88%] left-[58%]",
    details: "Express souvenirs outpost near Section 204. Ideal for quick purchases of caps, scarfs, programs, and collectible cups.",
    query: "Where is Merchandise Stand B?",
    icon: Sparkles,
    features: ["Collectible Cups", "Caps & Hats", "Bypass Main Queues"]
  },
  {
    id: "lost-found",
    name: "Lost & Found",
    type: "Fan Services",
    size: "small",
    dotClass: "bg-cyan-400",
    pingClass: "bg-cyan-300",
    textColor: "text-cyan-300",
    borderColor: "border-cyan-400/10",
    borderHoverColor: "border-cyan-400/30",
    bgColor: "bg-slate-900/40",
    glowClass: "",
    badgeBg: "bg-cyan-400/10",
    accentColor: "cyan",
    position: "top-[46%] left-[6%]",
    details: "Fan services desk located in the main lobby. Deals with lost belongings, lost children assistance, and complimentary earplug distribution.",
    query: "Where is Lost and Found?",
    icon: Info,
    features: ["Lost Items Log", "Child Safety Tags", "Earplug Dispenser"]
  },
  {
    id: "bike-racks",
    name: "Bike Racks Area",
    type: "Eco Transit Parking",
    size: "small",
    dotClass: "bg-emerald-400",
    pingClass: "bg-emerald-300",
    textColor: "text-emerald-300",
    borderColor: "border-emerald-400/10",
    borderHoverColor: "border-emerald-400/30",
    bgColor: "bg-slate-900/40",
    glowClass: "",
    badgeBg: "bg-emerald-400/10",
    accentColor: "emerald",
    position: "top-[6%] left-[64%]",
    details: "Secure bicycle locking railings located directly outside Gate B opposite the Metro Transit steps.",
    query: "Where is the Bike Racks Area?",
    icon: Compass,
    features: ["Complimentary Lock", "24/7 Security Patrol", "Metro Exit Proximity"]
  },
  {
    id: "taxi-zone",
    name: "Taxi Dropoff Zone",
    type: "Ride Share Hub",
    size: "small",
    dotClass: "bg-sky-400",
    pingClass: "bg-sky-300",
    textColor: "text-sky-300",
    borderColor: "border-sky-400/10",
    borderHoverColor: "border-sky-400/30",
    bgColor: "bg-slate-900/40",
    glowClass: "",
    badgeBg: "bg-sky-400/10",
    accentColor: "sky",
    position: "top-[8%] left-[26%]",
    details: "Direct drop-off and pickup lane for taxis and rideshares, featuring safe pedestrian crossings to Gate A.",
    query: "Where is the Taxi Dropoff Zone?",
    icon: MapPin,
    features: ["Rideshare Lanes", "Safe Crosswalk", "Pre-match Dropoff"]
  },
  {
    id: "atm-west",
    name: "ATM Terminal West",
    type: "Cash Dispenser",
    size: "small",
    dotClass: "bg-amber-400",
    pingClass: "bg-amber-300",
    textColor: "text-amber-300",
    borderColor: "border-amber-400/10",
    borderHoverColor: "border-amber-400/30",
    bgColor: "bg-slate-900/40",
    glowClass: "",
    badgeBg: "bg-amber-400/10",
    accentColor: "amber",
    position: "top-[86%] left-[40%]",
    details: "Stand-alone multi-bank ATM cash terminal near the Gate D concourse corridor. Accepts all national bank cards.",
    query: "Where is the ATM?",
    icon: Info,
    features: ["Low-fee Cash", "All National Cards", "Receipt Printer"]
  },
  {
    id: "hydration-station",
    name: "Water Hydration Station",
    type: "Free Refills",
    size: "small",
    dotClass: "bg-blue-400",
    pingClass: "bg-blue-300",
    textColor: "text-blue-300",
    borderColor: "border-blue-400/10",
    borderHoverColor: "border-blue-400/30",
    bgColor: "bg-slate-900/40",
    glowClass: "",
    badgeBg: "bg-blue-400/10",
    accentColor: "blue",
    position: "top-[54%] left-[28%]",
    details: "Eco-friendly sensor-activated water station providing free chilled filtered water. Located right next to Section 110 Restrooms.",
    query: "Where can I refill my water bottle?",
    icon: Activity,
    features: ["Filtered Water", "Bottle Counter", "Chilled & Clean"]
  }
];

const SUGGESTED_QUESTIONS = [
  { text: "Where is Gate A?", icon: MapPin, label: "Find Gate A" },
  { text: "How do I reach Section 204?", icon: Info, label: "Directions to Section 204" },
  { text: "Where is the nearest restroom?", icon: RefreshCw, label: "Find Nearest Restroom" },
  { text: "Find wheelchair accessible entrance.", icon: Accessibility, label: "Accessible Entrances" },
  { text: "Where can I buy vegetarian food?", icon: Utensils, label: "Vegetarian Food Options" }
];

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Welcome to Stadium Assist AI! 🏟️ Our official Arena Bot is fully grounded in the live stadium directory (stadium.json). Tap any interactive location on the map to display verified details with its matching color, or query Gate A, Section 104, Gate C, or Section 204 below!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  
  // Tabs Navigation State
  const [activeTab, setActiveTab] = useState<"home" | "chat" | "dashboard" | "faq">("home");

  // Filter & Search state for Dashboard
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "gates" | "food" | "restrooms" | "others">("all");

  // FAQ Accordion State
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Highlighted / selected location state
  const [activeLocationId, setActiveLocationId] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [activeZone, setActiveZone] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Switch active tab to Chat automatically so the user can see queries & grounded answers instantly
    setActiveTab("chat");

    setApiError(null);
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Contextually update highlighted map zones and selected location based on query
    const lowerText = textToSend.toLowerCase();
    
    // Generic auto-select mapping from 21 locations
    const matchedLoc = MARKED_LOCATIONS.find(loc => 
      lowerText.includes(loc.name.toLowerCase()) || 
      loc.features.some(f => lowerText.includes(f.toLowerCase())) ||
      lowerText.includes(loc.id.toLowerCase())
    );

    if (matchedLoc) {
      setActiveLocationId(matchedLoc.id);
      setActiveZone(`${matchedLoc.name} (${matchedLoc.type})`);
      setIsSidebarOpen(true);
    } else {
      // General fallbacks if specific keyword matches
      if (lowerText.includes("gate a") || lowerText.includes("parking")) {
        setActiveLocationId("gate-a");
        setActiveZone("Gate A (Parking P1)");
        setIsSidebarOpen(true);
      } else if (lowerText.includes("gate c") || lowerText.includes("medical") || lowerText.includes("aid")) {
        setActiveLocationId("gate-c");
        setActiveZone("Gate C (Medical First Aid)");
        setIsSidebarOpen(true);
      } else if (lowerText.includes("gate d") || lowerText.includes("wheelchair")) {
        setActiveLocationId("gate-d");
        setActiveZone("Gate D (Wheelchair Access)");
        setIsSidebarOpen(true);
      } else if (lowerText.includes("204")) {
        setActiveLocationId("sec-204");
        setActiveZone("Section 204 (Upper Level)");
        setIsSidebarOpen(true);
      } else if (lowerText.includes("104") || lowerText.includes("vegetarian") || lowerText.includes("food") || lowerText.includes("grill")) {
        setActiveLocationId("sec-104");
        setActiveZone("Section 104 (Food Hub)");
        setIsSidebarOpen(true);
      } else if (lowerText.includes("restroom") || lowerText.includes("toilet")) {
        setActiveLocationId("sec-110-restrooms");
        setActiveZone("Section 110 Restrooms");
        setIsSidebarOpen(true);
      }
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend }),
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
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err: any) {
      console.error("Failed to send message:", err);
      setApiError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text: "Welcome to Stadium Assist AI! 🏟️ Our official Arena Bot is fully grounded in the live stadium directory (stadium.json). Tap any interactive location on the map to display verified details with its matching color, or query Gate A, Section 104, Gate C, or Section 204 below!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setApiError(null);
    setActiveLocationId("");
    setIsSidebarOpen(false);
    setActiveZone(null);
  };

  // Select location from list or map
  const selectLocation = (loc: MarkedLocation) => {
    setActiveLocationId(loc.id);
    setActiveZone(loc.name + " (" + loc.type + ")");
    setIsSidebarOpen(true);
  };

  // Select location and immediately query it in the chat
  const queryLocation = (loc: MarkedLocation) => {
    selectLocation(loc);
    handleSendMessage(loc.query);
  };

  // Parse chat messages to render matching colored badges for marked locations
  const formatChatMessage = (text: string) => {
    const regex = /(Gate A|Section 104|Gate C|Section 204|Gate B|Gate D|Main Stage|Section 110 Restrooms|Section 220 Restrooms|Section 208 Halal Eats|Section 112 Arena Bites|Elevator 3|Lost & Found|Water Hydration Station|Green Garden Grill)/g;
    const parts = text.split(regex);
    if (parts.length === 1) return <span>{text}</span>;

    return (
      <span>
        {parts.map((part, index) => {
          const matching = MARKED_LOCATIONS.find(l => l.name === part);
          if (matching) {
            return (
              <span 
                key={index} 
                onClick={() => {
                  selectLocation(matching);
                  setActiveTab("home");
                }}
                className={`inline-flex items-center gap-1 cursor-pointer hover:underline ${matching.badgeBg} ${matching.textColor} border ${matching.borderColor} px-2 py-0.5 rounded-lg font-mono text-xs font-bold mx-1`}
              >
                <matching.icon className="w-3.5 h-3.5" /> {matching.name}
              </span>
            );
          }
          if (part === "Green Garden Grill") {
            return (
              <span key={index} className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded-lg font-mono text-xs font-bold mx-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Green Garden Grill
              </span>
            );
          }
          return part;
        })}
      </span>
    );
  };

  const selectedLoc = MARKED_LOCATIONS.find(l => l.id === activeLocationId);

  // Filter Dashboard list
  const filteredLocations = MARKED_LOCATIONS.filter((loc) => {
    const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          loc.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          loc.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          loc.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeCategory === "all") return true;
    if (activeCategory === "gates") return loc.type.toLowerCase().includes("gate") || loc.type.toLowerCase().includes("transit");
    if (activeCategory === "food") return loc.type.toLowerCase().includes("food") || loc.type.toLowerCase().includes("halal") || loc.type.toLowerCase().includes("snack") || loc.type.toLowerCase().includes("bites");
    if (activeCategory === "restrooms") return loc.type.toLowerCase().includes("restroom") || loc.type.toLowerCase().includes("toilet");
    if (activeCategory === "others") {
      const isGate = loc.type.toLowerCase().includes("gate") || loc.type.toLowerCase().includes("transit");
      const isFood = loc.type.toLowerCase().includes("food") || loc.type.toLowerCase().includes("halal") || loc.type.toLowerCase().includes("snack") || loc.type.toLowerCase().includes("bites");
      const isRestroom = loc.type.toLowerCase().includes("restroom") || loc.type.toLowerCase().includes("toilet");
      return !isGate && !isFood && !isRestroom;
    }
    return true;
  });

  const faqs = [
    {
      q: "When do the stadium gates open?",
      a: "All general admittance gates (Gate A, Gate B, Gate C, and Gate D) open exactly 2 hours prior to the scheduled event kickoff. We highly recommend arriving early to navigate security queues smoothly.",
      query: "Where is Gate A?"
    },
    {
      q: "Where is the designated wheelchair accessible entrance?",
      a: "Gate D is our official designated priority wheelchair-accessible entry point, situated on the West Concourse. It features wide ramps, friendly assistance hosts, and nearby lifts (Elevator 1 near Gate A and Elevator 3 near Gate C).",
      query: "Find wheelchair accessible entrance."
    },
    {
      q: "Where can I purchase vegetarian or gluten-free food?",
      a: "The Green Garden Grill, situated at Section 104 (Lower Concourse), is our main designated healthy-bites food hub. They serve premium 100% vegetarian burgers, salads, and safe gluten-free plant-based alternatives.",
      query: "Where can I buy vegetarian food?"
    },
    {
      q: "Is there a first aid medical station on site?",
      a: "Yes! Our central medical station is located right at Gate C (North Plaza) and is staffed with certified EMTs. A secondary upper-level first aid station is located near Section 215 for rapid response.",
      query: "Where is the medical station?"
    },
    {
      q: "Where is the certified Halal vendor located?",
      a: "Halal Eats is located at Section 208 on the Upper Deck. They serve a certified delicious menu featuring premium chicken shawarma wraps, Mediterranean falafel pockets, and fresh hummus wraps.",
      query: "Find halal food options."
    },
    {
      q: "Where can I refill my water bottle for free?",
      a: "We have an eco-friendly, sensor-activated Water Hydration Station that provides free chilled, filtered water. It is conveniently situated right next to the Section 110 Family Restrooms on the concourse.",
      query: "Where can I refill my water bottle?"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col antialiased">
      {/* Accessible Skip Link */}
      <a href="#tab-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-indigo-600 focus:text-white">
        Skip to main content
      </a>

      {/* Premium Bento Header with Navigation Tabs */}
      <header className="py-5 px-6 md:px-8 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Layers className="h-5.5 w-5.5 text-white" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2 font-display">
                STADIUM ASSIST <span className="text-indigo-400 font-mono text-xs border border-indigo-500/30 px-2 py-0.5 rounded ml-1">AI</span>
              </h1>
              <p className="text-[9px] text-slate-400 uppercase tracking-widest font-mono">100% Grounded Navigation & Arena Support</p>
            </div>
          </div>
          
          {/* Main 4 Navigation Tabs */}
          <nav className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-2xl" aria-label="Main Navigation">
            <button
              onClick={() => setActiveTab("home")}
              className={`flex items-center gap-1.5 md:gap-2 px-3.5 md:px-5 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "home"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                  : "text-slate-400 hover:text-white hover:bg-slate-850"
              }`}
              id="tab-home"
              aria-selected={activeTab === "home"}
              role="tab"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex items-center gap-1.5 md:gap-2 px-3.5 md:px-5 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "chat"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                  : "text-slate-400 hover:text-white hover:bg-slate-850"
              }`}
              id="tab-chat"
              aria-selected={activeTab === "chat"}
              role="tab"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>AI Chat</span>
            </button>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-1.5 md:gap-2 px-3.5 md:px-5 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "dashboard"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                  : "text-slate-400 hover:text-white hover:bg-slate-850"
              }`}
              id="tab-dashboard"
              aria-selected={activeTab === "dashboard"}
              role="tab"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab("faq")}
              className={`flex items-center gap-1.5 md:gap-2 px-3.5 md:px-5 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "faq"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                  : "text-slate-400 hover:text-white hover:bg-slate-850"
              }`}
              id="tab-faq"
              aria-selected={activeTab === "faq"}
              role="tab"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>FAQ</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Tab Content Area */}
      <main id="tab-content" className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: HOME (MAP & QUICK ACCESS DIRECTORY) */}
          {activeTab === "home" && (
            <motion.div
              key="home-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Informative Callout Banner */}
              <div className="bg-indigo-950/20 border border-indigo-500/15 rounded-3xl p-4 md:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h2 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-400" /> Interactive Seating & Landmark Map
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">Pulsing pins represent verified locations in the grounded stadium.json directory. Hover to preview, click to inspect features.</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2.5 py-1 rounded-xl border border-indigo-500/20 font-mono font-semibold">21 Active Hotspots</span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-xl border border-emerald-500/20 font-mono font-semibold">Live Interactive Sync</span>
                </div>
              </div>

              {/* Interactive map split card */}
              <section className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden p-1.5 flex flex-col" aria-label="Interactive Seating Map">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 min-h-[420px]">
                  
                  {/* Map canvas */}
                  <div className={`${isSidebarOpen ? "lg:col-span-7" : "lg:col-span-12"} bg-slate-950 rounded-2xl relative flex items-center justify-center overflow-hidden p-4 min-h-[380px] md:min-h-[440px] transition-all duration-300`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.07)_0%,_transparent_75%)]"></div>
                    
                    {/* Stadium Ring Visual Representation */}
                    <div className="relative w-80 h-48 border-4 border-slate-900 rounded-full flex items-center justify-center opacity-40">
                      <div className="w-56 h-32 border-2 border-slate-800 rounded-full flex items-center justify-center">
                        <div className="w-24 h-12 border border-dashed border-slate-700 rounded-full bg-slate-950/80"></div>
                      </div>
                    </div>

                    {/* Coordinates overlay with hover triggers */}
                    {MARKED_LOCATIONS.map((loc) => {
                      const isActive = activeLocationId === loc.id;
                      
                      let sizeClasses = "w-4 h-4";
                      let pingClasses = "w-4 h-4";
                      let innerCircleClasses = "w-1.5 h-1.5";
                      if (loc.size === "big") {
                        sizeClasses = "w-7 h-7";
                        pingClasses = "w-7 h-7";
                        innerCircleClasses = "w-2.5 h-2.5";
                      } else if (loc.size === "medium") {
                        sizeClasses = "w-5 h-5";
                        pingClasses = "w-5 h-5";
                        innerCircleClasses = "w-1.5 h-1.5";
                      } else {
                        sizeClasses = "w-3 h-3";
                        pingClasses = "w-3 h-3";
                        innerCircleClasses = "w-1 h-1";
                      }

                      return (
                        <div key={loc.id} className="absolute inset-0 pointer-events-none">
                          <div className={`absolute ${loc.position} -translate-x-1/2 -translate-y-1/2 group pointer-events-auto z-20`}>
                            <button 
                              onClick={() => selectLocation(loc)}
                              className={`relative ${sizeClasses} rounded-full ${loc.dotClass} flex items-center justify-center transition-transform duration-250 active:scale-95 focus:outline-none ${isActive ? "scale-125 ring-4 ring-white/35 " + loc.glowClass : "hover:scale-120 opacity-90 cursor-pointer"}`}
                              title={`${loc.name} - View location info`}
                            >
                              <span className={`absolute inline-flex h-full w-full rounded-full ${loc.pingClass} opacity-50 animate-ping ${isActive ? "duration-700" : "duration-1000"}`}></span>
                              <span className={`${innerCircleClasses} rounded-full bg-white`}></span>
                            </button>

                            {/* HOVER DETAILS */}
                            <div 
                              className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 bg-slate-900/95 border border-slate-750 p-2 rounded-xl backdrop-blur-md flex items-center gap-2 text-[10px] font-bold font-mono text-slate-200 select-none pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-[0_4px_20px_rgba(0,0,0,0.8)] whitespace-nowrap z-50 border-t-2"
                              style={{ borderColor: `var(--color-${loc.accentColor}-500)` }}
                            >
                              <span className={`w-2 h-2 rounded-full ${loc.dotClass}`}></span>
                              <span className={loc.textColor}>{loc.name}</span>
                              <span className="text-[8px] text-slate-600 font-normal">|</span>
                              <span className="text-slate-400 font-normal">{loc.type}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Legend */}
                    <div className="absolute bottom-4 left-4 bg-slate-900/90 border border-slate-850 p-2.5 rounded-xl backdrop-blur-md flex items-center gap-3.5 text-[9px] font-mono text-slate-400 select-none pointer-events-none">
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> Main Hub</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-pink-500"></span> Medium Concourse</span>
                      <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Small Spot</span>
                    </div>
                  </div>

                  {/* Highlight inspector sidecard */}
                  {isSidebarOpen && selectedLoc && (
                    <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl p-5 border border-slate-850 flex flex-col justify-between relative shadow-xl">
                      <button 
                        onClick={() => setIsSidebarOpen(false)}
                        className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer z-10"
                        aria-label="Close details panel"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <div>
                        <div className="flex items-center justify-between mb-3 pr-6">
                          <span className={`text-[9px] font-bold font-mono tracking-wider uppercase px-2 py-0.5 rounded-md ${selectedLoc.badgeBg} ${selectedLoc.textColor} border ${selectedLoc.borderColor}`}>
                            {selectedLoc.type}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">Selected Landmark</span>
                        </div>

                        <div className="flex items-center gap-2.5 mb-3">
                          <div className={`w-9 h-9 rounded-xl ${selectedLoc.badgeBg} ${selectedLoc.textColor} flex items-center justify-center border ${selectedLoc.borderColor}`}>
                            <selectedLoc.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white tracking-tight">
                              {selectedLoc.name}
                            </h3>
                            <p className="text-[10px] text-slate-500 font-mono">Arena Grounded Reference</p>
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed mb-4">
                          {selectedLoc.details}
                        </p>

                        <div className="space-y-1.5">
                          <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold font-mono">Key Features</p>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedLoc.features.map((feat, i) => (
                              <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-slate-300">
                                • {feat}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800/60">
                        <button
                          onClick={() => queryLocation(selectedLoc)}
                          className={`w-full inline-flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold tracking-wide transition-all duration-200 active:scale-97 cursor-pointer text-white ${selectedLoc.borderColor} ${selectedLoc.bgColor} hover:bg-slate-950`}
                        >
                          <span className="flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                            Ask AI Guide about {selectedLoc.name}
                          </span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              </section>

              {/* Lower split content: food & gate directories */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Food vendor list */}
                <section className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between" aria-label="Grounded Food Vendors">
                   <div>
                     <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
                          <Utensils className="w-3.5 h-3.5 text-emerald-400" /> Grounded Food Directory
                        </h3>
                        <span className="text-[9px] font-bold text-emerald-400 font-mono tracking-widest uppercase">Verified</span>
                     </div>
                     
                     <div className="space-y-2.5">
                        <button
                          onClick={() => {
                            const loc = MARKED_LOCATIONS.find(l => l.id === "sec-104");
                            if (loc) selectLocation(loc);
                          }}
                          className={`w-full flex items-center justify-between p-2.5 bg-slate-950/40 hover:bg-slate-950 border ${activeLocationId === "sec-104" ? "border-emerald-500/40 bg-emerald-950/5" : "border-slate-800/80"} hover:border-emerald-500/40 rounded-xl transition-all text-left cursor-pointer`}
                        >
                           <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold text-xs">V</div>
                              <div>
                                <p className="text-xs font-bold text-slate-200">Vegetarian Hub (Sec 104)</p>
                                <p className="text-[9px] text-slate-500 font-mono">Green Garden Grill</p>
                              </div>
                           </div>
                           <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">SEC 104</span>
                        </button>

                        <button
                          onClick={() => handleSendMessage("Do you have gluten free food?")}
                          className="w-full flex items-center justify-between p-2.5 bg-slate-950/40 hover:bg-slate-950 border border-slate-800/80 hover:border-emerald-500/20 rounded-xl transition-all text-left cursor-pointer"
                        >
                           <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold text-xs">GF</div>
                              <div>
                                <p className="text-xs font-bold text-slate-200">Gluten-Free Grill</p>
                                <p className="text-[9px] text-slate-500 font-mono">Green Garden Grill</p>
                              </div>
                           </div>
                           <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">SEC 104</span>
                        </button>

                        <button
                          onClick={() => handleSendMessage("Find halal food options.")}
                          className="w-full flex items-center justify-between p-2.5 bg-slate-950/40 hover:bg-slate-950 border border-slate-800/80 hover:border-emerald-500/20 rounded-xl transition-all text-left cursor-pointer"
                        >
                           <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 font-bold text-xs">H</div>
                              <div>
                                <p className="text-xs font-bold text-slate-200">Halal Eats (Sec 208)</p>
                                <p className="text-[9px] text-slate-500 font-mono">Plaza Level</p>
                              </div>
                           </div>
                           <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">SEC 208</span>
                        </button>
                     </div>
                   </div>
                   <p className="text-[9px] text-slate-600 font-mono mt-3 leading-tight">All food vendor lists match our verified offline manifest.</p>
                </section>

                {/* Gate directory list */}
                <section className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between" aria-label="Gate Directory">
                   <div>
                     <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-indigo-400" /> Gate Directory
                        </h3>
                        <span className="text-[9px] font-bold text-indigo-400 font-mono tracking-widest">Active</span>
                     </div>

                     <div className="space-y-2 text-xs font-mono">
                        <button 
                          onClick={() => {
                            const loc = MARKED_LOCATIONS.find(l => l.id === "gate-a");
                            if (loc) selectLocation(loc);
                          }}
                          className={`w-full flex justify-between items-center p-2.5 rounded-xl bg-slate-950/30 hover:bg-slate-950 border ${activeLocationId === "gate-a" ? "border-indigo-500/40 bg-indigo-950/5" : "border-slate-800/50"} hover:border-indigo-500/20 text-left transition-all cursor-pointer`}
                        >
                           <span className="font-bold text-slate-200 flex items-center gap-2">
                             <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Gate A
                           </span>
                           <span className="text-[10px] text-slate-400 font-mono">Near Parking P1</span>
                        </button>
                        
                        <button 
                          onClick={() => {
                            const loc = MARKED_LOCATIONS.find(l => l.id === "gate-b");
                            if (loc) selectLocation(loc);
                          }}
                          className={`w-full flex justify-between items-center p-2.5 rounded-xl bg-slate-950/30 hover:bg-slate-950 border ${activeLocationId === "gate-b" ? "border-blue-500/40 bg-blue-950/5" : "border-slate-800/50"} hover:border-indigo-500/20 text-left transition-all cursor-pointer`}
                        >
                           <span className="font-bold text-slate-200 flex items-center gap-2">
                             <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Gate B
                           </span>
                           <span className="text-[10px] text-slate-400 font-mono">Near Metro Exit</span>
                        </button>

                        <button 
                          onClick={() => {
                            const loc = MARKED_LOCATIONS.find(l => l.id === "gate-c");
                            if (loc) selectLocation(loc);
                          }}
                          className={`w-full flex justify-between items-center p-2.5 rounded-xl bg-slate-950/30 hover:bg-slate-950 border ${activeLocationId === "gate-c" ? "border-red-500/40 bg-red-950/5" : "border-slate-800/50"} hover:border-red-500/20 text-left transition-all cursor-pointer`}
                        >
                           <span className="font-bold text-slate-200 flex items-center gap-2">
                             <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Gate C
                           </span>
                           <span className="text-[10px] text-slate-400 font-mono">Near North Plaza</span>
                        </button>

                        <button 
                          onClick={() => {
                            const loc = MARKED_LOCATIONS.find(l => l.id === "gate-d");
                            if (loc) selectLocation(loc);
                          }}
                          className={`w-full flex justify-between items-center p-2.5 rounded-xl bg-slate-950/30 hover:bg-slate-950 border ${activeLocationId === "gate-d" ? "border-sky-500/40 bg-sky-950/5" : "border-slate-800/50"} hover:border-indigo-500/20 text-left transition-all cursor-pointer`}
                        >
                           <span className="font-bold text-slate-200 flex items-center gap-2">
                             <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span> Gate D
                           </span>
                           <span className="text-[10px] text-slate-400 font-mono">West Concourse</span>
                        </button>
                     </div>
                   </div>
                   <p className="text-[9px] text-slate-600 font-mono mt-3 leading-tight">Gates open 2 hours prior to scheduled kickoff times.</p>
                </section>

              </div>
            </motion.div>
          )}

          {/* TAB 2: AI CHAT (CHATBOT VIEW) */}
          {activeTab === "chat" && (
            <motion.div
              key="chat-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Chat interface box */}
              <section className="lg:col-span-8 flex flex-col bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl h-[600px] lg:h-[680px]" aria-label="Interactive AI Assistant">
                {/* Chat window header */}
                <div className="p-4 border-b border-slate-850 bg-slate-900/40 flex justify-between items-center shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-sm tracking-tight text-white">Arena Guide Bot</h2>
                      <p className="text-[9px] text-slate-500 font-mono uppercase">Grounded in verified directory</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold font-mono px-2 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-md text-indigo-400 uppercase tracking-widest">Grounded Answers</span>
                </div>
                
                {/* Speech scroll area */}
                <div 
                  className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-950/40"
                  role="log"
                  aria-live="polite"
                  aria-relevant="additions"
                >
                  <AnimatePresence initial={false}>
                    {messages.map((msg) => {
                      const isUser = msg.sender === "user";
                      return (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                        >
                          <div 
                            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                              isUser 
                                ? "bg-indigo-600 text-white" 
                                : "bg-slate-800 text-slate-300 border border-slate-700"
                            }`}
                            aria-hidden="true"
                          >
                            {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                          </div>

                          <div className={`flex flex-col max-w-[85%] ${isUser ? "items-end" : "items-start"}`}>
                            <div className="flex items-center gap-1.5 mb-1 text-[10px] text-slate-500 font-mono">
                              <span>{isUser ? "You" : "Arena Bot"}</span>
                              <span>•</span>
                              <span>{msg.timestamp}</span>
                            </div>
                            <div 
                              className={`p-3.5 rounded-2xl text-xs md:text-sm leading-relaxed border ${
                                isUser 
                                  ? "bg-indigo-600 border-indigo-500 text-white rounded-tr-none shadow-indigo-500/5" 
                                  : "bg-slate-900 border-slate-800 text-slate-200 rounded-tl-none"
                              }`}
                            >
                              {formatChatMessage(msg.text)}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>

                  {/* Typing animation */}
                  {isLoading && (
                    <div className="flex items-start gap-3 flex-row">
                      <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center shadow-sm" aria-hidden="true">
                        <Bot className="w-4 h-4 animate-spin text-indigo-400" />
                      </div>
                      <div className="flex flex-col items-start max-w-[80%]">
                        <span className="text-[10px] text-slate-500 font-mono mb-1">Searching Grounded JSON...</span>
                        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce delay-75"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce delay-150"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce delay-225"></span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Local chat error */}
                {apiError && (
                  <div className="bg-red-950/40 border-y border-red-900/60 py-3 px-4 flex items-center gap-3 text-xs text-red-300" role="alert">
                    <AlertCircle className="w-4.5 h-4.5 shrink-0 text-red-500" aria-hidden="true" />
                    <div className="flex-1 font-mono">{apiError}</div>
                    <button 
                      onClick={() => setApiError(null)}
                      className="text-[10px] uppercase tracking-wider font-bold text-red-400 hover:text-red-300 border border-red-500/20 rounded px-1.5 py-0.5 bg-red-950/20 focus:outline-none"
                    >
                      Dismiss
                    </button>
                  </div>
                )}

                {/* Prompt bar */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage(inputValue);
                  }}
                  className="p-4 bg-slate-900/80 border-t border-slate-850 shrink-0"
                >
                  <div className="flex items-center bg-slate-950 border border-slate-800 focus-within:border-indigo-500 rounded-xl p-1.5 transition-all">
                    <input
                      ref={chatInputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask about gates, food, restrooms, or ATMs..."
                      className="bg-transparent border-none text-xs md:text-sm flex-grow px-3 text-slate-200 placeholder:text-slate-600 outline-none w-full"
                      disabled={isLoading}
                      aria-label="Message assistant input"
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !inputValue.trim()}
                      className="w-9 h-9 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-900 disabled:text-slate-700 rounded-lg flex items-center justify-center transition-colors shrink-0 text-white cursor-pointer"
                      aria-label="Send message"
                    >
                      <Send className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </form>
              </section>

              {/* Chat sidebar info & controls */}
              <section className="lg:col-span-4 flex flex-col gap-5">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-4 flex items-center gap-1.5">
                      <Bot className="w-4 h-4 text-indigo-400" /> Chat Controls
                    </h3>
                    <p className="text-xs text-slate-300 mb-5 leading-relaxed font-sans">
                      Our official Arena Bot is 100% grounded in the live stadium directory (stadium.json). Reset the conversation anytime to start a fresh dialogue.
                    </p>
                    <button
                      onClick={handleClearChat}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-red-400 bg-red-500/5 hover:bg-red-500/10 border border-red-500/25 hover:border-red-500/40 transition-all cursor-pointer shadow-sm"
                      aria-label="Clear chat"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                      Reset Conversation
                    </button>
                  </div>

                  <div className="mt-8 pt-5 border-t border-slate-850">
                    <h4 className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mb-3">Popular Grounded Shortcuts</h4>
                    <div className="flex flex-col gap-2">
                      {SUGGESTED_QUESTIONS.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSendMessage(suggestion.text)}
                          className="text-left w-full p-2.5 rounded-xl border border-slate-800/80 hover:border-indigo-500 bg-slate-950/30 hover:bg-indigo-950/10 text-slate-300 text-xs transition-all cursor-pointer font-medium flex items-center gap-2"
                        >
                          <suggestion.icon className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          <span className="truncate">{suggestion.text}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* TAB 3: DASHBOARD (STATISTICS & LOCATION DIRECTORY) */}
          {activeTab === "dashboard" && (
            <motion.div
              key="dashboard-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Quick stats cards */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" aria-label="Essential Hotspots">
                
                {/* Designated Access Card */}
                <button
                  onClick={() => {
                    const loc = MARKED_LOCATIONS.find(l => l.id === "gate-d");
                    if (loc) {
                      selectLocation(loc);
                      setActiveTab("home");
                    }
                  }}
                  className="text-left bg-indigo-950/20 hover:bg-indigo-950/30 border border-indigo-500/20 rounded-2xl p-4 flex items-center justify-between group transition-all active:scale-98 cursor-pointer"
                >
                  <div>
                    <p className="text-[10px] text-indigo-400 font-mono font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Accessibility className="w-3.5 h-3.5" /> Designated Access
                    </p>
                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">Gate D</h3>
                    <p className="text-[10px] text-slate-400 mt-1 font-mono">Wheelchair ramp & elevators</p>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-all text-indigo-400">
                    <Accessibility className="h-5 w-5" />
                  </div>
                </button>

                {/* Medical First Aid Card */}
                <button
                  onClick={() => {
                    const loc = MARKED_LOCATIONS.find(l => l.id === "gate-c");
                    if (loc) {
                      selectLocation(loc);
                      setActiveTab("home");
                    }
                  }}
                  className="text-left bg-red-950/15 hover:bg-red-950/25 border border-red-500/20 rounded-2xl p-4 flex items-center justify-between group transition-all active:scale-98 cursor-pointer"
                >
                  <div>
                    <p className="text-[10px] text-red-400 font-mono font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5" /> First Aid Stations
                    </p>
                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-red-300 transition-colors">Gate C & Sec 215</h3>
                    <p className="text-[10px] text-slate-400 mt-1 font-mono">Emergency EMT medical stations</p>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-all text-red-400">
                    <Activity className="h-5 w-5" />
                  </div>
                </button>

                {/* Total Locations Card */}
                <div className="text-left bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-indigo-400" /> Grounded Database
                    </p>
                    <h3 className="text-lg font-bold text-slate-100">21 Coordinates</h3>
                    <p className="text-[10px] text-slate-400 mt-1 font-mono">100% matched offline layout</p>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  </div>
                </div>

              </section>

              {/* Interactive Database Filter and Directory List */}
              <section className="bg-slate-900 border border-slate-800 rounded-3xl p-5 md:p-6 space-y-6" aria-label="Arena Database Inspector">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">Arena Location Directory</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Filter, search, or pin any of the 21 verified offline points onto the map.</p>
                  </div>

                  {/* Search input */}
                  <div className="relative w-full md:w-80">
                    <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search landmarks or features..."
                      className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 text-xs md:text-sm rounded-xl py-2 pl-10 pr-4 text-slate-200 placeholder:text-slate-600 outline-none transition-all"
                      aria-label="Search stadium directory"
                    />
                  </div>
                </div>

                {/* Category filter pills */}
                <div className="flex flex-wrap gap-2 border-b border-slate-800/80 pb-4">
                  <button
                    onClick={() => setActiveCategory("all")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      activeCategory === "all" ? "bg-indigo-600 text-white" : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    All Locations
                  </button>
                  <button
                    onClick={() => setActiveCategory("gates")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      activeCategory === "gates" ? "bg-indigo-600 text-white" : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    Gates & Transit
                  </button>
                  <button
                    onClick={() => setActiveCategory("food")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      activeCategory === "food" ? "bg-indigo-600 text-white" : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    Food Vendors
                  </button>
                  <button
                    onClick={() => setActiveCategory("restrooms")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      activeCategory === "restrooms" ? "bg-indigo-600 text-white" : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    Restrooms
                  </button>
                  <button
                    onClick={() => setActiveCategory("others")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      activeCategory === "others" ? "bg-indigo-600 text-white" : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    Services & Spots
                  </button>
                </div>

                {/* Grid list of filtered coordinates */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredLocations.map((loc) => (
                    <div 
                      key={loc.id}
                      className={`p-4 rounded-2xl bg-slate-950 border border-slate-850 hover:border-slate-800 transition-all flex flex-col justify-between border-l-4`}
                      style={{ borderLeftColor: loc.id === activeLocationId ? "var(--color-indigo-500)" : "transparent" }}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-[9px] font-bold font-mono px-2 py-0.5 rounded ${loc.badgeBg} ${loc.textColor} border ${loc.borderColor}`}>
                            {loc.type}
                          </span>
                          <span className="text-[9px] font-mono text-slate-600 uppercase font-semibold">{loc.size} hotspot</span>
                        </div>

                        <h4 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5 mb-1.5">
                          <loc.icon className="w-4 h-4 text-slate-400" />
                          {loc.name}
                        </h4>

                        <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                          {loc.details}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {loc.features.map((feat, i) => (
                            <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                              {feat}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-3 border-t border-slate-900">
                        <button
                          onClick={() => {
                            selectLocation(loc);
                            setActiveTab("home");
                          }}
                          className="flex-1 text-center py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 text-[10px] font-bold transition-all cursor-pointer"
                        >
                          Pin on Map
                        </button>
                        <button
                          onClick={() => {
                            queryLocation(loc);
                          }}
                          className="flex-1 text-center py-1.5 rounded-lg bg-indigo-600/10 hover:bg-indigo-600 border border-indigo-500/20 hover:border-indigo-500 text-indigo-400 hover:text-white text-[10px] font-bold transition-all cursor-pointer"
                        >
                          Ask AI Bot
                        </button>
                      </div>
                    </div>
                  ))}

                  {filteredLocations.length === 0 && (
                    <div className="col-span-full py-12 text-center text-slate-500">
                      <p className="text-sm font-mono">No matching verified locations found.</p>
                      <button
                        onClick={() => {
                          setSearchQuery("");
                          setActiveCategory("all");
                        }}
                        className="text-xs text-indigo-400 mt-2 hover:underline focus:outline-none"
                      >
                        Reset filters
                      </button>
                    </div>
                  )}
                </div>
              </section>
            </motion.div>
          )}

          {/* TAB 4: FAQ (GROUNDED FAQ CENTER) */}
          {activeTab === "faq" && (
            <motion.div
              key="faq-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              {/* FAQ intro */}
              <div className="text-center space-y-2 py-3">
                <h2 className="text-xl font-extrabold tracking-tight text-white font-display">Grounded Arena FAQ Center</h2>
                <p className="text-xs text-slate-400 max-w-lg mx-auto">Get verified offline answers directly from our stadium schema, or click to query our interactive AI Guide chatbot.</p>
              </div>

              {/* Accordion stack */}
              <section className="space-y-3" aria-label="Expandable Frequently Asked Questions">
                {faqs.map((faq, idx) => {
                  const isExpanded = expandedFaq === idx;
                  return (
                    <div 
                      key={idx}
                      className="bg-slate-900 border border-slate-800 hover:border-slate-750 rounded-2xl overflow-hidden transition-all"
                    >
                      {/* Accordion trigger */}
                      <button
                        onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                        className="w-full text-left p-4 md:p-5 flex items-center justify-between gap-4 font-sans font-bold text-xs md:text-sm text-slate-200 hover:text-white focus:outline-none cursor-pointer"
                        aria-expanded={isExpanded}
                      >
                        <span className="flex items-center gap-2.5">
                          <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                          <span>{faq.q}</span>
                        </span>
                        <span className="text-indigo-400 font-mono text-xs">
                          {isExpanded ? "[Collapse]" : "[Expand]"}
                        </span>
                      </button>

                      {/* Accordion content */}
                      {isExpanded && (
                        <div className="p-4 md:p-5 pt-0 bg-slate-950/40 border-t border-slate-850">
                          <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans mb-4">
                            {faq.a}
                          </p>
                          <div className="flex justify-end">
                            <button
                              onClick={() => handleSendMessage(faq.query)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all cursor-pointer"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              Ask Guide for Directions
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </section>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Bento Footer */}
      <footer className="mt-8 py-6 px-6 md:px-8 border-t border-slate-900 bg-slate-950/60 text-[10px] text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-4 md:gap-6 uppercase tracking-wider font-mono">
            <span>Version 1.0.6-stable</span>
            <span>Data: Stadium.json (Grounded)</span>
            <span className="text-indigo-400 font-bold">Terms of Use</span>
          </div>
          <p className="font-mono">© {new Date().getFullYear()} Stadium Assist AI Systems. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
