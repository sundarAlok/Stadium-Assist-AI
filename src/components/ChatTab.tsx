import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, Bot, Send, Trash2, User } from "lucide-react";
import type { Message, MarkedLocation, TabId } from "../types";
import { SUGGESTED_QUESTIONS } from "../data/questions";
import { LANGUAGES, type LanguageCode } from "../languages";
import type { RefObject, ReactElement } from "react";

interface ChatTabProps {
  messages: Message[];
  inputValue: string;
  isLoading: boolean;
  apiError: string | null;
  language: LanguageCode;
  onLanguageChange: (value: LanguageCode) => void;
  onInputChange: (value: string) => void;
  onSendMessage: (text: string) => void;
  onClearChat: () => void;
  onSelectLocation: (location: MarkedLocation) => void;
  onSetActiveTab: (tab: TabId) => void;
  formatChatMessage: (text: string) => ReactElement;
  messagesEndRef: RefObject<HTMLDivElement | null>;
  chatInputRef: RefObject<HTMLInputElement | null>;
}

export function ChatTab({
  messages,
  inputValue,
  isLoading,
  apiError,
  language,
  onLanguageChange,
  onInputChange,
  onSendMessage,
  onClearChat,
  onSelectLocation,
  onSetActiveTab,
  formatChatMessage,
  messagesEndRef,
  chatInputRef,
}: ChatTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <section className="lg:col-span-8 flex flex-col bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl h-[600px] lg:h-[680px]" aria-label="Interactive AI Assistant">
        <div className="p-4 border-b border-slate-850 bg-slate-900/40 flex flex-col gap-3 md:flex-row justify-between md:items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-linear-to-tr from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-semibold text-sm tracking-tight text-white">Arena Guide Bot</h2>
              <p className="text-[9px] text-slate-500 font-mono uppercase">Grounded in verified directory</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold font-mono px-2 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-md text-indigo-400 uppercase tracking-widest">Grounded Answers</span>
            <div className="flex flex-wrap gap-1 rounded-lg border border-slate-800 bg-slate-950 p-1">
              {LANGUAGES.map((option) => (
                <button key={option.code} onClick={() => onLanguageChange(option.code)} className={`rounded-md px-2 py-1 text-[10px] font-semibold transition-all ${language === option.code ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}>
                  {option.flag} {option.code}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-950/40" role="log" aria-live="polite" aria-relevant="additions">
          <AnimatePresence initial={false}>
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${isUser ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-300 border border-slate-700"}`} aria-hidden="true">
                    {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div className={`flex flex-col max-w-[85%] ${isUser ? "items-end" : "items-start"}`}>
                    <div className="flex items-center gap-1 mb-1 text-[10px] text-slate-500 font-mono">
                      <span>{isUser ? "You" : "Arena Bot"}</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>
                    <div className={`p-3 rounded-2xl text-xs md:text-sm leading-relaxed border ${isUser ? "bg-indigo-600 border-indigo-500 text-white rounded-tr-none shadow-indigo-500/5" : "bg-slate-900 border-slate-800 text-slate-200 rounded-tl-none"}`}>
                      {formatChatMessage(msg.text)}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {isLoading && (
            <div className="flex items-start gap-3 flex-row">
              <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center shadow-sm" aria-hidden="true">
                <Bot className="w-4 h-4 animate-spin text-indigo-400" />
              </div>
              <div className="flex flex-col items-start max-w-[80%]">
                <span className="text-[10px] text-slate-500 font-mono mb-1">Searching Grounded JSON...</span>
                <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-indigo-500 animate-bounce delay-75"></span>
                  <span className="w-1 h-1 rounded-full bg-indigo-500 animate-bounce delay-150"></span>
                  <span className="w-1 h-1 rounded-full bg-indigo-500 animate-bounce delay-225"></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {apiError && (
          <div className="bg-red-950/40 border-y border-red-900/60 py-3 px-4 flex items-center gap-3 text-xs text-red-300" role="alert">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" aria-hidden="true" />
            <div className="flex-1 font-mono">{apiError}</div>
            <button onClick={() => {}} className="text-[10px] uppercase tracking-wider font-bold text-red-400 hover:text-red-300 border border-red-500/20 rounded px-1 py-0 bg-red-950/20 focus:outline-none">
              Dismiss
            </button>
          </div>
        )}

        <form onSubmit={(event) => { event.preventDefault(); onSendMessage(inputValue); }} className="p-4 bg-slate-900/80 border-t border-slate-850 shrink-0">
          <div className="flex items-center bg-slate-950 border border-slate-800 focus-within:border-indigo-500 rounded-xl p-1 transition-all">
            <input ref={chatInputRef} type="text" value={inputValue} onChange={(event) => onInputChange(event.target.value)} placeholder="Ask about gates, food, restrooms, or ATMs..." className="bg-transparent border-none text-xs md:text-sm grow px-3 text-slate-200 placeholder:text-slate-600 outline-none w-full" disabled={isLoading} aria-label="Message assistant input" />
            <button type="submit" disabled={isLoading || !inputValue.trim()} className="w-9 h-9 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-900 disabled:text-slate-700 rounded-lg flex items-center justify-center transition-colors shrink-0 text-white cursor-pointer" aria-label="Send message">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </section>

      <section className="lg:col-span-4 flex flex-col gap-5">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between h-full">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-4 flex items-center gap-1">
              <Bot className="w-4 h-4 text-indigo-400" /> Chat Controls
            </h3>
            <p className="text-xs text-slate-300 mb-5 leading-relaxed font-sans">Our official Arena Bot is 100% grounded in the live stadium directory. Reset the conversation anytime to start a fresh dialogue.</p>
            <button onClick={onClearChat} className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-red-400 bg-red-500/5 hover:bg-red-500/10 border border-red-500/25 hover:border-red-500/40 transition-all cursor-pointer shadow-sm" aria-label="Clear chat">
              <Trash2 className="w-4 h-4 text-red-400" />
              Reset Conversation
            </button>
          </div>

          <div className="mt-8 pt-5 border-t border-slate-850">
            <h4 className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mb-3">Popular Grounded Shortcuts</h4>
            <div className="flex flex-col gap-2">
              {SUGGESTED_QUESTIONS.map((suggestion, index) => {
                const Icon = suggestion.icon;
                return (
                  <button key={`${suggestion.text}-${index}`} onClick={() => onSendMessage(suggestion.text)} className="text-left w-full p-2 rounded-xl border border-slate-800/80 hover:border-indigo-500 bg-slate-950/30 hover:bg-indigo-950/10 text-slate-300 text-xs transition-all cursor-pointer font-medium flex items-center gap-2">
                    <Icon className="w-3 h-3 text-indigo-400 shrink-0" />
                    <span className="truncate">{suggestion.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
