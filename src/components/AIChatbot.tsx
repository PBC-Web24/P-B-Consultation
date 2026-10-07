import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  X,
  Send,
  Globe,
  MapPin,
  Sparkles,
  Zap,
  ExternalLink,
  Bot,
  User,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface AIChatbotProps {
  onContactClick: (subject?: string) => void;
}

type AssistantTab = "chat" | "search" | "maps";
type ChatSpeedMode = "standard" | "fast";

interface WebSource {
  title: string;
  uri: string;
}

interface MapPlace {
  title: string;
  uri: string;
  reviewSnippets: string[];
}

interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  tab: AssistantTab;
  modelBadge?: string;
  sources?: WebSource[];
  places?: MapPlace[];
}

const OFFICE_LAT = 27.724837987974247;
const OFFICE_LNG = 85.29680444588946;
const OFFICE_GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${OFFICE_LAT},${OFFICE_LNG}`;

function getClientSmartReply(query: string, tab: AssistantTab, isNe: boolean): {
  text: string;
  sources?: WebSource[];
  places?: MapPlace[];
} {
  const q = query.toLowerCase();
  const useNepali = isNe || /[\u0900-\u097F]/.test(query);

  if (tab === "maps" || q.includes("office") || q.includes("location") || q.includes("where") || q.includes("banasthali") || q.includes("कार्यालय") || q.includes("कहाँ")) {
    return {
      text: useNepali
        ? `हाम्रो मुख्य कार्यालय P.B. Consultation Pvt. Ltd. काठमाडौं-१६, वनस्थली (Coordinates: ${OFFICE_LAT}, ${OFFICE_LNG}) मा रहेको छ।\n• कार्यालय समय: आइतबार – शुक्रबार (१०:०० बिहान – ६:०० बेलुका)\n• फोन: +977 9841083084\n• इमेल: info.pbconsultation@gmail.com`
        : `Our main office at P.B. Consultation Pvt. Ltd. is located in Kathmandu-16, Banasthali, Nepal (Coordinates: ${OFFICE_LAT}, ${OFFICE_LNG}).\n• Office Hours: Sunday – Friday, 10:00 AM – 6:00 PM\n• Phone: +977 9841083084\n• Email: info.pbconsultation@gmail.com`,
      places: [
        {
          title: "P.B. Consultation Pvt. Ltd. (Main Office - Banasthali, Kathmandu)",
          uri: OFFICE_GOOGLE_MAPS_URL,
          reviewSnippets: [],
        },
      ],
    };
  }

  if (q.includes("package") || q.includes("standard") || q.includes("premium") || q.includes("फरक") || q.includes("प्याकेज")) {
    return {
      text: useNepali
        ? `हामीसँग घर निर्माणका २ वटा मुख्य विकल्पहरू छन्:\n1. सामान्य पारिवारिक घर (Standard Home): नेपाल गुणस्तर (NS) प्रमाणित सामग्री, २D/३D नक्सा, वास्तु मिलावट, टायल/ग्रेनाइट र नियमित इन्जिनियर रेखदेख सहित सुलभ बजेटमा बलियो घर।\n2. प्रिमियम आधुनिक घर (Premium Home): विशेष ३D बाहिरी/भित्री डिजाइन, मार्बल वा पार्केटिङ, सिजनिङ काठका ढोका, पूर्ण वाटरप्रुफिङ र ३ वर्षको लिखित वारेन्टी।`
        : `We offer two flexible home building options:\n1. Standard Family Home: Safe, comfortable, budget-friendly family home built with Nepal Standard (NS) materials, 2D/3D designs, Vastu planning, and regular site supervision.\n2. Premium Modern Home: Upgraded residence with custom 3D interior & exterior design, marble/parquet flooring, seasoned hardwood doors, full waterproofing, and a 3-Year written warranty.`,
    };
  }

  if (q.includes("vastu") || q.includes("वास्तु") || q.includes("aana") || q.includes("आना")) {
    return {
      text: useNepali
        ? `वास्तु शास्त्र अनुसार घर बनाउँदा मुख्य प्रवेशद्वार र पूजा कोठा पूर्व वा उत्तर-पूर्व (ईशान कोण), भान्सा दक्षिण-पूर्व (आग्नेय कोण) र मुख्य सुत्ने कोठा दक्षिण-पश्चिममा राख्नु उत्तम मानिन्छ। हामी तपाईंको जग्गाको नाप अनुसार वास्तु र नगरपालिकाको मापदण्ड मिल्ने गरी २D/३D नक्सा डिजाइन गर्छौं।`
        : `For a Vastu-friendly layout: the main entrance and Puja room work best in the East or North-East, the kitchen in the South-East, and the master bedroom in the South-West. Our engineers design custom 2D/3D floor plans tailored to your plot size and Vastu guidelines.`,
    };
  }

  if (q.includes("ebps") || q.includes("e-bps") || q.includes("permit") || q.includes("नक्सा पास") || q.includes("कागजात")) {
    return {
      text: useNepali
        ? `नगरपालिकामा अनलाइन नक्सा पास (e-BPS) गर्न लालपुर्जाको प्रतिलिपि, चालु वर्षको मालपोत रसिद, नागरिकता, नापी नक्सा (Blueprint/Trace) र इन्जिनियरिङ ड्रइङ चाहिन्छ। P.B. Consultation ले काठमाडौं उपत्यकाभित्र यो सम्पूर्ण प्रक्रिया सहजै गरिदिन्छ।`
        : `For e-BPS municipal permit approval, you need your Lalpurja copy, latest Malpot tax receipt, citizenship copy, Cadastral (Napi) map, and signed architectural/structural drawings. P.B. Consultation handles the entire e-BPS process across Kathmandu Valley.`,
    };
  }

  return {
    text: useNepali
      ? `P.B. Consultation Pvt. Ltd. (र ३०+ वर्षको निर्माण अनुभव बोकेको प्रकाश निर्माण सेवा) मा स्वागत छ! हामी भूकम्प प्रतिरोधी घर निर्माण, २D/३D नक्सा, वास्तु परामर्श र e-BPS नक्सा पास सेवा प्रदान गर्छौं। थप सल्लाहको लागि 9841083084 मा फोन गर्नुहोस् वा तलको परामर्श फारम भर्नुहोस्।`
      : `Welcome to P.B. Consultation Pvt. Ltd. (partnered with Prakash Nirman Sewa — 30+ years experience). We provide turnkey home construction, 2D/3D design, Vastu consultation, and e-BPS municipal approvals. Call us at 9841083084 or click "Book Free Consultation" below!`,
    sources:
      tab === "search"
        ? [{ title: "DUDBC Nepal Building Code (NBC-105)", uri: "https://www.dudbc.gov.np" }]
        : undefined,
  };
}

export default function AIChatbot({ onContactClick }: AIChatbotProps) {
  const { language } = useLanguage();
  const isNe = language === "ne";

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<AssistantTab>("chat");
  const [speedMode, setSpeedMode] = useState<ChatSpeedMode>("standard");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      role: "model",
      tab: "chat",
      text: isNe
        ? "नमस्ते! म P.B. Consultation Pvt. Ltd. को AI सहायक हुँ। तपाईंलाई घर निर्माण, वास्तु शास्त्र, नक्सा पास (e-BPS), वा हाम्रो मुख्य कार्यालयको स्थान (वनस्थली, काठमाडौं) बारे के जानकारी चाहिन्छ? तल सोध्नुहोस्!"
        : "Namaste! I am the P.B. Consultation Pvt. Ltd. AI Assistant. Ask me about home construction, Vastu planning, e-BPS permits, or our Main Office location in Banasthali, Kathmandu.",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, loading]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = (customPrompt ?? input).trim();
    if (!textToSend || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: textToSend,
      tab: activeTab,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setInput("");
    setLoading(true);

    try {
      if (activeTab === "chat") {
        const historyPayload = messages
          .filter((m) => m.tab === "chat" && m.id !== "welcome-1")
          .map((m) => ({
            role: m.role,
            text: m.text,
          }));

        const res = await fetch("/api/gemini/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: textToSend,
            history: historyPayload,
            mode: speedMode,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Unable to reach AI chat service.");
        }

        setMessages((prev) => [
          ...prev,
          {
            id: `model-${Date.now()}`,
            role: "model",
            tab: "chat",
            text: data.text,
            modelBadge:
              speedMode === "fast" ? "Flash Lite (Fast)" : "Gemini Flash",
          },
        ]);
      } else if (activeTab === "search") {
        const res = await fetch("/api/gemini/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: textToSend }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Unable to complete Google Search.");
        }

        setMessages((prev) => [
          ...prev,
          {
            id: `model-${Date.now()}`,
            role: "model",
            tab: "search",
            text: data.text,
            modelBadge: "Google Search Grounded",
            sources: data.sources || [],
          },
        ]);
      } else if (activeTab === "maps") {
        const res = await fetch("/api/gemini/maps", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: textToSend,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Unable to complete Google Maps lookup.");
        }

        setMessages((prev) => [
          ...prev,
          {
            id: `model-${Date.now()}`,
            role: "model",
            tab: "maps",
            text: data.text,
            modelBadge: "P.B. Consultation Office Map",
            places: data.places || [],
          },
        ]);
      }
    } catch {
      const fallback = getClientSmartReply(textToSend, activeTab, isNe);
      setMessages((prev) => [
        ...prev,
        {
          id: `fallback-${Date.now()}`,
          role: "model",
          tab: activeTab,
          text: fallback.text,
          modelBadge:
            activeTab === "maps"
              ? "P.B. Consultation Office Map"
              : "P.B. Smart Assistant",
          sources: fallback.sources,
          places: fallback.places,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts: Record<AssistantTab, string[]> = {
    chat: isNe
      ? [
          "सामान्य पारिवारिक घर र प्रिमियम घरमा के फरक छ?",
          "४ आना जग्गामा वास्तु अनुसार घर कसरी बनाउने?",
          "नगरपालिकामा नक्सा पास (e-BPS) गर्न के-के कागजात चाहिन्छ?",
        ]
      : [
          "What is the difference between Standard and Premium Home packages?",
          "How do you plan a Vastu-friendly house on a 4 Aana plot?",
          "What documents are needed for e-BPS municipality approval?",
        ],
    search: isNe
      ? [
          "नेपालमा भूकम्प प्रतिरोधी घर निर्माण मापदण्ड (NBC-105) के छ?",
          "मनसुनमा घरको छत र भित्तामा पानी चुहिन नदिन के गर्ने?",
        ]
      : [
          "Latest NBC-105 earthquake building code guidelines in Nepal",
          "Best waterproofing methods for residential roofs in Kathmandu monsoon",
        ],
    maps: isNe
      ? [
          "P.B. Consultation Pvt. Ltd. को मुख्य कार्यालय कहाँ पर्छ?",
          "तपाईंको वनस्थली कार्यालयमा भेट्ने समय कति बजेदेखि हो?",
        ]
      : [
          "Where is P.B. Consultation Pvt. Ltd. main office located?",
          "What are the office hours to visit P.B. Consultation Pvt. Ltd.?",
        ],
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          id="ai-assistant-launcher"
          className="fixed bottom-6 right-6 z-40 bg-[#121214] hover:bg-neutral-900 text-white border-2 border-brand-gold/60 rounded-full px-5 py-3.5 shadow-2xl flex items-center gap-3 transition-all duration-300 hover:scale-105 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-brand-pink flex items-center justify-center text-white shadow">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div className="text-left pr-1">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-brand-gold font-bold">
              {isNe ? "तुरुन्तै सोध्नुहोस्" : "AI ASSISTANT"}
            </span>
            <span className="block text-xs font-display font-bold text-white">
              {isNe ? "घर निर्माण सहायक" : "Ask P.B. Assistant"}
            </span>
          </div>
        </button>
      )}

      {/* Expandable Chat & Grounding Window */}
      {isOpen && (
        <div
          id="ai-assistant-panel"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[430px] max-h-[85vh] bg-[#121214] text-white border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-brand-gold/15 border border-brand-gold/40 flex items-center justify-center text-brand-gold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-display font-bold text-white leading-tight">
                  {isNe ? "P.B. निर्माण तथा इन्जिनियरिङ सहायक" : "P.B. Smart Construction Assistant"}
                </h3>
                <span className="text-[10px] font-mono text-brand-gold block">
                  {isNe
                    ? "P.B. Consultation Pvt. Ltd."
                    : "P.B. Consultation Pvt. Ltd."}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close AI Assistant"
              className="text-neutral-400 hover:text-white p-1.5 rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Mode Selector Tabs (Chat / Google Search / Our Office Map) */}
          <div className="grid grid-cols-3 bg-neutral-900 p-1.5 gap-1 border-b border-neutral-800">
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                activeTab === "chat"
                  ? "bg-brand-pink text-white shadow"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isNe ? "एआई च्याट" : "AI Chat"}</span>
            </button>
            <button
              onClick={() => setActiveTab("search")}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                activeTab === "search"
                  ? "bg-brand-pink text-white shadow"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{isNe ? "गुगल सर्च" : "Web Search"}</span>
            </button>
            <button
              onClick={() => setActiveTab("maps")}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                activeTab === "maps"
                  ? "bg-brand-pink text-white shadow"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{isNe ? "हाम्रो कार्यालय" : "Office Map"}</span>
            </button>
          </div>

          {/* Sub-bar for Chat Speed or Fixed Main Office Location Card */}
          <div className="px-4 py-2 bg-neutral-950/60 border-b border-neutral-800/80 flex items-center justify-between text-[11px]">
            {activeTab === "chat" && (
              <>
                <span className="text-neutral-400">
                  {isNe ? "प्रतिक्रिया मोड:" : "Response Mode:"}
                </span>
                <div className="flex items-center gap-1 bg-neutral-900 p-0.5 rounded-md border border-neutral-800">
                  <button
                    onClick={() => setSpeedMode("standard")}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                      speedMode === "standard"
                        ? "bg-brand-gold text-neutral-950 font-bold"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    Standard
                  </button>
                  <button
                    onClick={() => setSpeedMode("fast")}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1 transition-colors cursor-pointer ${
                      speedMode === "fast"
                        ? "bg-brand-gold text-neutral-950 font-bold"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <Zap className="w-2.5 h-2.5" />
                    Fast Lite
                  </button>
                </div>
              </>
            )}

            {activeTab === "search" && (
              <span className="text-neutral-400 flex items-center gap-1.5">
                <Globe className="w-3 h-3 text-brand-gold" />
                {isNe
                  ? "ताजा जानकारीका लागि Google Search सँग जोडिएको"
                  : "Grounded with live Google Search data"}
              </span>
            )}

            {activeTab === "maps" && (
              <div className="flex items-center justify-between w-full">
                <span className="text-neutral-300 font-medium flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                  <span>P.B. Consultation Pvt. Ltd. (Banasthali)</span>
                </span>
                <a
                  href={OFFICE_GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-gold font-bold hover:underline flex items-center gap-1 shrink-0"
                >
                  <span>{isNe ? "नक्सा खोल्नुहोस्" : "Open Map"}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>

          {/* Dedicated P.B. Consultation Pvt. Ltd. Main Office Map Pin when in Maps Tab */}
          {activeTab === "maps" && (
            <div className="p-3 bg-neutral-900 border-b border-neutral-800 space-y-2">
              <div className="rounded-lg overflow-hidden border border-neutral-800 h-36 relative bg-neutral-950">
                <iframe
                  title="P.B. Consultation Pvt. Ltd. Main Office Location"
                  src={`https://maps.google.com/maps?q=${OFFICE_LAT},${OFFICE_LNG}&hl=en&z=17&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="flex items-center justify-between text-[11px] px-1">
                <div>
                  <span className="font-bold text-white block">
                    P.B. Consultation Pvt. Ltd.
                  </span>
                  <span className="text-neutral-400 text-[10px]">
                    {isNe
                      ? "मुख्य कार्यालय: काठमाडौं-१६, वनस्थली (27.7248, 85.2968)"
                      : "Main Office: Kathmandu-16, Banasthali (27.7248, 85.2968)"}
                  </span>
                </div>
                <a
                  href={OFFICE_GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-gold text-neutral-950 font-bold text-[10px] px-2.5 py-1.5 rounded flex items-center gap-1 hover:bg-white transition-colors shrink-0"
                >
                  <MapPin className="w-3 h-3" />
                  <span>{isNe ? "Google Maps" : "Directions"}</span>
                </a>
              </div>
            </div>
          )}

          {/* Scrollable Conversation Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[220px] max-h-[320px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    msg.role === "user"
                      ? "bg-brand-pink text-white"
                      : "bg-neutral-800 border border-neutral-700 text-brand-gold"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="w-3.5 h-3.5" />
                  ) : (
                    <Bot className="w-3.5 h-3.5" />
                  )}
                </div>

                <div
                  className={`max-w-[82%] rounded-xl p-3 text-xs leading-relaxed space-y-2 ${
                    msg.role === "user"
                      ? "bg-brand-pink text-white"
                      : "bg-neutral-900 border border-neutral-800 text-neutral-200"
                  }`}
                >
                  {msg.modelBadge && (
                    <span className="inline-block text-[9px] font-mono uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded">
                      {msg.modelBadge}
                    </span>
                  )}

                  <div className="whitespace-pre-wrap">{msg.text}</div>

                  {/* Google Search Grounding Sources */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="pt-2 mt-2 border-t border-neutral-800 space-y-1.5">
                      <span className="block text-[10px] font-mono text-brand-gold uppercase">
                        {isNe ? "स्रोतहरू (Google Search):" : "Verified Web Sources:"}
                      </span>
                      <div className="flex flex-col gap-1">
                        {msg.sources.map((src, idx) => (
                          <a
                            key={idx}
                            href={src.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[11px] text-brand-gold hover:underline break-all"
                          >
                            <ExternalLink className="w-3 h-3 shrink-0" />
                            <span className="truncate">{src.title}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Google Maps Grounding - Strictly P.B. Consultation Pvt. Ltd. Main Office */}
                  {msg.places && msg.places.length > 0 && (
                    <div className="pt-2 mt-2 border-t border-neutral-800 space-y-2">
                      <span className="block text-[10px] font-mono text-brand-gold uppercase">
                        {isNe ? "आधिकारिक कार्यालय स्थान:" : "Official Office Location:"}
                      </span>
                      <div className="space-y-2">
                        {msg.places.map((pl, idx) => (
                          <div
                            key={idx}
                            className="p-2 rounded bg-neutral-950 border border-neutral-800 space-y-1"
                          >
                            <a
                              href={pl.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-brand-gold hover:underline"
                            >
                              <MapPin className="w-3.5 h-3.5 shrink-0" />
                              <span>{pl.title}</span>
                              <ExternalLink className="w-3 h-3 shrink-0" />
                            </a>
                            {pl.reviewSnippets && pl.reviewSnippets.length > 0 && (
                              <div className="space-y-1 pl-4 border-l border-neutral-800">
                                {pl.reviewSnippets.slice(0, 2).map((snip, sIdx) => (
                                  <p
                                    key={sIdx}
                                    className="text-[10px] text-neutral-400 italic"
                                  >
                                    "{snip}"
                                  </p>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-neutral-400 pl-2">
                <div className="w-4 h-4 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
                <span>
                  {isNe ? "जानकारी तयार गर्दैछ..." : "Consulting P.B. knowledge base..."}
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          <div className="px-4 py-2 bg-neutral-950/90 border-t border-neutral-800/80 overflow-x-auto flex gap-2 no-scrollbar">
            {quickPrompts[activeTab].map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                disabled={loading}
                className="shrink-0 text-[10px] bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 rounded-full px-3 py-1 transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-neutral-950 border-t border-neutral-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                activeTab === "chat"
                  ? isNe
                    ? "घर निर्माण वा वास्तुबारे प्रश्न सोध्नुहोस्..."
                    : "Ask about house design, packages, Vastu..."
                  : activeTab === "search"
                    ? isNe
                      ? "निर्माण मापदण्ड वा जानकारी खोज्नुहोस्..."
                      : "Search Nepal building codes or construction info..."
                    : isNe
                      ? "हाम्रो मुख्य कार्यालयको स्थानबारे सोध्नुहोस्..."
                      : "Ask about P.B. Consultation Pvt. Ltd. office location..."
              }
              className="flex-1 bg-neutral-900 border border-neutral-800 focus:border-brand-gold focus:outline-none px-3.5 py-2.5 text-xs rounded-lg text-white"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="bg-brand-pink hover:bg-brand-pink/90 disabled:opacity-50 text-white p-2.5 rounded-lg transition-colors cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Direct Consultation CTA Footer */}
          <div className="px-4 py-2 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between text-[11px]">
            <span className="text-neutral-400">
              {isNe ? "इन्जिनियरसँग सिधै कुरा गर्ने?" : "Want to talk to our engineers?"}
            </span>
            <button
              onClick={() => {
                setIsOpen(false);
                onContactClick("AI Assistant Inquiry");
              }}
              className="text-brand-gold font-bold hover:underline cursor-pointer"
            >
              {isNe ? "निःशुल्क परामर्श फारम →" : "Book Free Consultation →"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
