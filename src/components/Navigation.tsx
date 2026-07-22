import React, { useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import pbLogo from "../assets/images/pb_consultation_uploaded_logo_1784625669393.jpg";
import { useLanguage } from "../context/LanguageContext";

interface NavigationProps {
  onContactClick: () => void;
}

export default function Navigation({ onContactClick }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { label: t("nav.home"), href: "#hero" },
    { label: t("nav.about"), href: "#why-choose-us" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.packages"), href: "#packages" },
    { label: t("nav.contact"), href: "#contact" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 border-b border-neutral-200 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Brand Block */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-3 focus:outline-none group" id="nav-logo">
              <div className="w-12 h-12 rounded-full border border-neutral-200 overflow-hidden shadow-sm flex items-center justify-center bg-white">
                <img
                  src={pbLogo}
                  alt="P.B. Consultation Logo"
                  className="w-full h-full object-cover scale-[1.35] group-hover:scale-[1.42] transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-display font-bold text-lg sm:text-xl tracking-wider text-neutral-900 block leading-tight">
                  P.B. Consultation
                </span>
                <span className="text-[10px] text-neutral-500 font-mono tracking-widest uppercase block mt-0.5 font-bold">
                  {language === "ne" ? "इन्जिनियरिङ र निर्माण" : "Engineering & Construction"}
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-neutral-700">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-brand-pink transition-colors duration-200 py-1.5 border-b-2 border-transparent hover:border-brand-pink/50"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Block */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Direct Phone Link */}
            <a
              href="tel:+9779841083084"
              className="hidden md:flex items-center gap-2.5 text-xs font-mono text-neutral-600 hover:text-brand-pink transition-colors duration-200"
              id="header-phone-link"
            >
              <div className="w-8.5 h-8.5 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center">
                <Phone className="w-3.5 h-3.5 text-brand-pink" />
              </div>
              <div className="text-left">
                <span className="block text-[9px] text-neutral-400 tracking-normal leading-none mb-0.5">{t("nav.direct_line")}</span>
                <span className="font-bold text-neutral-800 leading-none">9841083084</span>
              </div>
            </a>

            {/* Single Elegant Language Selector on the Right */}
            <div className="flex items-center bg-neutral-100 border border-neutral-200 p-0.5 rounded-md shadow-sm">
              <button
                onClick={() => setLanguage("en")}
                className={`px-2 sm:px-2.5 py-1 text-[10px] font-mono font-bold rounded cursor-pointer transition-all ${
                  language === "en"
                    ? "bg-brand-pink text-white shadow-sm"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("ne")}
                className={`px-2 sm:px-2.5 py-1 text-[10px] font-bold rounded cursor-pointer transition-all ${
                  language === "ne"
                    ? "bg-brand-pink text-white shadow-sm"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                नेपाली
              </button>
            </div>

            {/* Get Free Consultation Button */}
            <button
              onClick={onContactClick}
              className="hidden sm:inline-flex bg-brand-pink hover:bg-brand-pink/90 text-white font-display text-xs font-semibold px-4 sm:px-5 py-2.5 sm:py-3 rounded shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
              id="header-cta"
            >
              {t("nav.free_consultation")}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-neutral-800 hover:text-brand-pink focus:outline-none p-1.5 sm:p-2 bg-neutral-100 rounded border border-neutral-200 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X className="w-5 h-5 text-brand-pink" /> : <Menu className="w-5 h-5 text-neutral-800" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-200 px-4 py-6 space-y-4 shadow-xl" id="mobile-menu-dropdown">
          <nav className="flex flex-col gap-3 text-sm font-semibold uppercase tracking-wider text-neutral-800">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="hover:text-brand-pink py-2.5 border-b border-neutral-100"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-4 flex flex-col gap-3">
            <a
              href="tel:+9779841083084"
              className="flex items-center gap-3 text-xs font-mono text-neutral-700 bg-neutral-50 p-3.5 rounded border border-neutral-200"
            >
              <Phone className="w-4 h-4 text-brand-pink" />
              <span>Call Center: +977 9841083084</span>
            </a>
            <button
              onClick={() => {
                setMobileOpen(false);
                onContactClick();
              }}
              className="w-full bg-brand-pink text-white text-center font-display text-xs font-bold py-3.5 rounded tracking-wider uppercase shadow cursor-pointer"
            >
              {t("nav.free_consultation")}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

