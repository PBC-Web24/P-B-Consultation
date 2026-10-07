import React from "react";
import { PACKAGES } from "../data";
import { ConstructionPackage } from "../types";
import { CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface PackagesProps {
  onContactClick: (packageName?: string) => void;
}

export default function Packages({ onContactClick }: PackagesProps) {
  const { t, language } = useLanguage();
  const isNe = language === "ne";

  return (
    <section className="py-14 bg-neutral-50 border-t border-neutral-200 relative" id="packages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-14" id="packages-header">
          <span className="text-xs font-mono font-bold text-brand-pink uppercase tracking-widest bg-brand-pink/10 px-3.5 py-1.5 rounded-full">
            {t("packages.heading")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 mt-3 tracking-tight">
            {t("packages.title")}
          </h2>
          <div className="w-12 h-1 bg-brand-gold mx-auto mt-4"></div>
          <p className="text-neutral-600 text-sm sm:text-base mt-4 font-light leading-relaxed">
            {t("packages.desc")}
          </p>
        </div>

        {/* Simplified Plain-Language Package Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch" id="packages-grid">
          {PACKAGES.map((pkg: ConstructionPackage) => {
            const packageName = isNe ? pkg.nameNe : pkg.name;
            const packageBadge = isNe ? pkg.badgeNe : pkg.badge;
            const packageTagline = isNe ? pkg.taglineNe : pkg.tagline;
            const rateLabel = isNe ? pkg.rateLabelNe : pkg.rateLabel;
            const rateSubtext = isNe ? pkg.rateSubtextNe : pkg.rateSubtext;
            const items = isNe ? pkg.highlightsNe : pkg.highlights;

            return (
              <div
                key={pkg.id}
                className={`rounded-2xl overflow-hidden border flex flex-col justify-between transition-all duration-300 ${
                  pkg.highlighted
                    ? "bg-[#121214] text-white border-brand-gold/50 shadow-xl"
                    : "bg-white text-neutral-900 border-neutral-200 shadow-sm"
                }`}
              >
                
                {/* Card Header */}
                <div className="p-8 pb-6 border-b border-neutral-200/10 relative">
                  {pkg.highlighted && (
                    <div className="inline-flex items-center gap-1.5 bg-brand-gold text-neutral-950 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                      <Sparkles className="w-3 h-3" />
                      <span>{isNe ? "धेरैको रोजाइ" : "MOST POPULAR"}</span>
                    </div>
                  )}
                  
                  <span className={`text-[11px] font-mono font-bold uppercase tracking-wider block mb-1 ${
                    pkg.highlighted ? "text-brand-gold" : "text-brand-pink"
                  }`}>
                    {packageBadge}
                  </span>
                  
                  <h3 className="text-2xl sm:text-3xl font-display font-bold tracking-tight">
                    {packageName}
                  </h3>
                  
                  <p className={`text-sm mt-2.5 font-light leading-relaxed ${
                    pkg.highlighted ? "text-neutral-300" : "text-neutral-600"
                  }`}>
                    {packageTagline}
                  </p>

                  {/* Simple, Customer-Friendly Pricing Box */}
                  <div className={`mt-6 p-4 rounded-xl border ${
                    pkg.highlighted 
                      ? "bg-neutral-900/80 border-neutral-800" 
                      : "bg-neutral-50 border-neutral-200/80"
                  }`}>
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block mb-1 ${
                      pkg.highlighted ? "text-brand-gold" : "text-brand-pink"
                    }`}>
                      {isNe ? "बजेट र लागत" : "FLEXIBLE PRICING"}
                    </span>
                    <span className="text-sm sm:text-base font-bold block">{rateLabel}</span>
                    <span className={`text-xs block mt-1 font-light leading-relaxed ${
                      pkg.highlighted ? "text-neutral-400" : "text-neutral-500"
                    }`}>
                      {rateSubtext}
                    </span>
                  </div>
                </div>

                {/* Simplified Easy-to-Read List */}
                <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <h4 className={`text-xs font-mono font-bold uppercase tracking-wider mb-4 ${
                      pkg.highlighted ? "text-brand-gold" : "text-neutral-900"
                    }`}>
                      {isNe ? "यसमा के-के सुविधा समावेश छन्?" : "What You Get With This Option"}
                    </h4>

                    <ul className="space-y-3.5">
                      {items.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm font-light leading-relaxed">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-1 ${
                            pkg.highlighted ? "text-brand-gold" : "text-brand-pink"
                          }`} />
                          <span className={pkg.highlighted ? "text-neutral-200" : "text-neutral-700"}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 border-t border-neutral-200/10">
                    <button
                      onClick={() => onContactClick(packageName)}
                      className={`w-full py-4 px-6 text-xs font-bold uppercase tracking-widest rounded-lg transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                        pkg.highlighted
                          ? "bg-brand-gold text-neutral-950 hover:bg-white hover:text-neutral-950 shadow-md"
                          : "bg-[#121214] text-white hover:bg-neutral-800 shadow-md"
                      }`}
                    >
                      <span>{t("packages.btn_select")}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

