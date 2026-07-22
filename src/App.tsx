import React from "react";
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

export default function App() {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans selection:bg-brand-pink/20 selection:text-brand-pink antialiased">
      {/* 1. Navigation Header */}
      <Navigation onContactClick={scrollToContact} />

      <main>
        {/* 2. Premium Hero */}
        <Hero onContactClick={scrollToContact} />

        {/* 3. Credential Trust Strip */}
        <TrustStrip />

        {/* 4. Complete Building Construction (Primary Business) */}
        <Construction onContactClick={scrollToContact} />

        {/* 5. Professional Supporting Services */}
        <Services />

        {/* 6. Why Choose Us (Corporate Synergy block) */}
        <WhyChooseUs />

        {/* 7. Milestone Process Roadmap */}
        <Process />

        {/* 8. Featured Real Projects in Nepal */}
        <FeaturedProjects />

        {/* 10. Specifications & Construction Packages */}
        <Packages onContactClick={scrollToContact} />

        {/* 11. Conversion-focused Contact Form */}
        <ContactForm />
      </main>

      {/* 12. Corporate Footer & Office Geographies */}
      <Footer />
    </div>
  );
}
