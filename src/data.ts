import { Project, ServiceItem, ConstructionPackage, Testimonial } from "./types";

export const FEATURED_PROJECTS: Project[] = [
  {
    id: "balaram",
    title: "Project Dhapasi Height, Tokha",
    category: "Premium Residences",
    location: "Tokha, Kathmandu",
    status: "Completed",
    builtUpArea: "4,200 Sq. Ft.",
    landArea: "12 Aana",
    engineeringFocus: "Advanced soil-structure interaction, dual system design with RC shear walls + moment-resisting frames for ultimate earthquake resilience in deep Kathmandu valley soil.",
    features: [
      "Rigid shear wall seismic design (NBC-105 compliant)",
      "Traditional brick veneer exterior detailing",
      "Soundproofing double glazed low-E glass windows"
    ],
    specs: {
      cement: "OPC 53 Grade (Jagadamba)",
      steel: "Fe 500D High-Ductility (Ambe)",
      concreteGrade: "M25 (Foundations & Columns)"
    },
    testimonial: {
      text: "P.B. Consultation made our municipal permit approval seamless. Their high structural standards gave our family absolute safety confidence.",
      author: "Verified Client"
    },
    stages: {
      design: {
        id: "design",
        title: "1. Architectural & Structural Design Stage",
        description: "Complete 2D floor plans, 3D photorealistic exterior walkthrough, NBC-105 seismic analysis, and e-BPS municipal approval approval file.",
        badge: "Architectural Blueprint",
        images: ["kavresthali_ext_3d_1785048964141.jpg"]
      },
      during: {
        id: "during",
        title: "2. During Construction (Structural Execution)",
        description: "Excavation, foundation tie-beams, Fe 500D steel rebar tying, and M25 grade continuous concrete pour supervised by licensed civil engineers.",
        badge: "On-Site Supervision",
        images: ["kavresthali_cad_stairbar_1785049283641.jpg"]
      },
      after: {
        id: "after",
        title: "3. After Construction (Finished Handover)",
        description: "Weatherproof exterior acrylic coating, double-glazed soundproof UPVC window profiles, luxury interior joinery, and structural warranty card.",
        badge: "Completed Handover",
        images: ["kavresthali_living_3d_1785049004226.jpg", "kavresthali_kitchen_3d_1785049098507.jpg"]
      }
    }
  },
  {
    id: "shanta",
    title: "Project Bafal, Nagarjun",
    category: "Residential Homes",
    location: "Nagarjun, Kathmandu",
    status: "Structure Stage",
    builtUpArea: "3,850 Sq. Ft.",
    landArea: "5.5 Aana",
    engineeringFocus: "Deep basement retaining wall calculations, contiguous pile integration, and specialized structural detailing for safe vertical excavation on narrow plots.",
    features: [
      "Deep basement excavation with micro-piling",
      "Seepage-proof tanking waterproofing system",
      "Precision structural framing alignment"
    ],
    specs: {
      cement: "OPC 53 Grade (Shivam)",
      steel: "Fe 500D TMT (Shaurya)",
      concreteGrade: "M25 (Continuous Pour)"
    },
    testimonial: {
      text: "The team's daily on-site supervision and concrete cube tests during foundation pouring show they do not cut corners. Outstanding engineering.",
      author: "Verified Client"
    },
    stages: {
      design: {
        id: "design",
        title: "1. Architectural & Structural Design Stage",
        description: "Micro-piling calculations, retaining wall structural models, 3D elevations, and complete Vastu orientation plans.",
        badge: "Approved Plans",
        images: ["kavresthali_cad_kitchen_1785049259393.jpg"]
      },
      during: {
        id: "during",
        title: "2. During Construction (Structural Progress)",
        description: "Contiguous piling, basement waterproofing membrane installation, column rebar cages, and M25 concrete casting.",
        badge: "Active Framing",
        images: ["kavresthali_cad_stairbar_1785049283641.jpg"]
      },
      after: {
        id: "after",
        title: "3. After Construction (Finishing Target)",
        description: "Planned high-grade exterior plastering, custom wood door frames, and modern energy-efficient light fittings.",
        badge: "Upcoming Finishing",
        images: ["kavresthali_bedroom_3d_1785048984497.jpg"]
      }
    }
  },
  {
    id: "ganesh",
    title: "Project Khasibazar Kalanki, KMC",
    category: "Residential Homes",
    location: "Kalanki, Kathmandu",
    status: "Finishing Stage",
    builtUpArea: "5,100 Sq. Ft.",
    landArea: "8 Aana",
    engineeringFocus: "Exterior rain envelope protection, structural frame analysis, and bespoke spatial layout optimization for heavy monsoon environments.",
    features: [
      "Heavy-duty clay brick exterior envelope",
      "Optimized natural light and ventilation flow",
      "Premium local granite stairs & flooring"
    ],
    specs: {
      cement: "OPC 53 Grade for frame, PPC for masonry",
      steel: "Fe 500D High-Ductility (Laxmi)",
      concreteGrade: "M20 (High strength mix)"
    },
    testimonial: {
      text: "Having a team that coordinates design directly with site execution crews made our construction stress-free. Very professional management.",
      author: "Verified Client"
    },
    stages: {
      design: {
        id: "design",
        title: "1. Architectural & Structural Design Stage",
        description: "Climatic monsoon envelope design, multi-floor residential layout, and 3D architectural facade renders.",
        badge: "Architectural Design",
        images: ["kavresthali_kitchen_3d_1785049098507.jpg"]
      },
      during: {
        id: "during",
        title: "2. During Construction (Structural Execution)",
        description: "Precision brick masonry, lintel casting, plumbing concealments, and roof slab water testing.",
        badge: "Finishing Stage",
        images: ["kavresthali_cad_kitchen_1785049259393.jpg"]
      },
      after: {
        id: "after",
        title: "3. After Construction (Final Finishes)",
        description: "Granite staircases, Asian Paints Apex Weatherproof paint, and custom interior cabinetry.",
        badge: "Near Completion",
        images: ["kavresthali_living_3d_1785049004226.jpg"]
      }
    }
  },
  {
    id: "kavresthali",
    title: "Project Kavresthali, Tarakeshwor",
    category: "Residential Homes",
    location: "Tarakeshwor, Kathmandu",
    status: "Completed",
    builtUpArea: "3,842 Sq. Ft.",
    landArea: "7 Aana Plot",
    engineeringFocus: "Engineering-led residential construction situated on a 7 Aana sloping plot in Kavresthali, Tarakeshwor. Designed with deep foundation tie-beams, reinforced concrete retaining walls to resist hill-slope soil pressures, and a ductile moment-resisting RC frame adhering to NBC-105 earthquake codes. Incorporates North-East Vastu orientations.",
    features: [
      "NBC-105 compliant earthquake-resilient frame design",
      "Retaining walls for hill-slope soil stability",
      "North-East Vastu layout with optimal solar light"
    ],
    specs: {
      cement: "OPC 53 Grade (Shivam)",
      steel: "Fe 500D High-Ductility (Ambe)",
      concreteGrade: "M25 (Foundations & Columns)"
    },
    testimonial: {
      text: "P.B. Consultation's structural design for our Kavresthali plot solved the hill-slope soil challenge seamlessly. Exceptional civil engineering.",
      author: "Verified Client"
    },
    stages: {
      design: {
        id: "design",
        title: "1. Conceptual Design & CAD Planning Stage",
        description: "Conceptual 3D CAD dimensional models with exact room clearances (kitchen cabinet & island measurements, under-stair mini-bar layout, wardrobe & bedroom spatial plans), photorealistic 3D interior & exterior renders, NBC-105 seismic structural modeling, Vastu spatial orientation, and municipal e-BPS permit files.",
        badge: "CAD & 3D Renders",
        images: [
          "kavresthali_cad_kitchen_1785049259393.jpg",
          "kavresthali_cad_stairbar_1785049283641.jpg",
          "kavresthali_ext_3d_1785048964141.jpg",
          "kavresthali_bedroom_3d_1785048984497.jpg",
          "kavresthali_living_3d_1785049004226.jpg",
          "kavresthali_kitchen_3d_1785049098507.jpg"
        ]
      },
      during: {
        id: "during",
        title: "2. During Construction (2D Structural CAD & Framing)",
        description: "Exact 2D CAD architectural measurements, under-stair mini-bar framing plans, foundation engineering tie-beam calculations, and structural detailing.",
        badge: "2D CAD Plans",
        images: [
          "kavresthali_cad_kitchen_1785049259393.jpg",
          "kavresthali_cad_stairbar_1785049283641.jpg"
        ]
      },
      after: {
        id: "after",
        title: "3. After Construction (Final Finished Renders & Handover)",
        description: "3D architectural elevation design vision, weatherproof exterior finish, customized interior layouts, UPVC double-glazed windows, and final client handover with structural warranty.",
        badge: "Completed Handover",
        images: [
          "kavresthali_ext_3d_1785048964141.jpg",
          "kavresthali_living_3d_1785049004226.jpg",
          "kavresthali_bedroom_3d_1785048984497.jpg",
          "kavresthali_kitchen_3d_1785049098507.jpg"
        ]
      }
    }
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "arch",
    title: "Architectural Design",
    description: "Bespoke, climate-responsive layouts optimized for ventilation and natural light, honoring Nepal's modern lifestyle and strict local setback guidelines.",
    iconName: "Ruler",
    tagline: "Integrated Design"
  },
  {
    id: "struct",
    title: "Structural Design",
    description: "Seismic engineering compliant with the National Building Code (NBC-105). Includes finite-element dynamic analysis and safe column-beam ductile detailing.",
    iconName: "Shield",
    tagline: "NBC Compliant"
  },
  {
    id: "bps",
    title: "Municipality Approval (e-BPS)",
    description: "End-to-end processing and complete structural submission documentation for e-BPS municipal clearance, preventing long delays.",
    iconName: "FileText",
    badge: "Available within Kathmandu Valley only.",
    tagline: "Licensed Submission"
  },
  {
    id: "interior",
    title: "Premium Interior Design",
    description: "High-end indoor space planning, lighting designs, acoustic layouts, custom cabinetry, and bespoke wood and stone joinery.",
    iconName: "Sparkles",
    tagline: "Bespoke Finishes"
  },
  {
    id: "retro",
    title: "Renovation & Retrofitting",
    description: "Structural retrofitting and structural strengthening designs to upgrade existing buildings to modern earthquake resistance.",
    iconName: "Building",
    tagline: "Structural Strengthening"
  },
  {
    id: "supervision",
    title: "Construction Supervision",
    description: "Rigorous checklist-driven milestone inspections covering foundation steel layout, frame alignment, and raw concrete pours.",
    iconName: "Clock",
    tagline: "Engineering Assurance"
  }
];

export const PACKAGES: ConstructionPackage[] = [
  {
    id: "executive",
    name: "Standard Family Home",
    nameNe: "सामान्य पारिवारिक घर (Standard Home)",
    badge: "EVERYDAY FAMILY COMFORT",
    badgeNe: "पारिवारिक आवास",
    tagline: "A safe, comfortable, and budget-friendly home built with reliable materials—ideal for everyday family living.",
    taglineNe: "भरपर्दो सामग्री र सुलभ बजेटमा बलियो, सुरक्षित र आरामदायी पारिवारिक घर बनाउनका लागि उपयुक्त।",
    highlighted: false,
    rateLabel: "Customized to Your Budget & House Design",
    rateLabelNe: "तपाईंको बजेट र घरको नक्सा अनुसार लचिलो मूल्य",
    rateSubtext: "We sit down with you, understand your family's needs, and prepare a clear, honest estimate.",
    rateSubtextNe: "हामी तपाईंको आवश्यकता बुझेर प्रत्यक्ष सल्लाह पछि स्पष्ट र पारदर्शी लागत तय गर्छौं।",
    highlights: [
      "Strong, earthquake-safe house structure built with trusted Nepal Standard (NS) materials",
      "Complete 2D room layout & 3D exterior design with Vastu-friendly planning",
      "Full support with municipality paperwork and house permit approval",
      "Neat, easy-to-clean floor tiles, durable wooden doors, and bright UPVC windows",
      "Safe electrical wiring, reliable leak-proof plumbing, and weather-resistant wall paint",
      "Freedom to choose colors, tiles, and bathroom fittings according to your family's taste",
      "Regular site supervision by our experienced team with weekly photo & video updates"
    ],
    highlightsNe: [
      "नेपाल गुणस्तर (NS) प्रमाणित भरपर्दो सामग्रीबाट बलियो र भूकम्प प्रतिरोधी घर निर्माण",
      "वास्तु मिलाएर कोठाहरूको २D नक्सा र घरको आकर्षक ३D बाहिरी डिजाइन",
      "नगरपालिकामा नक्सा पास प्रक्रिया र कागजी काममा पूर्ण सहयोग",
      "कोठाहरूमा सफा टायल, सिँढीमा बलियो ग्रेनाइट, काठका ढोका र उज्यालो UPVC झ्याल",
      "सुरक्षित वाइरिङ, पानी नचुहिने बलियो प्लम्बिङ र घाम-पानी थेग्ने टिकाउ रङरोगन",
      "तपाईंको आफ्नै रोजाइ अनुसार रङ, टायल र बाथरुमका सामान छान्ने सुविधा",
      "हाम्रो अनुभवी टोलीद्वारा नियमित रेखदेख र घर बन्दै गर्दाको साप्ताहिक फोटो/भिडियो अपडेट"
    ]
  },
  {
    id: "premium",
    name: "Premium Modern Home",
    nameNe: "प्रिमियम आधुनिक घर (Premium Home)",
    badge: "UPGRADED MODERN LIVING",
    badgeNe: "आधुनिक र विशेष सुविधा",
    tagline: "Designed for modern bungalows and upgraded residences with spacious layouts, finer finishes, and extra personal care.",
    taglineNe: "आकर्षक आधुनिक डिजाइन, फराकिलो कोठाहरू, उच्च स्तरको फिनिसिङ र विशेष सुविधा खोज्ने परिवारको लागि उपयुक्त।",
    highlighted: true,
    rateLabel: "Tailored to Your Custom Design & Material Choice",
    rateLabelNe: "तपाईंको विशेष डिजाइन र सामग्रीको रोजाइ अनुसार",
    rateSubtext: "Planned around your lifestyle preferences with complete transparency and no hidden costs.",
    rateSubtextNe: "कुनै लुकेको शुल्क बिना तपाईंको जीवनशैली र चाहना अनुसार स्पष्ट लागत योजना।",
    highlights: [
      "Extra-durable earthquake-safe construction with top-grade steel and premium cement",
      "Custom 3D exterior & interior space design tailored to your family's lifestyle",
      "End-to-end Vastu consultation and complete municipality permit management",
      "Upgraded marble, granite, or warm wooden parquet flooring across living spaces",
      "Seasoned hardwood doors and sound-reducing windows for a quiet, peaceful home",
      "Complete waterproofing in bathrooms, terrace, and ground floor to prevent dampness",
      "Dedicated senior engineer supervision plus a 3-Year written peace-of-mind warranty"
    ],
    highlightsNe: [
      "उच्च गुणस्तरको डन्डी र सिमेन्ट प्रयोग गरी अतिरिक्त मजबुत भूकम्प प्रतिरोधी निर्माण",
      "तपाईंको परिवारको जीवनशैली सुहाउँदो विशेष ३D बाहिरी र भित्री (Interior) डिजाइन",
      "पूर्ण वास्तु परामर्श र नगरपालिका नक्सा पासको सम्पूर्ण सहजीकरण",
      "बैठक र कोठाहरूमा आकर्षक मार्बल, ग्रेनाइट वा न्यानो काठको पार्केटिङ विकल्प",
      "सिजनिङ गरेको साल/टिक काठका ढोका र बाहिरी आवाज कम गर्ने झ्यालहरू",
      "बाथरुम, कौसी र जगमा ओसिलोपन र पानी चुहावट रोक्ने विशेष वाटरप्रुफिङ प्रविधि",
      "सिनियर इन्जिनियरको प्रत्यक्ष रेखदेख र प्रकाश निर्माण सेवाको ३ वर्षे लिखित वारेन्टी"
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Mr. Balaram Khatiwada",
    role: "Property Owner",
    location: "Baluwatar, Kathmandu",
    feedback: "The e-BPS permit process in Kathmandu KMC was extremely complex. P.B. Consultation handled the entire legal file and presented structural computations that gave my family absolute safety confidence.",
    avatarLetter: "B"
  },
  {
    id: "2",
    name: "Mrs. Shanta Poudel",
    role: "Homeowner",
    location: "Jhamsikhel, Lalitpur",
    feedback: "Their sister division Prakash Nirman Sewa has built over 30 years. When they poured our foundation, they performed concrete cube tests and monitored steel spacing on-site every day. No corners were cut.",
    avatarLetter: "S"
  },
  {
    id: "3",
    name: "Mr. Ganesh Prasad Aryal",
    role: "Commercial & Residential Owner",
    location: "New Road, Pokhara",
    feedback: "Having a team that integrates structural calculations and on-site physical masonry made our Pokhara build totally stress-free. The dampness-protection design was flawless for Pokhara's climate.",
    avatarLetter: "G"
  }
];
