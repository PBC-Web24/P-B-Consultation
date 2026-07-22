import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Process() {
  const { language } = useLanguage();

  const steps = [
    {
      step: "01",
      title: language === "ne" ? "सल्लाह र परामर्श" : "Consultation",
      subLabel: language === "ne" ? "निःशुल्क प्रारम्भिक भेटघाट" : "INITIAL MEET & SITE VISIT",
      desc: language === "ne" 
        ? "जग्गा हेर्ने, तपाईंको बजेट र सपनाको घरको आवश्यकता बुझ्ने, र के-कस्तो घर बनाउन सकिन्छ भनेर सरल भाषामा बुझाउने पहिलो चरण।" 
        : "We visit your land, understand your budget, and explain what kind of home can be built under local laws in simple, everyday terms."
    },
    {
      step: "02",
      title: language === "ne" ? "नक्सा र डिजाइन" : "Design and Drawing",
      subLabel: language === "ne" ? "कोठाको लेआउट र ३D नक्सा" : "ROOM LAYOUTS & 3D VIEWS",
      desc: language === "ne" 
        ? "घरको कोठाहरूको उपयुक्त साइज (२D नक्सा), घरको बाहिरी आकर्षक रूप (३D चित्र), र बलियो पिल्लर/डण्डीको विस्तृत प्राविधिक चित्र तयार पार्ने चरण।" 
        : "We draft clear 2D room layouts, realistic 3D renderings of how your home will look, and solid pillar and beam engineering drafts."
    },
    {
      step: "03",
      title: language === "ne" ? "नगरपालिका स्वीकृत" : "Municipal Approval",
      subLabel: language === "ne" ? "कानुनी नक्सा पास (e-BPS)" : "LEGAL MAP PASSING",
      desc: language === "ne" 
        ? "नगरपालिकाको मापदण्ड र भवन संहिता अनुसार अनलाइन प्रणाली (e-BPS) मार्फत नक्सा दर्ता गराई सरकारी निर्माण इजाजतपत्र लिने काम।" 
        : "We compile all engineering documents and register them in the municipal online portal (e-BPS) to get your legal construction permit."
    },
    {
      step: "04",
      title: language === "ne" ? "भौतिक निर्माण" : "Construction",
      subLabel: language === "ne" ? "जगदेखि रङ्गरोगनसम्म" : "SUPERVISED PHYSICAL BUILD",
      desc: language === "ne" 
        ? "हाम्रो प्रत्यक्ष इन्जिनियरिङ सुपरिवेक्षणमा जग खन्ने, बलियो ढलान गर्ने, इँटाको गारो लगाउने, र उच्च कोटीको सिमेन्ट र रड प्रयोग गरी घर निर्माण गर्ने चरण।" 
        : "The complete physical building phase—excavation, concrete casting, masonry, and plastering under direct engineer supervision on-site."
    },
    {
      step: "05",
      title: language === "ne" ? "साँचो हस्तान्तरण" : "Handover",
      subLabel: language === "ne" ? "गृहप्रवेश र वारेन्टी कार्ड" : "READY FOR OCCUPANCY",
      desc: language === "ne" 
        ? "सम्पूर्ण बत्ती, प्लम्बिङ, पानीको पाइप, र रङ चेक गरी साइट सफा गरेर तपाईंलाई नयाँ घरको साँचो र लिखित ग्यारेन्टी कार्ड बुझाउने अन्तिम चरण।" 
        : "We conduct plumbing pressure and electrical safety tests, deep-clean the site, and hand over the keys along with your written structural warranty."
    }
  ];

  return (
    <section className="py-12 bg-white relative" id="process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10" id="process-header">
          <span className="text-[10px] font-mono font-bold text-brand-pink uppercase tracking-widest bg-brand-pink/10 px-3 py-1 rounded-full">
            {language === "ne" ? "सरल प्रक्रिया" : "SIMPLE OPERATIONAL ROADMAP"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-neutral-900 mt-2 tracking-tight">
            {language === "ne" ? "हाम्रो ५-चरणको सरल निर्माण प्रक्रिया" : "Our 5-Step Turnkey Process"}
          </h2>
          <div className="w-10 h-0.5 bg-brand-gold mx-auto mt-2.5"></div>
          <p className="text-neutral-500 text-xs mt-2.5 font-light leading-relaxed">
            {language === "ne" 
              ? "बिना कुनै झन्झट, नक्सा कोर्ने देखि साँचो बुझ्ने सम्मको काम हामी आफैं सजिलै सम्पन्न गर्छौं।"
              : "From the very first blueprint sketch to handing over the keys, we manage the entire sequence without middleman hassle."
            }
          </p>
        </div>

        {/* Process Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative" id="process-timeline-grid">
          {steps.map((item, index) => (
            <div
              key={index}
              className="p-5 bg-neutral-50 rounded-lg border border-neutral-200 relative flex flex-col justify-between group hover:bg-white hover:border-brand-gold hover:shadow-md transition-all duration-300"
            >
              <div>
                <span className="text-2xl font-display font-extrabold text-brand-gold/30 block mb-2 group-hover:text-brand-gold/70 transition-colors">
                  {item.step}
                </span>
                
                <h4 className="text-xs font-display font-bold text-neutral-900 uppercase tracking-wider">
                  {item.title}
                </h4>
                
                <p className="text-[11px] text-neutral-500 mt-1.5 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
              
              <span className="text-[9px] text-brand-pink font-mono block pt-3.5 uppercase font-bold tracking-wider">
                {item.subLabel}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
