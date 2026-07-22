import React from "react";
import { CheckCircle2, Ruler, ShieldAlert, ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface ConstructionProps {
  onContactClick: () => void;
}

export default function Construction({ onContactClick }: ConstructionProps) {
  const { t } = useLanguage();

  return (
    <section className="py-12 bg-white relative" id="construction">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Visual Specs Blueprint Card */}
          <div className="lg:col-span-5 space-y-6" id="construction-visual">
            <div className="bg-[#121214] text-white p-8 rounded-xl shadow-xl border-t-4 border-brand-gold relative overflow-hidden">
              {/* Subtle grid backing */}
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
                backgroundImage: "linear-gradient(rgba(197, 168, 80, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(197, 168, 80, 0.2) 1px, transparent 1px)",
                backgroundSize: "20px 20px"
              }}></div>

              <div className="relative z-10 space-y-6">
                <span className="inline-flex items-center gap-1.5 bg-brand-pink text-white text-[9px] font-mono font-bold px-3 py-1 rounded uppercase tracking-wider">
                  {t("construction.primary_ops")}
                </span>
                
                <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                  {t("construction.turnkey_title")}
                </h3>
                
                <p className="text-xs text-neutral-300 leading-relaxed font-light">
                  {t("construction.turnkey_desc")}
                </p>

                <div className="space-y-3.5 pt-2">
                  <div className="flex items-start gap-3 text-xs font-light text-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span>{t("construction.spec1")}</span>
                  </div>
                  <div className="flex items-start gap-3 text-xs font-light text-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span>{t("construction.spec2")}</span>
                  </div>
                  <div className="flex items-start gap-3 text-xs font-light text-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span>{t("construction.spec3")}</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-800 text-[11px] text-neutral-400 font-sans leading-relaxed">
                  <span className="text-brand-gold font-bold block mb-1 font-mono text-xs">{t("construction.pricing_title")}</span>
                  {t("construction.pricing_desc")}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed copy */}
          <div className="lg:col-span-7 space-y-6" id="construction-details">
            <span className="text-xs font-mono font-bold text-brand-pink uppercase tracking-widest bg-brand-pink/10 px-3.5 py-1.5 rounded-full">
              {t("construction.contracts")}
            </span>
            
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-950 tracking-tight leading-tight">
              {t("construction.eng_quality_title")}
            </h2>
            
            <div className="w-12 h-1 bg-brand-gold"></div>
            
            <p className="text-neutral-600 text-sm leading-relaxed font-light">
              {t("construction.eng_quality_desc")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="p-5.5 bg-neutral-50 rounded-lg border border-neutral-200">
                <h4 className="text-xs font-mono font-bold text-neutral-900 uppercase tracking-wider">{t("construction.mat_sourcing_title")}</h4>
                <p className="text-xs text-neutral-500 mt-2 font-light leading-relaxed">
                  {t("construction.mat_sourcing_desc")}
                </p>
              </div>
              <div className="p-5.5 bg-neutral-50 rounded-lg border border-neutral-200">
                <h4 className="text-xs font-mono font-bold text-neutral-900 uppercase tracking-wider">{t("construction.quality_log_title")}</h4>
                <p className="text-xs text-neutral-500 mt-2 font-light leading-relaxed">
                  {t("construction.quality_log_desc")}
                </p>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-5">
              <button
                onClick={onContactClick}
                className="bg-brand-pink hover:bg-brand-pink/90 text-white font-display text-xs font-bold px-7 py-3.5 rounded shadow hover:shadow-md transition-all cursor-pointer"
              >
                {t("construction.btn_estimate")}
              </button>
              <a
                href="#why-choose-us"
                className="text-neutral-600 hover:text-neutral-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
              >
                {t("construction.learn_legacy")} <ArrowRight className="w-4 h-4 text-brand-gold" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

