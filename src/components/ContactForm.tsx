import React, { useState } from "react";
import { Phone, Mail, CheckCircle2, Send, Clock, Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function ContactForm() {
  const { language } = useLanguage();

  const projectTypes = language === "ne" 
    ? [
        "आवासीय घरहरू",
        "प्रिमियम बंगलाहरू",
        "व्यावसायिक भवनहरू",
        "सरकारी/शैक्षिक भवनहरू",
        "इन्टेरियर डिजाइन",
        "रचनात्मक सुधार/Retrofitting"
      ]
    : [
        "Residential Homes",
        "Premium Residences",
        "Commercial Buildings",
        "Institutional Buildings",
        "Interior Projects",
        "Ongoing Construction"
      ];

  const nepalLocations = language === "ne"
    ? [
        "काठमाडौं उपत्यका",
        "पोखरा",
        "ललितपुर",
        "भक्तपुर",
        "चितवन",
        "बुटवल",
        "धरान",
        "अन्य जिल्लाहरू"
      ]
    : [
        "Kathmandu Valley",
        "Pokhara",
        "Lalitpur",
        "Bhaktapur",
        "Chitwan",
        "Butwal",
        "Dharan",
        "Other Districts"
      ];

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    projectType: projectTypes[0],
    location: nepalLocations[0],
    message: "",
    vastuCompliance: false
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setSubmitting(true);
    // Simulate short network transmission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      projectType: projectTypes[0],
      location: nepalLocations[0],
      message: ""
    });
    setSubmitted(false);
  };

  return (
    <section className="py-12 bg-[#121214] text-white relative overflow-hidden" id="contact">
      {/* Decorative Blueprint Backdrop */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(197, 168, 80, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(197, 168, 80, 0.1) 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Contact Left Column: Quick Contacts and Corporate Info */}
          <div className="lg:col-span-5 space-y-8" id="contact-info">
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-brand-gold uppercase tracking-widest bg-brand-gold/10 border border-brand-gold/20 px-3.5 py-1.5 rounded-full">
                {language === "ne" ? "सम्पर्क माध्यमहरू" : "DIRECT CHANNELS"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
                {language === "ne" ? "हामीसँग सिधै कुराकानी गर्नुहोस्" : "Start an Honest Conversation"}
              </h2>
              <p className="text-neutral-400 text-sm font-light leading-relaxed">
                {language === "ne"
                  ? "हाम्रा वरिष्ठ स्ट्रक्चरल इन्जिनियरहरू र निर्माण व्यवस्थापन टोलीसँग सिधै सम्पर्क गर्नुहोस्। हामी डिजिटल सोधपुछको २४ घण्टा भित्र सम्पर्क गर्नेछौं।"
                  : "Connect directly with our senior structural engineers and construction logistics division. We respond to digital inquiries within 24 business hours."
                }
              </p>
            </div>

            <div className="space-y-6 pt-2">
              {/* Phone Line */}
              <a
                href="tel:+9779841083084"
                className="flex items-center gap-4 p-4.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-brand-gold transition-colors"
              >
                <div className="w-11 h-11 rounded-full bg-brand-pink/10 border border-brand-pink/20 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-brand-pink" />
                </div>
                <div>
                  <span className="block text-[10px] text-neutral-400 uppercase tracking-wider font-mono">
                    {language === "ne" ? "मुख्य कार्यालयमा फोन गर्नुहोस्" : "CALL OUR HEAD OFFICE"}
                  </span>
                  <span className="text-sm font-bold text-white block mt-0.5">9841083084</span>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:info.pbconsultation@gmail.com"
                className="flex items-center gap-4 p-4.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-brand-gold transition-colors"
              >
                <div className="w-11 h-11 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <span className="block text-[10px] text-neutral-400 uppercase tracking-wider font-mono">
                    {language === "ne" ? "इन्जिनियरिङ कार्यालयमा ईमेल गर्नुहोस्" : "EMAIL ENGINEERING OFFICE"}
                  </span>
                  <span className="text-sm font-bold text-white block mt-0.5">info.pbconsultation@gmail.com</span>
                </div>
              </a>
            </div>

            <div className="p-4 bg-neutral-900/60 rounded border border-neutral-800 text-xs text-neutral-400 font-light space-y-2">
              <div className="flex items-center gap-1.5 font-semibold text-white">
                <Clock className="w-3.5 h-3.5 text-brand-gold" />
                <span>{language === "ne" ? "कार्यालय समय:" : "Office Working Hours:"}</span>
              </div>
              <p>
                {language === "ne" ? (
                  <>
                    आइतबार देखि शुक्रबार: बिहान १०:०० बजे देखि बेलुका ६:०० बजे सम्म (NPT) <br />
                    शनिबार: बन्द (साइट निरीक्षण मात्र)
                  </>
                ) : (
                  <>
                    Sunday to Friday: 10:00 AM – 6:00 PM (NPT)<br />
                    Saturday: Closed (Site inspections only)
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Contact Right Column: Elegant Capture Form */}
          <div className="lg:col-span-7 bg-neutral-900/80 backdrop-blur-sm rounded-xl border border-neutral-800 p-8 shadow-2xl relative" id="contact-form-block">
            
            {submitted ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 bg-brand-pink/15 text-brand-pink border-2 border-brand-pink/30 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-display font-bold text-white">
                    {language === "ne" ? "परामर्शको अनुरोध प्राप्त भयो" : "Consultation Request Received"}
                  </h3>
                  <p className="text-xs text-neutral-400 font-light max-w-md mx-auto leading-relaxed">
                    {language === "ne" ? (
                      <>
                        धन्यवाद, <strong className="text-white">{formData.name}</strong>। हामीले तपाईंको अनुरोध दर्ता गरेका छौं। हाम्रा वरिष्ठ इन्जिनियरहरूले यसको अध्ययन गर्नेछन् र हामी तपाईंलाई चाँडै <strong className="text-white">{formData.phone}</strong> मा सम्पर्क गर्नेछौं।
                      </>
                    ) : (
                      <>
                        Thank you, <strong className="text-white">{formData.name}</strong>. Our senior civil engineering division has logged your request. We will contact you at <strong className="text-white">{formData.phone}</strong> within 24 hours to schedule a detailed session.
                      </>
                    )}
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="bg-brand-pink hover:bg-brand-pink/90 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded shadow transition-all cursor-pointer"
                >
                  {language === "ne" ? "अर्को सोधपुछ पठाउनुहोस्" : "Send Another Inquiry"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="pb-3 border-b border-neutral-800">
                  <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-gold" />
                    {language === "ne" ? "निशुल्क प्राविधिक मूल्याङ्कन" : "Technical Assessment Request"}
                  </h3>
                  <p className="text-xs text-neutral-400 font-light mt-1">
                    {language === "ne"
                      ? "तपाईंको विवरणहरू तल भर्नुहोस्। तपाईंको विवरण पूर्ण रूपमा सुरक्षित र गोप्य रहनेछ।"
                      : "Fill in your details below. No fields are sold to third parties. Complete data confidentiality."
                    }
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="name-input" className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold">
                      {language === "ne" ? "पूरा नाम *" : "Full Name *"}
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      required
                      placeholder={language === "ne" ? "जस्तै: रमेश श्रेष्ठ" : "e.g., Ramesh Shrestha"}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-brand-gold focus:outline-none p-3.5 text-xs rounded text-white transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone-input" className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold">
                      {language === "ne" ? "सम्पर्क फोन नम्बर *" : "Contact Phone *"}
                    </label>
                    <input
                      id="phone-input"
                      type="tel"
                      required
                      placeholder={language === "ne" ? "जस्तै: +९७७ ९८५१०XXXXX" : "e.g., +977 9851XXXXXX"}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-brand-gold focus:outline-none p-3.5 text-xs rounded text-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Project Type */}
                  <div className="space-y-1.5">
                    <label htmlFor="project-type-select" className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold">
                      {language === "ne" ? "योजनाको प्रकार" : "Project Type"}
                    </label>
                    <select
                      id="project-type-select"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-brand-gold focus:outline-none p-3.5 text-xs rounded text-white transition-colors cursor-pointer"
                    >
                      {projectTypes.map((type) => (
                        <option key={type} value={type} className="bg-neutral-900">{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* District Location */}
                  <div className="space-y-1.5">
                    <label htmlFor="location-select" className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold">
                      {language === "ne" ? "प्रस्तावित निर्माण स्थान" : "Proposed Site District"}
                    </label>
                    <select
                      id="location-select"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-brand-gold focus:outline-none p-3.5 text-xs rounded text-white transition-colors cursor-pointer"
                    >
                      {nepalLocations.map((loc) => (
                        <option key={loc} value={loc} className="bg-neutral-900">{loc}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Vastu Shastra Alignment Toggle */}
                <div className="flex items-center gap-3.5 p-3.5 bg-neutral-950/60 rounded border border-neutral-800 hover:border-brand-gold transition-colors">
                  <input
                    id="vastu-checkbox"
                    type="checkbox"
                    checked={formData.vastuCompliance}
                    onChange={(e) => setFormData({ ...formData, vastuCompliance: e.target.checked })}
                    className="w-4 h-4 text-brand-pink bg-neutral-900 border-neutral-800 rounded focus:ring-brand-pink cursor-pointer accent-brand-pink"
                  />
                  <label htmlFor="vastu-checkbox" className="text-xs text-neutral-300 font-light cursor-pointer select-none">
                    {language === "ne"
                      ? "मलाई मेरो घरमा पूर्ण वास्तु शास्त्र (Vastu Shastra) अनुकूलता र कोठाहरूको दिशा मिलाउने परामर्श चाहिन्छ"
                      : "I require Vastu Shastra integration & spatial alignment for my property"
                    }
                  </label>
                </div>

                {/* Message / Site Details */}
                <div className="space-y-1.5">
                  <label htmlFor="message-textarea" className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold">
                    {language === "ne" ? "विस्तृत सन्देश र जग्गाको विवरण" : "Detailed Message & Plot Parameters"}
                  </label>
                  <textarea
                    id="message-textarea"
                    rows={4}
                    placeholder={language === "ne" 
                      ? "तपाईंको जग्गाको क्षेत्रफल (जस्तै: ४ आना, ८ आना), तल्लाको संख्या, वा कुनै विशेष प्राविधिक विवरण खुलाउनुहोस्..."
                      : "Describe your plot size (e.g., 4 Aana, 8 Aana), expected storeys, or technical parameters you need us to address..."
                    }
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-brand-gold focus:outline-none p-3.5 text-xs rounded text-white transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-brand-pink hover:bg-brand-pink/90 text-white text-xs font-bold uppercase tracking-wider py-4.5 rounded shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{language === "ne" ? "दर्ता हुँदैछ..." : "Transmitting Log..."}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{language === "ne" ? "निशुल्क प्राविधिक मूल्याङ्कन दर्ता गर्नुहोस्" : "Submit Secure Assessment Inquiry"}</span>
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
