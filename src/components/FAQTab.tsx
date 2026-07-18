import { useTranslation } from "react-i18next";
import { HelpCircle, Sparkles } from "lucide-react";
import type { FaqItem } from "../types";

interface FAQTabProps {
  faqs: FaqItem[];
  expandedFaq: number | null;
  onToggleFaq: (index: number) => void;
  onAskFaq: (query: string) => void;
}

export function FAQTab({ faqs, expandedFaq, onToggleFaq, onAskFaq }: FAQTabProps) {
  const { t } = useTranslation();
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2 py-3">
        <h2 className="text-xl font-extrabold tracking-tight text-white font-display">{t("faqCenter")}</h2>
        <p className="text-xs text-slate-400 max-w-lg mx-auto">{t("faqDescription")}</p>
      </div>

      <section className="space-y-3" aria-label="Expandable Frequently Asked Questions">
        {faqs.map((faq, index) => {
          const isExpanded = expandedFaq === index;
          return (
            <div key={`${faq.q}-${index}`} className="bg-slate-900 border border-slate-800 hover:border-slate-750 rounded-2xl overflow-hidden transition-all">
              <button onClick={() => onToggleFaq(index)} className="w-full text-left p-4 md:p-5 flex items-center justify-between gap-4 font-sans font-bold text-xs md:text-sm text-slate-200 hover:text-white focus:outline-none cursor-pointer" aria-expanded={isExpanded}>
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>{faq.q}</span>
                </span>
                <span className="text-indigo-400 font-mono text-xs">{isExpanded ? t("collapse") : t("expand")}</span>
              </button>

              {isExpanded && (
                <div className="p-4 md:p-5 pt-0 bg-slate-950/40 border-t border-slate-850">
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans mb-4">{faq.a}</p>
                  <div className="flex justify-end">
                    <button onClick={() => onAskFaq(faq.query)} className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all cursor-pointer">
                      <Sparkles className="w-3 h-3" />
                      {t("askGuideDirections")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}
