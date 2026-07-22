import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function WhyChooseUs() {
  const { t } = useLanguage();

  return (
    <section className="py-12 bg-[#121214] text-white overflow-hidden relative" id="why-choose-us">
      {/* Blueprint Grid decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(197, 168, 80, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(197, 168, 80, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: "30px 30px"
      }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Mission, Corporate Context */}
          <div className="lg:col-span-5 space-y-6 text-left" id="why-text">
            <span className="text-xs font-mono font-bold text-brand-gold uppercase tracking-widest bg-brand-gold/10 border border-brand-gold/20 px-3.5 py-1.5 rounded-full">
              {t("why.org_identity")}
            </span>
            
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white leading-tight">
              {t("why.title_1")}<br />
              <span className="text-brand-gold">{t("why.title_2")}</span>
            </h2>
            
            <p className="text-neutral-300 text-sm font-light leading-relaxed">
              {t("why.desc1")}
            </p>
            
            <p className="text-neutral-300 text-sm font-light leading-relaxed">
              {t("why.desc2")}
            </p>

            <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded space-y-2">
              <span className="text-xs font-mono text-brand-pink font-semibold uppercase block">{t("why.benefit_title")}</span>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                {t("why.benefit_desc")}
              </p>
            </div>
          </div>

          {/* Right Column: Dynamic Blueprint Synergy Card */}
          <div className="lg:col-span-7 bg-neutral-900 rounded-xl border border-neutral-800 p-6 sm:p-8 space-y-8 shadow-2xl" id="why-diagram">
            
            <div className="text-center pb-5 border-b border-neutral-800">
              <h4 className="text-xs font-mono text-brand-gold uppercase tracking-widest font-semibold">{t("why.workflow_title")}</h4>
              <p className="text-[11px] text-neutral-400 mt-1 font-light">{t("why.workflow_desc")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              
              {/* Central decorative connector */}
              <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-brand-gold border-4 border-neutral-900 items-center justify-center z-10 text-[11px] text-neutral-950 font-bold font-mono">
                +
              </div>

              {/* Box 1: P.B. Consultation */}
              <div className="p-5.5 rounded-lg border border-brand-gold/20 bg-[#121214] space-y-3 shadow-inner">
                <div className="w-9 h-9 rounded-full bg-brand-gold/10 border border-brand-gold flex items-center justify-center font-display text-brand-gold font-bold text-sm">
                  PB
                </div>
                <div>
                  <h5 className="text-xs font-display font-bold text-white uppercase tracking-wider">{t("why.box1_title")}</h5>
                  <p className="text-[10px] text-brand-gold font-mono uppercase mt-0.5 font-semibold">{t("why.box1_subtitle")}</p>
                </div>
                <ul className="text-xs text-neutral-400 space-y-2.5 pl-3 list-disc font-light leading-normal">
                  <li>{t("why.box1_f1")}</li>
                  <li>{t("why.box1_f2")}</li>
                  <li>{t("why.box1_f3")}</li>
                  <li>{t("why.box1_f4")}</li>
                </ul>
              </div>

              {/* Box 2: Prakash Nirman Sewa */}
              <div className="p-5.5 rounded-lg border border-neutral-800 bg-[#121214] space-y-3 shadow-inner">
                <div className="w-9 h-9 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center font-display text-neutral-400 font-bold text-sm">
                  PN
                </div>
                <div>
                  <h5 className="text-xs font-display font-bold text-white uppercase tracking-wider">{t("why.box2_title")}</h5>
                  <p className="text-[10px] text-neutral-400 font-mono uppercase mt-0.5 font-semibold">{t("why.box2_subtitle")}</p>
                </div>
                <ul className="text-xs text-neutral-400 space-y-2.5 pl-3 list-disc font-light leading-normal">
                  <li>{t("why.box2_f1")}</li>
                  <li>{t("why.box2_f2")}</li>
                  <li>{t("why.box2_f3")}</li>
                  <li>{t("why.box2_f4")}</li>
                </ul>
              </div>

            </div>

            <div className="p-4 bg-neutral-950/60 rounded border border-neutral-800 text-center">
              <p className="text-xs font-light text-neutral-300">
                {t("why.bottom_text")}
              </p>
              <div className="mt-3">
                <a href="#contact" className="inline-flex items-center gap-1.5 text-brand-gold hover:text-white text-xs font-bold uppercase tracking-wider transition-colors">
                  {t("why.bottom_cta")} <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

