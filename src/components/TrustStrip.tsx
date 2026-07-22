import React from "react";
import { Hammer, Ruler, Shield, MapPin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function TrustStrip() {
  const { language } = useLanguage();

  const credentials = [
    {
      icon: Hammer,
      title: language === "ne" ? "पूर्ण भौतिक निर्माण" : "Complete Construction",
      desc: language === "ne" ? "प्रत्यक्ष निर्माण सामग्री तथा प्राविधिक जिम्मेवारी" : "Turnkey execution & direct material logistics"
    },
    {
      icon: Ruler,
      title: language === "ne" ? "इन्जिनियरिङ निर्देशित डिजाइन" : "Engineering-Led Design",
      desc: language === "ne" ? "यथार्थपरक र उत्कृष्ट नक्सा डिजाइन" : "Practical buildable spatial blueprints"
    },
    {
      icon: Shield,
      title: language === "ne" ? "NBC भवन संहिता मापदण्ड" : "NBC Compliant Structures",
      desc: language === "ne" ? "भूकम्पिय सुरक्षा र कडा संरचनात्मक परीक्षण" : "Rigorous local seismic safety margins"
    },
    {
      icon: MapPin,
      title: language === "ne" ? "नेपालभर फैलिएको सेवा" : "Projects Across Nepal",
      desc: language === "ne" ? "भू-बनोट र स्थानीय कानुनको पूर्ण ज्ञान" : "Local bylaws and geological knowledge"
    }
  ];

  return (
    <section className="bg-neutral-900 border-y border-neutral-800 shadow-md py-6 relative z-20" id="trust-strip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4 divide-y lg:divide-y-0 lg:divide-x divide-neutral-800">
          {credentials.map((cred, index) => {
            const Icon = cred.icon;
            return (
              <div
                key={index}
                className={`flex items-center gap-4 py-2 lg:py-0 ${
                  index === 0 ? "pl-2" : "lg:pl-8"
                }`}
              >
                <div className="w-11 h-11 rounded bg-neutral-800 border border-brand-gold/30 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <h4 className="text-xs font-display font-bold text-white tracking-wider uppercase">
                    {cred.title}
                  </h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5 font-light">
                    {cred.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

