import React, { useState } from "react";
import { Building, Ruler, FileText, CheckCircle2, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Services() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"construction" | "design" | "ebps">("construction");

  const tabs = [
    {
      id: "construction" as const,
      label: language === "ne" ? "भौतिक निर्माण र ठेक्का (प्रमुख सेवा)" : "Turnkey Construction & Contracting (Core Operations)",
      shortLabel: language === "ne" ? "भौतिक निर्माण" : "Construction",
      icon: Building,
      badge: language === "ne" ? "३०+ वर्षको अनुभव" : "30+ Years Experience"
    },
    {
      id: "design" as const,
      label: language === "ne" ? "भूकम्प प्रतिरोधी डिजाइन" : "Seismic Design & Detailing",
      shortLabel: language === "ne" ? "नक्सा र डिजाइन" : "Engineering & Design",
      icon: Ruler,
      badge: language === "ne" ? "NBC-105 स्वीकृत" : "NBC-105 Compliant"
    },
    {
      id: "ebps" as const,
      label: language === "ne" ? "e-BPS नगरपालिका नक्सा पास" : "e-BPS Municipal Approvals",
      shortLabel: language === "ne" ? "नक्सा पास (e-BPS)" : "e-BPS Permits",
      icon: FileText,
      badge: language === "ne" ? "द्रुत सेवा" : "Fast-Track Clearance"
    }
  ];

  return (
    <section className="py-12 bg-neutral-50 border-y border-neutral-200 relative" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-8" id="services-header">
          <span className="text-[10px] font-mono font-bold text-brand-pink uppercase tracking-widest bg-brand-pink/10 px-3 py-1 rounded-full">
            {language === "ne" ? "हाम्रा व्यावसायिक सेवाहरू" : "OUR SERVICES"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-neutral-900 mt-2 tracking-tight">
            {language === "ne" ? "निर्माण-केन्द्रित इन्जिनियरिङ सेवाहरू" : "Engineering-Led Construction Services"}
          </h2>
          <div className="w-10 h-0.5 bg-brand-gold mx-auto mt-2.5"></div>
          <p className="text-neutral-500 text-xs mt-2.5 font-light leading-relaxed max-w-2xl mx-auto">
            {language === "ne"
              ? "पी.बी. कन्सल्टेशनमा प्राविधिक गम्भीरता र भौतिक निर्माणको गुणस्तरलाई एकसाथ जोडिन्छ। हामी अत्याधुनिक संरचनात्मक इन्जिनियरिङ डिजाइन र भरपर्दो निर्माण कार्यलाई एकीकृत गरी पुस्तौंसम्म सुरक्षित रहने संरचनाहरूको सिर्जना गर्दछौं।"
              : "At P.B. Consultation, structural engineering precision meets meticulously managed physical craftsmanship. We unite sophisticated architectural modeling with seamless turnkey execution to deliver highly refined, seismically secure landmarks."
            }
          </p>
        </div>

        {/* Tab Selection Area - Compact & Space Optimizing */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 mb-8 border-b border-neutral-200 pb-2" id="services-tabs-selector">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full md:w-auto flex items-center justify-between md:justify-center gap-2.5 px-4.5 py-3 rounded text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-[#121214] text-brand-gold shadow-md border-b-2 border-brand-gold"
                    : "bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${isSelected ? "text-brand-pink" : "text-neutral-400"}`} />
                  <span>{tab.shortLabel}</span>
                </div>
                <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded ${
                  isSelected ? "bg-brand-pink/20 text-brand-pink" : "bg-neutral-100 text-neutral-500"
                }`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display - Optimized and Highly Informative */}
        <div className="bg-white rounded-lg border border-neutral-200 shadow-sm p-6 sm:p-8" id="services-tabs-content">
          {activeTab === "construction" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-block bg-brand-pink/10 text-brand-pink text-[9px] font-mono font-bold px-2 py-0.5 rounded">
                  {language === "ne" ? "मुख्य व्यवसायिक स्तम्भ" : "PRIMARY BUSINESS FOCUS"}
                </span>
                <h3 className="text-xl font-display font-extrabold text-neutral-900 uppercase tracking-wide">
                  {language === "ne" ? "पूर्ण भौतिक निर्माण र ठेक्का (Turnkey Contracting)" : "Turnkey Building Construction & General Contracting"}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-light">
                  {language === "ne"
                    ? "हाम्रो प्रमुख उद्देश्य र शक्ति भनेको सिधै ठेक्का लिएर सुरक्षित प्रिमियम भवनहरू निर्माण गर्नु हो। हामी जग खन्नेदेखि भुइँ ढलान, प्लम्बिङ र उत्कृष्ट बाहिरी र आन्तरिक फिनिसिङ सम्मका सम्पूर्ण निर्माण चरणहरू पूर्ण इन्जिनियरिङ उत्तरदायित्वका साथ सम्पन्न गर्छौं।"
                    : "Our main corporate objective is gaining and executing complete turnkey construction projects. We manage raw materials, steel layout detailing, on-site slumps, foundation tie-bars, and finishings under direct civil engineering authority."
                  }
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-light text-neutral-600 pt-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-pink shrink-0 mt-0.5" />
                    <span>{language === "ne" ? "३-वर्षे लिखित संरचनात्मक ग्यारेन्टी कार्ड" : "3-Year written structural safety warranty"}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-pink shrink-0 mt-0.5" />
                    <span>{language === "ne" ? "साइटमै कंक्रिट स्लम र घन शक्ति परीक्षण" : "On-site slump tests & concrete cube tests"}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-pink shrink-0 mt-0.5" />
                    <span>{language === "ne" ? "बिचौलिया रहित प्रत्यक्ष कामदार सुपरिवेक्षण" : "Zero subcontracts policy for quality control"}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-pink shrink-0 mt-0.5" />
                    <span>{language === "ne" ? "उच्च कोटीको Fe 500D स्टील र ५३ ग्रेड सिमेन्ट" : "Sourcing certified Fe500D & OPC 53 cement"}</span>
                  </li>
                </ul>
              </div>
              <div className="lg:col-span-5 bg-neutral-900 text-white p-6 rounded-lg border border-neutral-800 space-y-4">
                <span className="text-[10px] font-mono text-brand-gold font-bold uppercase tracking-wider block">
                  {language === "ne" ? "हाम्रो निर्माण साझेदारी विरासत" : "OUR CONTRACTING LEGACY"}
                </span>
                <p className="text-[11px] text-neutral-300 font-light leading-relaxed">
                  {language === "ne"
                    ? "हाम्रो निर्माण साझेदार प्रकाश निर्माण सेवासँग नेपालमा ३० वर्षभन्दा बढीको गौरवशाली व्यावहारिक क्षेत्र अनुभव छ। कन्सल्टेन्सीको इन्जिनियरिङ दिमाग र निर्माण सेवाको बलियो भौतिक विरासत मिलेर तपाईंको घर सुरक्षित बनाइन्छ।"
                    : "Supported by Prakash Nirman Sewa, possessing 30+ years of continuous structural execution in Nepal. No middleman errors, no design misinterpretations, just pure durable masonry built for generations."
                  }
                </p>
                <div className="pt-2 border-t border-neutral-800 flex justify-between items-center text-[10px] font-mono text-neutral-400">
                  <span>CLASS-A CONTRACTING QUALITY</span>
                  <span className="text-brand-pink">100% NBC-105</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "design" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-block bg-brand-pink/10 text-brand-pink text-[9px] font-mono font-bold px-2 py-0.5 rounded">
                  {language === "ne" ? "प्राविधिक उत्कृष्टता" : "ENGINEERING EXCELLENCE"}
                </span>
                <h3 className="text-xl font-display font-extrabold text-neutral-900 uppercase tracking-wide">
                  {language === "ne" ? "भूकम्प प्रतिरोधी संरचनात्मक र आर्किटेक्चरल नक्सांकन" : "Earthquake-Resilient Structural & Spatial Designs"}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-light">
                  {language === "ne"
                    ? "हामी नेपाल सरकारको राष्ट्रिय भवन संहिता (NBC-105) अनुसार पूर्ण भूकम्प प्रतिरोधी संरचना डिजाइन तयार गर्छौं। यसमा आधुनिक सफ्टवेयर मोडलिङ, डन्डी काट्ने र बाँध्ने विस्तृत ड्रइङ (Ductile Detailing), र परम्परागत वास्तु शास्त्र (Vastu Shastra) को पूर्ण समायोजन समावेश हुन्छ।"
                    : "Rigorous finite-element simulations and custom spatial layout planning. We calculate wind load, soil interaction, and high-ductility rebar spacing to ensure your structural blueprint withstands critical seismic activities seamlessly."
                  }
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-light text-neutral-600 pt-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-pink shrink-0 mt-0.5" />
                    <span>{language === "ne" ? "वास्तु शास्त्र अनुकूल २D योजना र कोठा बाँडफाँड" : "Vastu integrated modern spatial flows"}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-pink shrink-0 mt-0.5" />
                    <span>{language === "ne" ? "डिजिटल ३D भिडियो र वाकथ्रु वास्तुकला" : "Realistic 3D photorealistic walkthroughs"}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-pink shrink-0 mt-0.5" />
                    <span>{language === "ne" ? "डन्डीको विस्तृत ड्रइङ (Structural Detailing)" : "Ductile structural Fe 500D detailing"}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-pink shrink-0 mt-0.5" />
                    <span>{language === "ne" ? "पुराना संरचनाहरूको रेट्रोफिटिङ र प्रवलीकरण" : "Structural strengthening and retrofitting"}</span>
                  </li>
                </ul>
              </div>
              <div className="lg:col-span-5 bg-neutral-50 p-6 rounded-lg border border-neutral-200 space-y-4">
                <div className="flex items-center gap-2 text-neutral-900 font-bold font-display text-xs uppercase tracking-wide">
                  <Sparkles className="w-4 h-4 text-brand-gold" />
                  <span>{language === "ne" ? "डिजाइन र वास्तु उत्कृष्टता" : "Integrated Architecture"}</span>
                </div>
                <p className="text-[11px] text-neutral-500 font-light leading-relaxed">
                  {language === "ne"
                    ? "हाम्रो विशेषता भनेको घरको सुरक्षा र सौन्दर्य दुवैलाई सँगै लैजानु हो। कोठाहरूमा हावाको प्रवाह र उज्यालो मिलाउनुका साथै परम्परागत संस्कार र आधुनिक जीवनशैलीको संयोजन गरिन्छ।"
                    : "We combine structural security with interior spatial beauty. Climate-responsive spacing, optimal solar exposure angles, and premium ventilation profiles are integrated directly in our standard drafts."
                  }
                </p>
              </div>
            </div>
          )}

          {activeTab === "ebps" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-block bg-brand-pink/10 text-brand-pink text-[9px] font-mono font-bold px-2 py-0.5 rounded">
                  {language === "ne" ? "डिजिटल सरकारी प्रक्रिया" : "DIGITAL GOVERNMENTAL PERMITS"}
                </span>
                <h3 className="text-xl font-display font-extrabold text-neutral-900 uppercase tracking-wide">
                  {language === "ne" ? "नगरपालिका अनलाइन नक्सा पास प्रणाली (e-BPS)" : "e-BPS Electronic Municipal Clearance Liaison"}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-light">
                  {language === "ne"
                    ? "काठमाडौं, ललितपुर र पोखराका स्थानीय नगरपालिकाहरूमा अनलाइन नक्सा पास प्रक्रिया (e-BPS) कानुनी र प्राविधिक रूपमा अत्यन्तै जटिल हुन्छ। हाम्रा इजाजतप्राप्त दर्तावाला इन्जिनियरहरूले सरकारी मापदण्ड अनुसार फाइल तयार गरी अनलाइन प्रणालीमा दर्ता गराएर सहज नक्सा पासको सुनिश्चितता गर्छन्।"
                    : "Administrative hurdles can delay construction. Our licensed submitter status in e-BPS portals allows fast-track filing, checking boundaries, setback regulations, and floor-area ratios (FAR) to secure official municipal approval smoothly."
                  }
                </p>
                <div className="bg-brand-pink/5 text-brand-pink text-[10px] p-3 rounded border border-brand-pink/15 font-mono">
                  📍 {language === "ne" ? "e-BPS सेवा काठमाडौं उपत्यका र पोखरा महानगरपालिकाका लागि उपलब्ध छ।" : "e-BPS service optimized for Kathmandu Valley and Pokhara metropolitan areas."}
                </div>
              </div>
              <div className="lg:col-span-5 bg-neutral-950 text-white p-6 rounded-lg border border-neutral-900 space-y-3.5">
                <span className="text-[10px] font-mono text-brand-gold font-bold uppercase tracking-wider block">
                  {language === "ne" ? "नक्सा पासका चरणहरू" : "e-BPS PROCESS MILESTONES"}
                </span>
                <div className="space-y-2 text-[11px] text-neutral-300 font-light font-sans">
                  <div className="flex gap-2">
                    <span className="text-brand-pink font-bold font-mono">1.</span>
                    <span>{language === "ne" ? "जग्गाको नापी र सीमाना रुजु" : "Sidemap cadastral verification"}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-brand-pink font-bold font-mono">2.</span>
                    <span>{language === "ne" ? "नगरपालिका बाइ-लज मापदण्ड मिलावट" : "Municipal setback & FAR alignment"}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-brand-pink font-bold font-mono">3.</span>
                    <span>{language === "ne" ? "डिजिटल पोर्टल फाइल प्रविष्टि र दस्तुर भुक्तानी" : "Digital upload & fee log tracking"}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-brand-pink font-bold font-mono">4.</span>
                    <span>{language === "ne" ? "अनलाइन स्वीकृत प्रमाणपत्र प्राप्त" : "Official digital clearance card issuance"}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Project Management Banner - Condensed and Highly Aesthetic */}
        <div className="mt-6 p-5 bg-white rounded-lg border border-neutral-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4" id="services-pm-banner">
          <div className="space-y-0.5">
            <h4 className="text-xs font-display font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
              {language === "ne" ? "विदेशमा रहनुहुने घरधनीहरूको लागि अनलाइन व्यवस्थापन" : "Integrated Management for Non-Resident Clients"}
            </h4>
            <p className="text-[11px] text-neutral-500 max-w-3xl font-light leading-relaxed">
              {language === "ne" 
                ? "पूर्ण पारदर्शिता र अद्यावधिक जानकारीका लागि हामी निर्माण स्थलमै प्रत्यक्ष (Live CCTV) क्यामेराहरू जडान गरिदिन्छौं। विदेश वा उपत्यका बाहिर रहनुहुने नेपाली ग्राहकहरूले आफ्नो घर निर्माणको प्रत्यक्ष प्रगति जुनसुकै समयमा संसारको जुनसुकै कुनाबाट सिधै अनलाइन हेर्न सक्नुहुन्छ।"
                : "To ensure absolute project transparency, we install live-streaming CCTV cameras directly at your construction site. Designed specifically for non-resident clients residing abroad, you can securely monitor real-time building progress, material arrivals, and structural pouring anytime, anywhere."
              }
            </p>
          </div>
          <a
            href="#contact"
            className="bg-[#121214] hover:bg-neutral-800 text-brand-gold text-[10px] font-bold uppercase tracking-wider py-2.5 px-4 rounded border border-brand-gold shrink-0 transition-colors text-center w-full md:w-auto cursor-pointer"
          >
            {language === "ne" ? "निःशुल्क परामर्श लिनुहोस्" : "Request Turnkey Estimate"}
          </a>
        </div>

      </div>
    </section>
  );
}
