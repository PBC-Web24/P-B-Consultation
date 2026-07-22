import React from "react";
import { Award, ArrowRight, ShieldCheck, CheckCircle2, Layers } from "lucide-react";
import heroBuilding from "../assets/images/hero_nepal_building_1784625244345.jpg";
import { useLanguage } from "../context/LanguageContext";

interface HeroProps {
  onContactClick: () => void;
}

export default function Hero({ onContactClick }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section className="relative bg-neutral-950 text-white pt-6 pb-12 md:pt-10 md:pb-20 overflow-hidden" id="hero">
      
      {/* Decorative Blueprint Grid Backdrop (3-5% opacity) */}
      <div className="absolute inset-0 opacity-4 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(197, 168, 80, 0.12) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(197, 168, 80, 0.12) 1px, transparent 1px)
        `,
        backgroundSize: "36px 36px"
      }}></div>
      
      {/* Soft Gold Radial Ambient Light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/8 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading, Trust Badges, CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-gold/10 text-brand-gold text-[11px] sm:text-xs px-4 py-2 rounded-full border border-brand-gold/20 font-medium tracking-wide">
              <Award className="w-4 h-4 text-brand-gold shrink-0" />
              <span>{t("hero.badge")}</span>
            </div>
 
            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white leading-tight">
              {t("hero.headline_1")}<br />
              <span className="text-brand-gold">{t("hero.headline_2")}</span>
            </h1>
 
            {/* Supporting Paragraphs */}
            <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed font-light max-w-2xl">
              <p>{t("hero.p1")}</p>
              <p>{t("hero.p2")}</p>
            </div>
 
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={onContactClick}
                className="bg-brand-pink hover:bg-brand-pink/90 text-white text-xs font-semibold uppercase tracking-widest px-8 py-4 rounded shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer text-center"
              >
                {t("hero.btn_consult")}
              </button>
              <a
                href="#projects"
                className="border border-brand-gold hover:bg-brand-gold/10 text-brand-gold text-xs font-semibold uppercase tracking-widest px-8 py-4 rounded transition-all duration-300 transform hover:-translate-y-0.5 text-center"
              >
                {t("hero.btn_projects")}
              </a>
            </div>

            {/* Trust Metrics Grid */}
            <div className="pt-8 border-t border-neutral-800/80 grid grid-cols-3 gap-6 max-w-xl text-[11px] sm:text-xs text-neutral-400 font-light">
              <div>
                <span className="text-white font-semibold font-mono block text-xs sm:text-sm mb-0.5">{t("hero.metric_1_title")}</span>
                {t("hero.metric_1_desc")}
              </div>
              <div>
                <span className="text-white font-semibold font-mono block text-xs sm:text-sm mb-0.5">{t("hero.metric_2_title")}</span>
                {t("hero.metric_2_desc")}
              </div>
              <div>
                <span className="text-white font-semibold font-mono block text-xs sm:text-sm mb-0.5">{t("hero.metric_3_title")}</span>
                {t("hero.metric_3_desc")}
              </div>
            </div>

          </div>

          {/* Right Column: Premium Realistic Image and Glassmorphism Floating Cards */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none group">
              
              {/* Outer Glow Decorative Border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-gold/20 to-brand-pink/20 rounded-2xl blur opacity-70 group-hover:opacity-100 transition duration-1000"></div>
              
              {/* Main Image Container */}
              <div className="relative bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden shadow-2xl aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
                <img
                  src={heroBuilding}
                  alt="Modern premium residence designed and built in Kathmandu Valley, Nepal"
                  className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-700 hover:scale-103"
                  referrerPolicy="no-referrer"
                />
                
                {/* Subtle blueprint grid overlay on top of image at margins */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/40 pointer-events-none"></div>
              </div>



              {/* Floating Card 2: Integrated Design-To-Build approach */}
              <div className="absolute -top-6 -right-6 sm:right-[-2rem] bg-[#121214]/90 backdrop-blur-md border border-brand-gold/30 p-4 rounded-xl shadow-2xl max-w-[210px] space-y-1.5 transition-all duration-300 hover:translate-y-[-2px]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-brand-gold/15 flex items-center justify-center">
                    <Layers className="w-4 h-4 text-brand-gold" />
                  </div>
                  <span className="text-[10px] font-mono text-brand-gold font-bold uppercase tracking-wider">INTEGRATED BUILD</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{t("hero.floating_card_2_title")}</h4>
                  <p className="text-[10px] text-neutral-400 font-light leading-snug">{t("hero.floating_card_2_desc")}</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

