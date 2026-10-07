import React, { useState } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import TrustStrip from "./components/TrustStrip";
import Construction from "./components/Construction";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import Process from "./components/Process";
import FeaturedProjects from "./components/FeaturedProjects";
import Packages from "./components/Packages";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import AIChatbot from "./components/AIChatbot";

export default function App() {
  const [selectedSubject, setSelectedSubject] = useState<string>("");

  const scrollToContact = (subject?: string) => {
    if (typeof subject === "string" && subject) {
      setSelectedSubject(subject);
    }
    const formBlock = document.getElementById("contact-form-block") || document.getElementById("contact");
    if (formBlock) {
      formBlock.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        const nameInput = document.getElementById("name-input");
        if (nameInput) {
          nameInput.focus();
        }
      }, 600);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans selection:bg-brand-pink/20 selection:text-brand-pink antialiased">
      {/* 1. Navigation Header */}
      <Navigation onContactClick={() => scrollToContact("Free Consultation Request")} />

      <main>
        {/* 2. Premium Hero */}
        <Hero onContactClick={() => scrollToContact("Free Consultation Request")} />

        {/* 3. Credential Trust Strip */}
        <TrustStrip />

        {/* 4. Complete Building Construction (Primary Business) */}
        <Construction onContactClick={() => scrollToContact("Turnkey Construction Estimate")} />

        {/* 5. Professional Supporting Services */}
        <Services />

        {/* 6. Why Choose Us (Corporate Synergy block) */}
        <WhyChooseUs />

        {/* 7. Milestone Process Roadmap */}
        <Process />

        {/* 8. Featured Real Projects in Nepal */}
        <FeaturedProjects />

        {/* 10. Specifications & Construction Packages */}
        <Packages onContactClick={(pkgName) => scrollToContact(pkgName)} />

        {/* 11. Conversion-focused Contact Form */}
        <ContactForm selectedSubject={selectedSubject} />
      </main>

      {/* 12. Corporate Footer & Office Geographies */}
      <Footer />

      {/* 13. Gemini AI Engineering Assistant (Chat, Google Search & Google Maps Grounding) */}
      <AIChatbot onContactClick={scrollToContact} />
    </div>
  );
}
