import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OFFICE_LAT = 27.724837987974247;
const OFFICE_LNG = 85.29680444588946;
const OFFICE_MAPS_URI = `https://www.google.com/maps/search/?api=1&query=${OFFICE_LAT},${OFFICE_LNG}`;

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey.trim(),
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

const PB_SYSTEM_INSTRUCTION = `You are the official AI Engineering & Construction Consultant for P.B. Consultation Pvt. Ltd. (established 2080 B.S., Reg. No. 320851/080/081) and its sister construction execution division Prakash Nirman Sewa (30+ years of practical building experience in Nepal).
Head Office: Kathmandu-16, Banasthali, Nepal (Coordinates: ${OFFICE_LAT}, ${OFFICE_LNG}).
Regional Office: Ranipauwa Road, Pokhara-11, Kaski.
Direct Phone: +977 9841083084 | Official Email: info.pbconsultation@gmail.com

Your role:
- Help homeowners and property developers in Nepal with clear, friendly, plain-language advice on building homes, Vastu Shastra room orientation, Nepal Building Code (NBC-105) earthquake safety, e-BPS municipal drawing approvals, and our two flexible building options:
  1. Standard Family Home (सामान्य पारिवारिक घर): Safe, comfortable, budget-friendly family home built with Nepal Standard (NS) certified materials, 2D/3D designs, Vastu planning, and regular supervision.
  2. Premium Modern Home (प्रिमियम आधुनिक घर): Upgraded residence/bungalow with custom 3D interior & exterior design, marble/parquet flooring, seasoned hardwood doors, full waterproofing, senior engineer supervision, and a 3-Year written structural warranty.
- Respond in the language the user writes in (English or Nepali). Keep answers concise, warm, practical, and easy for everyday homeowners to understand.`;

function isNepaliQuery(q: string): boolean {
  return /[\u0900-\u097F]/.test(q) || /\b(kasto|kasari|kati|kaha|ghar|naksa|vastu|jagga|aana|kathmandu|banasthali)\b/i.test(q);
}

function generateSmartFallbackReply(query: string, tab: "chat" | "search" | "maps"): string {
  const q = query.toLowerCase();
  const ne = isNepaliQuery(query);

  if (tab === "maps" || q.includes("office") || q.includes("location") || q.includes("where") || q.includes("address") || q.includes("banasthali") || q.includes("कार्यालय") || q.includes("कहाँ") || q.includes("ठेगाना")) {
    return ne
      ? `हाम्रो मुख्य कार्यालय **P.B. Consultation Pvt. Ltd.** काठमाडौं-१६, वनस्थली (Coordinates: ${OFFICE_LAT}, ${OFFICE_LNG}) मा रहेको छ।\n\n• **कार्यालय समय:** आइतबार – शुक्रबार (बिहान १०:०० देखि बेलुका ६:०० सम्म)\n• **सम्पर्क फोन:** +977 9841083084\n• **इमेल:** info.pbconsultation@gmail.com\n\nतपाईं माथिको Google Maps पिन वा तलको लिङ्कमा क्लिक गरेर सिधै हाम्रो मुख्य कार्यालयको लोकेसन हेर्न सक्नुहुन्छ।`
      : `Our main office at **P.B. Consultation Pvt. Ltd.** is located in **Kathmandu-16, Banasthali, Nepal** (Coordinates: ${OFFICE_LAT}, ${OFFICE_LNG}).\n\n• **Office Hours:** Sunday – Friday, 10:00 AM – 6:00 PM (NPT)\n• **Direct Phone:** +977 9841083084\n• **Email:** info.pbconsultation@gmail.com\n\nClick the Google Maps link below to open turn-by-turn directions directly to our Banasthali main office.`;
  }

  if (q.includes("package") || q.includes("standard") || q.includes("premium") || q.includes("cost") || q.includes("price") || q.includes("budget") || q.includes("प्याकेज") || q.includes("फरक") || q.includes("बजेट") || q.includes("लागत")) {
    return ne
      ? `हामीसँग घर निर्माणका २ वटा लचिला विकल्पहरू छन्:\n\n1. **सामान्य पारिवारिक घर (Standard Family Home):** नेपाल गुणस्तर (NS) प्रमाणित सामग्री, २D/३D नक्सा, वास्तु मिलावट, सफा टायल/ग्रेनाइट, काठका ढोका, UPVC झ्याल र नियमित इन्जिनियर रेखदेख सहित सुलभ बजेटमा बलियो घर।\n2. **प्रिमियम आधुनिक घर (Premium Modern Home):** विशेष ३D भित्री र बाहिरी डिजाइन, मार्बल वा काठको पार्केटिङ, सिजनिङ गरेको काठका ढोका, पूर्ण वाटरप्रुफिङ, सिनियर इन्जिनियर सुपरीवेक्षण र ३ वर्षको लिखित वारेन्टी।\n\nतपाईंको जग्गा र नक्सा हेरेर प्रत्यक्ष सल्लाह पछि स्पष्ट लागत तय गरिन्छ। निःशुल्क परामर्शको लागि **9841083084** मा फोन गर्नुहोस् वा तलको फारम भर्नुहोस्!`
      : `We offer two flexible, customer-friendly home building options:\n\n1. **Standard Family Home:** Built with trusted Nepal Standard (NS) materials, complete 2D/3D designs, Vastu planning, municipality permit support, neat floor tiles, wooden doors, UPVC windows, and weekly photo/video progress updates.\n2. **Premium Modern Home:** Designed for modern bungalows with custom 3D interior & exterior design, marble or wooden parquet flooring, seasoned hardwood doors, full waterproofing, dedicated senior engineer supervision, and a 3-Year written warranty.\n\nPricing is customized around your house design and budget during our free consultation. Call us at **9841083084** or book a consultation below!`;
  }

  if (q.includes("vastu") || q.includes("वास्तु") || q.includes("aana") || q.includes("आना")) {
    return ne
      ? `वास्तु शास्त्र अनुसार घर बनाउँदा मुख्य कुराहरू:\n• **प्रवेशद्वार र पूजा कोठा:** पूर्व वा उत्तर-पूर्व (ईशान कोण) तर्फ राख्दा शुभ र उज्यालो हुन्छ।\n• **भान्सा कोठा (Kitchen):** दक्षिण-पूर्व (आग्नेय कोण) मा उपयुक्त हुन्छ।\n• **मुख्य सुत्ने कोठा (Master Bedroom):** दक्षिण-पश्चिम (नैऋत्य कोण) मा राख्नु राम्रो मानिन्छ।\n\nहाम्रा आर्किटेक्ट र इन्जिनियरहरूले तपाईंको जग्गा (जस्तै ३, ४, ६ वा ८ आना) को मोहडा हेरेर वास्तु र नगरपालिकाको मापदण्ड दुवै मिल्ने गरी २D/३D नक्सा तयार गर्छन्।`
      : `For a Vastu-friendly home layout in Nepal:\n• **Main Entrance & Puja Space:** Best aligned toward the East or North-East (Ishan corner) for morning sunlight and positive energy.\n• **Kitchen:**Ideally placed in the South-East (Agneya corner).\n• **Master Bedroom:** Best situated in the South-West corner for stability.\n\nOur architectural team designs custom 2D & 3D floor plans that balance Vastu Shastra principles with natural light and municipal setback rules for any plot size.`;
  }

  if (q.includes("ebps") || q.includes("e-bps") || q.includes("permit") || q.includes("municipality") || q.includes("नक्सा पास") || q.includes("नगरपालिका") || q.includes("कागजात")) {
    return ne
      ? `नगरपालिकामा अनलाइन नक्सा पास (e-BPS) गर्न आवश्यक मुख्य कागजातहरू:\n1. जग्गाधनी प्रमाणपुर्जा (लालपुर्जा) को प्रतिलिपि\n2. चालु आर्थिक वर्षको मालपोत तिरेको रसिद\n3. जग्गाधनीको नागरिकता र पासपोर्ट साइज फोटो\n4. नापी नक्सा (Blueprint) र ट्रेस नक्सा\n5. चार किल्ला प्रमाणित र आर्किटेक्चरल/स्ट्रक्चरल इन्जिनियरिङ ड्रइङ\n\nP.B. Consultation ले काठमाडौं उपत्यकाभित्र e-BPS नक्सा पासको सम्पूर्ण प्राविधिक प्रक्रिया सहज रूपमा सम्पन्न गरिदिन्छ।`
      : `Key documents required for Municipality e-BPS House Permit Approval:\n1. Land Ownership Certificate (Lalpurja) copy\n2. Latest Land Tax (Malpot) clearance receipt\n3. Citizenship certificate & photos of the property owner\n4. Official Cadastral Map (Napi Blueprint & Trace Map)\n5. Signed Architectural & NBC-105 Structural Engineering drawings\n\nP.B. Consultation handles the complete e-BPS digital file preparation and municipal liaison across Kathmandu Valley.`;
  }

  if (q.includes("nbc") || q.includes("earthquake") || q.includes("seismic") || q.includes("waterproof") || q.includes("भूकम्प") || q.includes("मनसुन") || q.includes("पानी")) {
    return ne
      ? `नेपालको राष्ट्रिय भवन संहिता (NBC-105) र सुरक्षित निर्माणका लागि हामी निम्न कुरामा विशेष ध्यान दिन्छौं:\n• माटोको अवस्था अनुसार बलियो फाउन्डेसन र टाई-बीम (Tie-Beams)\n• पिल्लर र बीमको जोर्नीमा भूकम्प प्रतिरोधी डन्डी बाइन्डिङ (Ductile Detailing)\n• छत, बाथरुम र जगमा ओसिलोपन तथा पानी चुहावट रोक्न विशेष वाटरप्रुफिङ (Waterproofing) प्रविधि\n• ३०+ वर्षको निर्माण अनुभव बोकेको प्रकाश निर्माण सेवाद्वारा प्रत्यक्ष साइट सुपरीवेक्षण।`
      : `Under Nepal Building Code (NBC-105) & our quality construction standards:\n• Deep foundation tie-beams and ductile steel detailing at every column-beam joint for maximum earthquake safety\n• Nepal Standard (NS) certified high-ductility steel and grade-tested concrete\n• Multi-layer waterproofing membrane treatment in basements, terraces, and bathrooms to prevent monsoon seepage\n• Direct on-site supervision by licensed civil engineers alongside Prakash Nirman Sewa (30+ years experience).`;
  }

  return ne
    ? `नमस्ते! **P.B. Consultation Pvt. Ltd.** (र भगिनी संस्था **प्रकाश निर्माण सेवा** - ३०+ वर्षको अनुभव) मा स्वागत छ।\n\nहामी भूकम्प प्रतिरोधी घर निर्माण, २D/३D नक्सा डिजाइन, वास्तु परामर्श र नगरपालिका नक्सा पास (e-BPS) सेवा प्रदान गर्छौं।\n\n• **मुख्य कार्यालय:** काठमाडौं-१६, वनस्थली\n• **सम्पर्क फोन:** 9841083084\n• **इमेल:** info.pbconsultation@gmail.com\n\nतपाईंको घर निर्माण योजनाबारे विस्तृत सल्लाहको लागि तलको **"निःशुल्क परामर्श फारम"** भर्नुहोस् वा हामीलाई सिधै फोन गर्नुहोस्!`
    : `Thank you for reaching out to **P.B. Consultation Pvt. Ltd.** (partnered with **Prakash Nirman Sewa** — 30+ years of building experience in Nepal).\n\nWe specialize in turnkey home construction (Standard Family Home & Premium Modern Home), 2D/3D architectural design, Vastu planning, and e-BPS municipal approvals.\n\n• **Main Office:** Kathmandu-16, Banasthali\n• **Direct Phone:** +977 9841083084\n• **Email:** info.pbconsultation@gmail.com\n\nFeel free to ask about our home packages, Vastu layout, permit documents, or click **"Book Free Consultation"** below to send your details to our engineering team!`;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "2mb" }));

  // 1. Multi-turn Gemini Chatbot Endpoint
  app.post("/api/gemini/chat", async (req, res) => {
    const { message, history = [], mode = "standard" } = req.body;
    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Message is required." });
      return;
    }

    const selectedModel =
      mode === "fast" ? "gemini-3.1-flash-lite" : "gemini-3.8-flash";

    const ai = getAiClient();
    if (!ai) {
      res.json({
        text: generateSmartFallbackReply(message, "chat"),
        model: "P.B. Smart Assistant",
      });
      return;
    }

    try {
      const formattedHistory = Array.isArray(history)
        ? history
            .filter(
              (item: { role?: string; text?: string }) =>
                item &&
                (item.role === "user" || item.role === "model") &&
                typeof item.text === "string" &&
                item.text.trim() !== ""
            )
            .map((item: { role: "user" | "model"; text: string }) => ({
              role: item.role,
              parts: [{ text: item.text }],
            }))
        : [];

      const chat = ai.chats.create({
        model: selectedModel,
        history: formattedHistory,
        config: {
          systemInstruction: PB_SYSTEM_INSTRUCTION,
        },
      });

      const response: GenerateContentResponse = await chat.sendMessage({
        message,
      });

      res.json({
        text: response.text || generateSmartFallbackReply(message, "chat"),
        model: selectedModel,
      });
    } catch {
      res.json({
        text: generateSmartFallbackReply(message, "chat"),
        model: "P.B. Smart Assistant",
      });
    }
  });

  // 2. Google Search Grounding Endpoint
  app.post("/api/gemini/search", async (req, res) => {
    const { query } = req.body;
    if (!query || typeof query !== "string") {
      res.status(400).json({ error: "Search query is required." });
      return;
    }

    const ai = getAiClient();
    if (!ai) {
      res.json({
        text: generateSmartFallbackReply(query, "search"),
        sources: [
          {
            title: "Department of Urban Development and Building Construction (DUDBC - NBC Codes)",
            uri: "https://www.dudbc.gov.np",
          },
        ],
      });
      return;
    }

    try {
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: query,
        config: {
          systemInstruction:
            PB_SYSTEM_INSTRUCTION +
            "\nUse Google Search to provide accurate, up-to-date information relevant to construction, architecture, municipal regulations, or materials in Nepal.",
          tools: [{ googleSearch: {} }],
        },
      });

      const chunks =
        response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const sources: Array<{ title: string; uri: string }> = [];

      for (const chunk of chunks) {
        if (chunk.web?.uri) {
          sources.push({
            title: chunk.web.title || chunk.web.uri,
            uri: chunk.web.uri,
          });
        }
      }

      res.json({
        text: response.text || generateSmartFallbackReply(query, "search"),
        sources,
      });
    } catch {
      res.json({
        text: generateSmartFallbackReply(query, "search"),
        sources: [
          {
            title: "Department of Urban Development and Building Construction (DUDBC - Nepal)",
            uri: "https://www.dudbc.gov.np",
          },
        ],
      });
    }
  });

  // 3. Google Maps Grounding Endpoint (Restricted strictly to P.B. Consultation Pvt. Ltd. Main Office)
  app.post("/api/gemini/maps", async (req, res) => {
    const { query } = req.body;
    if (!query || typeof query !== "string") {
      res.status(400).json({ error: "Maps query is required." });
      return;
    }

    const defaultOfficePlace = {
      title: "P.B. Consultation Pvt. Ltd. (Main Office - Banasthali, Kathmandu)",
      uri: OFFICE_MAPS_URI,
      reviewSnippets: [],
    };

    const ai = getAiClient();
    if (!ai) {
      res.json({
        text: generateSmartFallbackReply(query, "maps"),
        places: [defaultOfficePlace],
      });
      return;
    }

    try {
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: query,
        config: {
          systemInstruction:
            PB_SYSTEM_INSTRUCTION +
            `\nIMPORTANT RULE: You must ONLY provide Google Maps location, address, and visiting information for our main office: "P.B. Consultation Pvt. Ltd." located at coordinates (${OFFICE_LAT}, ${OFFICE_LNG}) in Kathmandu-16, Banasthali, Nepal. Do NOT provide or recommend other third-party locations, shops, or external addresses to customers.`,
          tools: [{ googleMaps: {} }],
          toolConfig: {
            retrievalConfig: {
              latLng: {
                latitude: OFFICE_LAT,
                longitude: OFFICE_LNG,
              },
            },
          },
        },
      });

      const chunks =
        response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const places: Array<{
        title: string;
        uri: string;
        reviewSnippets: string[];
      }> = [defaultOfficePlace];

      for (const chunk of chunks) {
        const mapsData = (
          chunk as {
            maps?: {
              uri?: string;
              title?: string;
              placeAnswerSources?: {
                reviewSnippets?: Array<{ content?: string; text?: string } | string>;
              };
            };
          }
        ).maps;

        if (
          mapsData?.uri &&
          mapsData.title &&
          mapsData.title.toLowerCase().includes("p.b")
        ) {
          const rawSnippets =
            mapsData.placeAnswerSources?.reviewSnippets || [];
          const reviewSnippets = rawSnippets
            .map((s) =>
              typeof s === "string" ? s : s?.content || s?.text || ""
            )
            .filter(Boolean);

          places.push({
            title: mapsData.title,
            uri: mapsData.uri,
            reviewSnippets,
          });
        }
      }

      res.json({
        text: response.text || generateSmartFallbackReply(query, "maps"),
        places,
      });
    } catch {
      res.json({
        text: generateSmartFallbackReply(query, "maps"),
        places: [defaultOfficePlace],
      });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
