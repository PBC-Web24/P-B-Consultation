import React from "react";
import { ShieldCheck } from "lucide-react";
import pbLogo from "../assets/images/pb_consultation_uploaded_logo_1784625669393.jpg";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-neutral-400 text-xs py-16 border-t border-neutral-900 relative" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Logo, Brand Summary and Credentials */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <img
                src={pbLogo}
                alt="P.B. Consultation Logo"
                className="w-10 h-10 rounded-full border border-neutral-800 object-cover shadow-sm"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="font-display font-bold text-base tracking-wider text-white block">
                  {language === "ne" ? "पी.बी. कन्सल्टेशन" : "P.B. Consultation"}
                </span>
                <span className="text-[9px] text-neutral-500 font-mono tracking-widest uppercase block -mt-0.5">
                  {language === "ne" ? "इन्जिनियरिङ र निर्माण" : "Engineering & Construction"}
                </span>
              </div>
            </div>

            <p className="text-neutral-500 leading-relaxed font-light">
              {language === "ne"
                ? "पी.बी. कन्सल्टेशन प्रा. लि. नेपालमा दर्ता भएको इन्जिनियरिङ फर्म हो, जुन भूकम्प प्रतिरोधी संरचनात्मक डिजाइन, नक्सा पास र प्रिमियम भवन निर्माण कार्यमा समर्पित छ।"
                : "P.B. Consultation Pvt. Ltd. is a registered engineering firm in Nepal, dedicated to seismic compliance, structural engineering design, and premium turnkey construction management."
              }
            </p>

            {/* Official Credentials Row */}
            <div className="pt-4 border-t border-neutral-900 space-y-3">
              <span className="text-[10px] font-mono text-brand-gold font-bold uppercase tracking-wider block">
                {language === "ne" ? "आधिकारिक प्रमाणहरू" : "OFFICIAL CREDENTIALS"}
              </span>
              <ul className="text-xs text-neutral-500 space-y-2 font-light">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-pink shrink-0" />
                  <span>{language === "ne" ? "इजाजतप्राप्त सिभिल तथा स्ट्रक्चरल इन्जिनियरहरू" : "Licensed Civil & Structural Engineers"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-pink shrink-0" />
                  <span>{language === "ne" ? "नगरपालिका नक्सा पास (e-BPS) स्वीकृत प्रस्तावक" : "e-BPS Authorized Submitter Status"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-pink shrink-0" />
                  <span>{language === "ne" ? "भूकम्पीय स्थिरता कोड विशेषज्ञ टोली" : "Seismic Stability Code Expert Group"}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-[10px] font-mono text-brand-gold font-bold uppercase tracking-wider block">
              {language === "ne" ? "साइट नेभिगेसन" : "CORPORATE REVIEWS"}
            </span>
            <ul className="space-y-2.5 font-light">
              <li>
                <a href="#construction" className="hover:text-white transition-colors">
                  {language === "ne" ? "भवन निर्माण" : "Turnkey Construction"}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  {language === "ne" ? "इन्जिनियरिङ सेवाहरू" : "Engineering Services"}
                </a>
              </li>
              <li>
                <a href="#why-choose-us" className="hover:text-white transition-colors">
                  {language === "ne" ? "प्रकाश निर्माण सेवाको विरासत" : "Prakash Nirman Sewa Legacy"}
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">
                  {language === "ne" ? "५-चरणको प्रक्रिया" : "Operational Roadmap"}
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  {language === "ne" ? "हाम्रा परियोजनाहरू" : "Nepal Portfolio Footprint"}
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-white transition-colors">
                  {language === "ne" ? "निर्माण प्याकेजहरू" : "Comparative Specifications"}
                </a>
              </li>
            </ul>
          </div>

          {/* Office Geographies */}
          <div className="md:col-span-5 space-y-6">
            
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-brand-gold font-bold uppercase tracking-wider block">
                {language === "ne" ? "काठमाडौं उपत्यका (मुख्य कार्यालय)" : "KATHMANDU VALLEY (HEAD OFFICE)"}
              </span>
              <div className="flex items-start gap-3.5 font-light text-neutral-400">
                <span className="text-brand-pink shrink-0 mt-0.5">📍</span>
                <p className="leading-relaxed">
                  {language === "ne" ? "काठमाडौं-१६, वनस्थली, नेपाल" : "Kathmandu-16, Banasthali, Nepal"}<br />
                  <span className="text-[10px] text-neutral-600 block mt-0.5">
                    {language === "ne" 
                      ? "इन्जिनियरिङ तथा निर्माण शाखा" 
                      : "Engineering & Construction Wing"}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-3.5 font-light text-neutral-400">
                <span className="text-brand-pink shrink-0">📞</span>
                <span>{language === "ne" ? "फोन: +९७७ ९८४१०८३०८४" : "Phone: +977 9841083084"}</span>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-neutral-900">
              <span className="text-[10px] font-mono text-brand-gold font-bold uppercase tracking-wider block">
                {language === "ne" ? "पोखरा क्षेत्रीय कार्यालय" : "POKHARA REGIONAL OFFICE"}
              </span>
              <div className="flex items-start gap-3.5 font-light text-neutral-400">
                <span className="text-neutral-600 shrink-0 mt-0.5">📍</span>
                <p className="leading-relaxed">
                  {language === "ne" ? "रानीपौवा रोड, पोखरा-११, कास्की" : "Ranipauwa Road, Pokhara-11, Kaski"}<br />
                  <span className="text-[10px] text-neutral-600 block mt-0.5">
                    {language === "ne" 
                      ? "गण्डकी प्रदेशका ग्राहक वर्ग र साइट अडिटको लागि" 
                      : "Serving Gandaki Province clients and site audits"}
                  </span>
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Copyright and Bottom Line */}
        <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-neutral-600 text-[11px] font-mono">
          <div>
            <span>&copy; {currentYear} {language === "ne" ? "पी.बी. कन्सल्टेशन प्रा. लि." : "P.B. Consultation Pvt. Ltd."} {language === "ne" ? "सर्वाधिकार सुरक्षित।" : "All rights reserved."}</span>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-500 font-sans">
            <span>{language === "ne" ? "आधिकारिक निर्माण साझेदार:" : "Official Construction Partner:"}</span>
            <strong className="text-brand-gold font-bold font-mono text-xs ml-1">
              {language === "ne" ? "प्रकाश निर्माण सेवा" : "Prakash Nirman Sewa"}
            </strong>
          </div>
        </div>

      </div>
    </footer>
  );
}
