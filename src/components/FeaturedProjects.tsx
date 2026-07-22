import React from "react";
import { FEATURED_PROJECTS } from "../data";
import { Project } from "../types";
import { MapPin, Ruler, Layers } from "lucide-react";
import projectBaluwatar from "../assets/images/project_completed_residence_1784625265336.jpg";
import projectJhamsikhel from "../assets/images/project_construction_progress_1784625278224.jpg";
import projectPokhara from "../assets/images/project_premium_interior_1784625292684.jpg";
import { useLanguage } from "../context/LanguageContext";

const imageMap: Record<string, string> = {
  balaram: projectBaluwatar,
  shanta: projectJhamsikhel,
  ganesh: projectPokhara
};

export default function FeaturedProjects() {
  const { t, language } = useLanguage();

  return (
    <section className="py-12 bg-neutral-50 border-t border-neutral-200 relative" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="projects-header">
          <span className="text-xs font-mono font-bold text-brand-pink uppercase tracking-widest bg-brand-pink/10 px-3.5 py-1.5 rounded-full">
            {t("projects.heading")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 mt-3 tracking-tight">
            {t("projects.title")}
          </h2>
          <div className="w-12 h-1 bg-brand-gold mx-auto mt-4"></div>
          <p className="text-neutral-500 text-sm mt-4 font-light leading-relaxed">
            {t("projects.desc")}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="projects-grid">
          {FEATURED_PROJECTS.map((project: Project) => {
            const translatedTitle = t(`project.${project.id}.title`);
            const translatedLocation = t(`project.${project.id}.location`);
            const translatedStatus = t(`project.${project.id}.status`);
            const translatedBuiltArea = t(`project.${project.id}.builtUpArea`);
            const translatedLandArea = t(`project.${project.id}.landArea`);
            const translatedFocus = t(`project.${project.id}.focus`);
            const translatedFeatures = [
              t(`project.${project.id}.f1`),
              t(`project.${project.id}.f2`),
              t(`project.${project.id}.f3`)
            ];
            const translatedFeedback = t(`project.${project.id}.feedback`);

            return (
              <div
                key={project.id}
                className="bg-white rounded-xl overflow-hidden border border-neutral-200 hover:border-brand-gold hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Visual Header Image Panel */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={imageMap[project.id]}
                      alt={translatedTitle}
                      className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-500 hover:scale-103"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Floating Tags */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                      <span className="bg-neutral-950/80 backdrop-blur-sm text-brand-gold text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded border border-brand-gold/20">
                        {language === "ne" ? "नमुना घर" : project.category}
                      </span>
                      
                      <span className={`text-[9px] font-mono font-bold px-2.5 py-1 rounded uppercase bg-neutral-950/80 backdrop-blur-sm border ${
                        project.status === "Completed"
                          ? "text-emerald-400 border-emerald-500/30"
                          : project.status === "Finishing Stage"
                          ? "text-amber-400 border-amber-500/30"
                          : "text-blue-400 border-blue-500/30"
                      }`}>
                        {translatedStatus}
                      </span>
                    </div>

                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-neutral-950/90 to-transparent p-4 flex items-end">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-brand-pink shrink-0" />
                        {translatedLocation}
                      </span>
                    </div>
                  </div>

                  {/* Card Body content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-display font-bold text-base text-neutral-900 tracking-wide">
                        {translatedTitle}
                      </h3>
                      <p className="text-[11px] text-neutral-400 mt-1 font-mono">
                        {t("projects.owner")}: {language === "ne" ? "घरधनी" : "Homeowner"}
                      </p>
                    </div>

                    {/* Built Up & Land Dimensions */}
                    <div className="grid grid-cols-2 gap-2 text-xs border-y border-neutral-100 py-2.5 text-neutral-500 font-light">
                      <div className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-brand-gold" />
                        <span>{translatedBuiltArea} {language === "ne" ? "निर्माण" : "Built"}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Ruler className="w-3.5 h-3.5 text-brand-gold" />
                        <span>{translatedLandArea} {language === "ne" ? "जग्गा" : "Plot"}</span>
                      </div>
                    </div>

                    {/* Structural Spec Highlights Box */}
                    <div className="p-3.5 bg-neutral-50 rounded border border-neutral-200 text-xs text-neutral-600 font-light leading-relaxed">
                      <span className="text-[9px] font-mono text-brand-gold font-bold uppercase tracking-wider block mb-1">{t("projects.engineering_title")}</span>
                      {translatedFocus}
                    </div>

                    {/* Key Features List */}
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-mono text-neutral-400 font-bold uppercase tracking-wider block">{t("projects.highlights_title")}</span>
                      <ul className="text-xs text-neutral-500 space-y-1 list-disc pl-4 font-light">
                        {translatedFeatures.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>

                {/* Client Quote Preview */}
                {translatedFeedback && (
                  <div className="p-5 bg-neutral-50 border-t border-neutral-100 rounded-b-xl text-xs text-neutral-500 italic font-light relative">
                    &ldquo;{translatedFeedback}&rdquo;
                    <span className="block mt-2 font-semibold font-sans not-italic text-[10px] text-neutral-700 uppercase tracking-wider">
                      — {language === "ne" ? "प्रमाणित ग्राहक" : "Verified Project Client"}
                    </span>
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

