import React from "react";
import { PACKAGES } from "../data";
import { ConstructionPackage } from "../types";
import { CheckCircle2, Shield, Hammer, FileText } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface PackagesProps {
  onContactClick: () => void;
}

export default function Packages({ onContactClick }: PackagesProps) {
  const { t, language } = useLanguage();

  return (
    <section className="py-12 bg-neutral-50 border-t border-neutral-200 relative" id="packages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="packages-header">
          <span className="text-xs font-mono font-bold text-brand-pink uppercase tracking-widest bg-brand-pink/10 px-3.5 py-1.5 rounded-full">
            {t("packages.heading")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 mt-3 tracking-tight">
            {t("packages.title")}
          </h2>
          <div className="w-12 h-1 bg-brand-gold mx-auto mt-4"></div>
          <p className="text-neutral-500 text-sm mt-4 font-light leading-relaxed">
            {t("packages.desc")}
          </p>
        </div>

        {/* Comparative Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch" id="packages-grid">
          {PACKAGES.map((pkg: ConstructionPackage) => {
            const translatedName = t(`package.${pkg.id}.name`);
            const translatedTagline = t(`package.${pkg.id}.tagline`);
            
            const translatedSteel = t(`package.${pkg.id}.mat.steel`);
            const translatedCement = t(`package.${pkg.id}.mat.cement`);
            const translatedBricks = t(`package.${pkg.id}.mat.bricks`);
            const translatedSand = t(`package.${pkg.id}.mat.sand`);

            const translatedFlooring = t(`package.${pkg.id}.fin.flooring`);
            const translatedDoors = t(`package.${pkg.id}.fin.doors`);
            const translatedPlumbing = t(`package.${pkg.id}.fin.plumbing`);
            const translatedElectrical = t(`package.${pkg.id}.fin.electrical`);
            const translatedPainting = t(`package.${pkg.id}.fin.painting`);

            const translatedEngAssurance = [
              t(`package.${pkg.id}.eng1`),
              t(`package.${pkg.id}.eng2`),
              t(`package.${pkg.id}.eng3`),
              t(`package.${pkg.id}.eng4`),
              t(`package.${pkg.id}.eng5`)
            ];

            return (
              <div
                key={pkg.id}
                className={`rounded-xl overflow-hidden border flex flex-col justify-between transition-all duration-300 ${
                  pkg.highlighted
                    ? "bg-[#121214] text-white border-brand-gold/50 shadow-xl"
                    : "bg-white text-neutral-900 border-neutral-200 shadow-sm"
                }`}
              >
                
                {/* Card Header */}
                <div className="p-8 pb-6 border-b border-neutral-200/10 relative">
                  {pkg.highlighted && (
                    <div className="absolute top-6 right-6 bg-brand-gold text-neutral-950 text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                      {language === "ne" ? "सिफारिस गरिएको" : "RECOMMENDED SPEC"}
                    </div>
                  )}
                  
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block mb-1 ${
                    pkg.highlighted ? "text-brand-gold" : "text-brand-pink"
                  }`}>
                    {language === "ne" ? "निर्माण विवरण" : "BUILD SPECIFICATION"}
                  </span>
                  
                  <h3 className="text-2xl font-display font-bold tracking-tight">
                    {translatedName}
                  </h3>
                  
                  <p className={`text-xs mt-2.5 font-light leading-relaxed ${
                    pkg.highlighted ? "text-neutral-300" : "text-neutral-500"
                  }`}>
                    {translatedTagline}
                  </p>

                  <div className="mt-5 p-3.5 bg-neutral-950/20 rounded border border-dashed border-neutral-700/30">
                    <span className={`text-[9px] font-mono uppercase block mb-1 ${
                      pkg.highlighted ? "text-brand-gold/80" : "text-neutral-400"
                    }`}>{language === "ne" ? "मूल्य निर्धारण नीति" : "PRICING POLICY"}</span>
                    <span className="text-sm font-bold block">{t("packages.quote_lbl")}</span>
                    <span className="text-[10px] text-neutral-400 block mt-0.5">
                      {language === "ne" 
                        ? "इन्जिनियरिङ नक्सा डिजाइन र आवश्यक परिमाण (BOQ) को आधारमा" 
                        : "Based on custom item-wise structural BOQ calculations"}
                    </span>
                  </div>
                </div>

                {/* Card Content body */}
                <div className="p-8 space-y-6 flex-1">
                  
                  {/* Structural Materials Specification */}
                  <div className="space-y-3">
                    <h4 className={`text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 ${
                      pkg.highlighted ? "text-brand-gold" : "text-neutral-900"
                    }`}>
                      <Hammer className="w-3.5 h-3.5" />
                      {t("packages.mat_title")}
                    </h4>
                    <ul className={`text-xs space-y-2 font-light ${pkg.highlighted ? "text-neutral-300" : "text-neutral-600"}`}>
                      <li><strong>{t("packages.mat_steel")}:</strong> {translatedSteel}</li>
                      <li><strong>{t("packages.mat_cement")}:</strong> {translatedCement}</li>
                      <li><strong>{t("packages.mat_bricks")}:</strong> {translatedBricks}</li>
                      <li><strong>{t("packages.mat_sand")}:</strong> {translatedSand}</li>
                    </ul>
                  </div>

                  {/* Finishing Specifications */}
                  <div className="space-y-3 pt-2">
                    <h4 className={`text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 ${
                      pkg.highlighted ? "text-brand-gold" : "text-neutral-900"
                    }`}>
                      <FileText className="w-3.5 h-3.5" />
                      {t("packages.fin_title")}
                    </h4>
                    <ul className={`text-xs space-y-2 font-light ${pkg.highlighted ? "text-neutral-300" : "text-neutral-600"}`}>
                      <li><strong>{t("packages.fin_flooring")}:</strong> {translatedFlooring}</li>
                      <li><strong>{t("packages.fin_doors")}:</strong> {translatedDoors}</li>
                      <li><strong>{t("packages.fin_plumbing")}:</strong> {translatedPlumbing}</li>
                      <li><strong>{t("packages.fin_electrical")}:</strong> {translatedElectrical}</li>
                      <li><strong>{t("packages.fin_painting")}:</strong> {translatedPainting}</li>
                    </ul>
                  </div>

                  {/* Engineering Supervision Checklist */}
                  <div className="space-y-3 pt-2">
                    <h4 className={`text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 ${
                      pkg.highlighted ? "text-brand-gold" : "text-neutral-900"
                    }`}>
                      <Shield className="w-3.5 h-3.5" />
                      {t("packages.eng_title")}
                    </h4>
                    <div className="space-y-2">
                      {translatedEngAssurance.map((item, index) => (
                        <div key={index} className="flex items-start gap-2 text-xs font-light">
                          <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                            pkg.highlighted ? "text-brand-gold" : "text-brand-pink"
                          }`} />
                          <span className={pkg.highlighted ? "text-neutral-200" : "text-neutral-700"}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Action footer card */}
                <div className="p-8 border-t border-neutral-200/10">
                  <button
                    onClick={onContactClick}
                    className={`w-full py-4 text-center text-xs font-bold uppercase tracking-widest rounded transition-all duration-300 cursor-pointer ${
                      pkg.highlighted
                        ? "bg-brand-gold text-neutral-950 hover:bg-white hover:text-neutral-950 shadow-md"
                        : "bg-[#121214] text-white hover:bg-neutral-800 shadow-md"
                    }`}
                  >
                    {language === "ne" ? "निःशुल्क विस्तृत विवरण माग्नुहोस्" : "Request Technical Presentation"}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

