export interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

export type TabId = "home" | "chat" | "dashboard" | "faq" | "ai-insights";

export interface MarkedLocation {
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

export interface FaqItem {
  q: string;
  a: string;
  query: string;
}
