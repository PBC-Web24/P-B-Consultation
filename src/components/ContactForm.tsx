import React, { useState, useEffect } from "react";
import { Phone, Mail, CheckCircle2, Send, Clock, Sparkles, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface ContactFormProps {
  selectedSubject?: string;
}

const RECIPIENT_EMAIL = "info.pbconsultation@gmail.com";

export default function ContactForm({ selectedSubject }: ContactFormProps) {
  const { language } = useLanguage();

  const projectTypes = language === "ne" 
    ? [
        "सामान्य पारिवारिक घर (Residential Home)",
        "प्रिमियम आधुनिक घर / बंगला",
        "व्यावसायिक भवन (Commercial)",
        "नक्सा डिजाइन र नक्सा पास मात्र",
        "इन्टेरियर डिजाइन",
        "मर्मत तथा रेट्रोफिटिङ"
      ]
    : [
        "Standard Family Home",
        "Premium Modern Home / Bungalow",
        "Commercial Building",
        "House Design & Municipality Approval Only",
        "Interior Design",
        "Renovation & Retrofitting"
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
    email: "",
    projectType: projectTypes[0],
    location: nepalLocations[0],
    message: "",
    vastuCompliance: false
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (selectedSubject) {
      setFormData((prev) => ({
        ...prev,
        message: prev.message
          ? prev.message
          : language === "ne"
            ? `म "${selectedSubject}" को बारेमा परामर्श लिन चाहन्छु।`
            : `I would like a consultation regarding: ${selectedSubject}.`
      }));
    }
  }, [selectedSubject, language]);

  useEffect(() => {
    if (!showToast) return;
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 6500);
    return () => clearTimeout(timer);
  }, [showToast]);

  const buildMailtoUrl = () => {
    const subject = `New Consultation & Technical Assessment Request - ${formData.name} (${formData.phone})`;
    const bodyLines = [
      `New Consultation / Technical Assessment Request for P.B. Consultation:`,
      `--------------------------------------------------`,
      `Full Name: ${formData.name}`,
      `Phone Number: ${formData.phone}`,
      `Customer Email: ${formData.email || "Not provided"}`,
      `Project Type: ${formData.projectType}`,
      `Site Location: ${formData.location}`,
      `Vastu Consultation Needed: ${formData.vastuCompliance ? "Yes" : "No"}`,
      `--------------------------------------------------`,
      `Message / Plot Details:`,
      `${formData.message || "No additional message provided."}`
    ];
    return `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setSubmitting(true);

    try {
      // Send directly to info.pbconsultation@gmail.com via FormSubmit AJAX API
      const response = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          _subject: `New Consultation Inquiry from ${formData.name} (${formData.phone})`,
          Full_Name: formData.name,
          Phone_Number: formData.phone,
          Customer_Email: formData.email || "Not provided",
          Project_Type: formData.projectType,
          Site_District: formData.location,
          Vastu_Shastra_Required: formData.vastuCompliance ? "Yes" : "No",
          Inquiry_Topic: selectedSubject || "Free Consultation & Technical Assessment",
          Message_And_Plot_Details: formData.message || "No additional message provided",
          _template: "table",
          _captcha: "false"
        })
      });

      const result = await response.json().catch(() => null);

      // If FormSubmit requires first-time activation or fails, automatically trigger direct mailto link
      if (!response.ok || (result && result.success === "false")) {
        const mailtoLink = document.createElement("a");
        mailtoLink.href = buildMailtoUrl();
        document.body.appendChild(mailtoLink);
        mailtoLink.click();
        document.body.removeChild(mailtoLink);
      }
    } catch {
      // Fallback: open pre-filled email to info.pbconsultation@gmail.com
      const mailtoLink = document.createElement("a");
      mailtoLink.href = buildMailtoUrl();
      document.body.appendChild(mailtoLink);
      mailtoLink.click();
      document.body.removeChild(mailtoLink);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
      setShowToast(true);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      projectType: projectTypes[0],
      location: nepalLocations[0],
      message: "",
      vastuCompliance: false
    });
    setSubmitted(false);
    setShowToast(false);
  };

  return (
    <section className="py-12 bg-[#121214] text-white relative overflow-hidden" id="contact">
      {/* Floating Toast Notification */}
      {showToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 max-w-sm w-[calc(100%-3rem)] bg-neutral-900 border-2 border-brand-gold text-white p-4 rounded-xl shadow-2xl flex items-start gap-3.5 transition-all duration-300"
        >
          <div className="w-9 h-9 rounded-full bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle2 className="w-5 h-5 text-brand-gold" />
          </div>
          <div className="flex-1 text-left">
            <h4 className="text-xs sm:text-sm font-display font-bold text-white">
              {language === "ne" ? "तपाईंको सोधपुछ प्राप्त भयो!" : "Enquiry Received Successfully!"}
            </h4>
            <p className="text-xs text-neutral-300 font-light mt-1 leading-relaxed">
              {language === "ne"
                ? `धन्यवाद ${formData.name}, तपाईंको विवरण हाम्रो इमेलमा पठाइएको छ। हामी चाँडै सम्पर्क गर्नेछौं।`
                : `Thank you ${formData.name}, your details have been sent to our team. We will contact you shortly.`}
            </p>
          </div>
          <button
            onClick={() => setShowToast(false)}
            aria-label="Close notification"
            className="text-neutral-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

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
                  ? "तपाईंको घर निर्माण, नक्सा पास वा लागत अनुमानको लागि हाम्रो टोलीसँग सिधै सम्पर्क गर्नुहोस्। तपाईंको विवरण सिधै हाम्रो आधिकारिक इमेलमा प्राप्त हुनेछ र हामी २४ घण्टा भित्र सम्पर्क गर्नेछौं।"
                  : "Connect directly with our engineering and construction team for a free consultation or technical assessment. Your request is sent directly to our official email and we respond within 24 hours."
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
                href={`mailto:${RECIPIENT_EMAIL}`}
                className="flex items-center gap-4 p-4.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-brand-gold transition-colors"
              >
                <div className="w-11 h-11 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <span className="block text-[10px] text-neutral-400 uppercase tracking-wider font-mono">
                    {language === "ne" ? "इन्जिनियरिङ कार्यालयमा ईमेल गर्नुहोस्" : "EMAIL ENGINEERING OFFICE"}
                  </span>
                  <span className="text-sm font-bold text-white block mt-0.5">{RECIPIENT_EMAIL}</span>
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
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 bg-brand-gold/15 text-brand-gold border-2 border-brand-gold/40 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div className="space-y-2">
                  <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full">
                    {language === "ne" ? "सफलतापूर्वक दर्ता भयो" : "ENQUIRY CONFIRMED"}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                    {language === "ne" ? "तपाईंको परामर्श अनुरोध प्राप्त भयो!" : "We Have Received Your Enquiry!"}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-md mx-auto leading-relaxed">
                    {language === "ne" ? (
                      <>
                        धन्यवाद, <strong className="text-white">{formData.name}</strong>। तपाईंको विवरण हाम्रो आधिकारिक इमेल (<strong className="text-brand-gold">{RECIPIENT_EMAIL}</strong>) मा पठाइएको छ। हाम्रो टोलीले तपाईंलाई चाँडै <strong className="text-white">{formData.phone}</strong> मा सम्पर्क गर्नेछ।
                      </>
                    ) : (
                      <>
                        Thank you, <strong className="text-white">{formData.name}</strong>. Your inquiry has been forwarded directly to <strong className="text-brand-gold">{RECIPIENT_EMAIL}</strong>. Our team will contact you at <strong className="text-white">{formData.phone}</strong> within 24 hours.
                      </>
                    )}
                  </p>
                </div>

                {/* Submitted Summary Box */}
                <div className="max-w-md mx-auto bg-neutral-950/80 border border-neutral-800 rounded-lg p-4 text-left text-xs space-y-1.5 text-neutral-300">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">{language === "ne" ? "नाम:" : "Name:"}</span>
                    <span className="font-semibold text-white">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">{language === "ne" ? "फोन:" : "Phone:"}</span>
                    <span className="font-semibold text-white">{formData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">{language === "ne" ? "प्रकार:" : "Project:"}</span>
                    <span className="text-neutral-200">{formData.projectType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">{language === "ne" ? "स्थान:" : "Location:"}</span>
                    <span className="text-neutral-200">{formData.location}</span>
                  </div>
                </div>

                {/* Direct Email Backup & Reset Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={buildMailtoUrl()}
                    className="inline-flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-brand-gold border border-brand-gold/30 text-xs font-bold uppercase tracking-wider px-5 py-3 rounded shadow transition-all"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{language === "ne" ? "इमेल एपबाट पनि पठाउनुहोस्" : "Also Open in Email App"}</span>
                  </a>
                  <button
                    onClick={handleReset}
                    className="bg-brand-pink hover:bg-brand-pink/90 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded shadow transition-all cursor-pointer"
                  >
                    {language === "ne" ? "अर्को सोधपुछ पठाउनुहोस्" : "Send Another Inquiry"}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="pb-3 border-b border-neutral-800">
                  <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-gold" />
                    {language === "ne" 
                      ? "निःशुल्क परामर्श तथा प्राविधिक मूल्याङ्कन फारम" 
                      : "Free Consultation & Technical Assessment Request"}
                  </h3>
                  <p className="text-xs text-neutral-400 font-light mt-1">
                    {language === "ne"
                      ? `तलको विवरण भर्नुहोस्—यो सिधै हाम्रो इमेल (${RECIPIENT_EMAIL}) मा आउनेछ।`
                      : `Fill in your details below—your request is sent directly to our email (${RECIPIENT_EMAIL}).`
                    }
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                      placeholder={language === "ne" ? "जस्तै: ९८४१XXXXXX" : "e.g., 9841XXXXXX"}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-brand-gold focus:outline-none p-3.5 text-xs rounded text-white transition-colors"
                    />
                  </div>
                </div>

                {/* Optional Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email-input" className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold">
                    {language === "ne" ? "तपाईंको इमेल ठेगाना (ऐच्छिक)" : "Your Email Address (Optional)"}
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    placeholder={language === "ne" ? "जस्तै: name@example.com" : "e.g., yourname@gmail.com"}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-brand-gold focus:outline-none p-3.5 text-xs rounded text-white transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Project Type */}
                  <div className="space-y-1.5">
                    <label htmlFor="project-type-select" className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold">
                      {language === "ne" ? "कस्तो घर वा काम बनाउने?" : "Project Type"}
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
                      {language === "ne" ? "जग्गा भएको स्थान" : "Proposed Site Location"}
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
                      ? "मलाई मेरो घरमा वास्तु शास्त्र (Vastu Shastra) अनुसार कोठाहरूको दिशा मिलाउने सल्लाह चाहिन्छ"
                      : "I would like Vastu Shastra consultation & room orientation guidance for my home"
                    }
                  </label>
                </div>

                {/* Message / Site Details */}
                <div className="space-y-1.5">
                  <label htmlFor="message-textarea" className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold">
                    {language === "ne" ? "सामान्य विवरण वा प्रश्नहरू" : "Brief Details or Questions"}
                  </label>
                  <textarea
                    id="message-textarea"
                    rows={3}
                    placeholder={language === "ne" 
                      ? "तपाईंको जग्गाको क्षेत्रफल (जस्तै: ४ आना, ६ आना), कति तल्लाको घर बनाउने सोच छ, वा अन्य केही जिज्ञासा भए लेख्नुहोस्..."
                      : "Share your land size (e.g., 4 Aana, 6 Aana), how many floors you are planning, or any questions you have..."
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
                      <span>{language === "ne" ? "इमेलमा पठाइँदैछ..." : "Sending Request to Email..."}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{language === "ne" ? "परामर्शको लागि इमेलमा पठाउनुहोस्" : "Send Consultation Request to Email"}</span>
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
