import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Sparkles, MessageCircle, RefreshCw, AlertCircle } from 'lucide-react';
import { GopuramIcon } from './LandingPage';

interface AIAssistantProps {
  theme?: 'light' | 'dark';
  lang?: 'en' | 'ta';
  context?: string;
}

interface ChatMessage {
  sender: 'user' | 'assistant';
  text: string;
  time: string;
}

export default function AIAssistant({ theme = 'light', lang = 'en', context }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = {
    en: {
      agentName: 'JanVaani AI Assistant',
      agentSub: 'Madurai Civic Advisor',
      placeholder: 'Ask about MP initiatives, water pipelines, flyovers...',
      greeting: "Vanakkam! I am your JanVaani AI Civic Assistant. You can ask me about MP S. Venkatesan's public performance, active development budgets (like Mullaiperiyar or Goripalayam), or how to file local grievances. What can I help you check today?",
      send: 'Send',
      error: 'Communication glitch. Let me try compiling that again.',
      suggestedHeader: 'Suggested Queries',
      suggest1: 'Tell me about S. Venkatesan MP',
      suggest2: 'Status of Goripalayam Flyover',
      suggest3: 'Mullaiperiyar Water Scheme status',
      suggest4: 'How do I submit a complaint?'
    },
    ta: {
      agentName: 'ஜனவாணி AI உதவியாளர்',
      agentSub: 'மதுரை சிவில் ஆலோசகர்',
      placeholder: 'எம்பி திட்டங்கள், குடிநீர் குழாய், மேம்பாலங்கள் பற்றி கேட்க...',
      greeting: "வணக்கம்! நான் உங்கள் ஜனவாணி AI உதவியாளர். எம்பி சு. வெங்கடேசனின் பணிகள், முல்லைப்பெரியாறு குடிநீர் திட்டம், கோரிப்பாளையம் மேம்பாலம் நிதி ஒதுக்கீடு, அல்லது புகாரை எவ்வாறு பதிவு செய்வது போன்ற விவரங்களைக் கேட்கலாம். இன்று நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?",
      send: 'அனுப்பு',
      error: 'இணைப்புச் சிக்கல் ஏற்பட்டுள்ளது. மீண்டும் முயற்சிக்கவும்.',
      suggestedHeader: 'பரிந்துரைக்கப்பட்ட கேள்விகள்',
      suggest1: 'எம்பி சு. வெங்கடேசன் பற்றி கூறுங்கள்',
      suggest2: 'கோரிப்பாளையம் மேம்பாலம் தற்போதைய நிலை',
      suggest3: 'முல்லைப்பெரியாறு குடிநீர் திட்டம் எப்போது முடியும்?',
      suggest4: 'புகாரை எவ்வாறு பதிவு செய்வது?'
    }
  }[lang];

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          sender: 'assistant',
          text: t.greeting,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [lang]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;
    const userMsg: ChatMessage = {
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend, context })
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMsg: ChatMessage = {
          sender: 'assistant',
          text: data.reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, assistantMsg]);
      } else {
        throw new Error('Failed to fetch reply');
      }
    } catch (err) {
      const errorMsg: ChatMessage = {
        sender: 'assistant',
        text: t.error,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (query: string) => {
    handleSend(query);
  };

  return (
    <div id="ai-chatbot-root" className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-[#0E5C4B] hover:bg-[#0E5C4B]/95 text-[#C89B3C] shadow-2xl flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-[#C89B3C]/50 relative group"
        >
          <GopuramIcon className="h-6 w-6 text-[#C89B3C] animate-subtle-pulse" />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-600 border-2 border-white animate-ping" />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-600 border-2 border-white" />
          
          {/* Tooltip */}
          <span className="absolute right-16 bg-stone-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md border border-stone-800">
            💬 {t.agentName}
          </span>
        </button>
      )}

      {/* Floating Chat Panel */}
      {isOpen && (
        <div className={`w-[90vw] max-w-[380px] h-[500px] rounded-2xl border ${theme === 'dark' ? 'bg-stone-900 border-stone-800 shadow-stone-950/50' : 'bg-white/95 border-stone-200/80 shadow-2xl'} backdrop-blur-md flex flex-col overflow-hidden animate-slide-in`}>
          
          {/* Chat Header */}
          <div className="bg-[#0E5C4B] text-white px-4 py-3 flex justify-between items-center border-b border-[#C89B3C]/30 shrink-0">
            <div className="flex items-center gap-2.5 text-left">
              <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center border border-[#C89B3C]/20">
                <GopuramIcon className="h-5 w-5 text-[#C89B3C]" />
              </div>
              <div>
                <h4 className="font-bold text-xs leading-none flex items-center gap-1">
                  {t.agentName} <Sparkles className="h-3 w-3 text-[#C89B3C]" />
                </h4>
                <span className="text-[10px] text-stone-200 font-mono mt-0.5 block">{t.agentSub}</span>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-200 hover:text-white p-1 hover:bg-white/10 rounded-lg transition-all cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Chat Messages Panel */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-stone-200 bg-stone-50/50 dark:bg-stone-950/20">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} text-left`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#6B1E24] text-white rounded-br-2xs shadow-3xs'
                      : 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100 rounded-bl-2xs shadow-3xs border border-stone-200/40 dark:border-stone-700/40'
                  }`}
                >
                  {msg.sender === 'assistant' ? (
                    <div className="whitespace-pre-wrap font-sans">
                      {msg.text}
                    </div>
                  ) : (
                    msg.text
                  )}
                </div>
                <span className="text-[8px] text-stone-400 font-mono mt-1 px-1">{msg.time}</span>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-1.5 text-stone-400 font-mono text-[10px] py-1">
                <RefreshCw className="h-3 w-3 animate-spin text-[#0E5C4B]" />
                <span>AI is formulating response...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Queries if history is short */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 border-t border-stone-100 dark:border-stone-850 shrink-0 bg-stone-50/30 text-left">
              <span className="text-[9px] font-bold uppercase text-stone-400 tracking-wider block mb-1">
                {t.suggestedHeader}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[t.suggest1, t.suggest2, t.suggest3, t.suggest4].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(item)}
                    className="text-[9px] font-bold text-stone-600 hover:text-[#0E5C4B] bg-white dark:bg-stone-800 border border-stone-200/60 dark:border-stone-700 px-2 py-1 rounded-md transition-all cursor-pointer hover:border-[#0E5C4B]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Input form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="p-3 border-t border-stone-200/60 dark:border-stone-800 shrink-0 bg-white dark:bg-stone-900 flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder}
              disabled={loading}
              className="flex-1 bg-stone-50 dark:bg-stone-950 text-stone-800 dark:text-stone-100 text-xs px-3 py-2.5 rounded-lg border border-stone-200 dark:border-stone-800 focus:outline-hidden focus:border-[#0E5C4B] transition-all"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-3 bg-[#0E5C4B] hover:bg-[#0E5C4B]/95 text-white rounded-lg flex items-center justify-center cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-[#C89B3C]/30"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
