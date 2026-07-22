import { Project, ServiceItem, ConstructionPackage, Testimonial } from "./types";

export const FEATURED_PROJECTS: Project[] = [
  {
    id: "balaram",
    title: "Project Dhapasi Height, Tokha",
    category: "Premium Residences",
    client: "Homeowner",
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
    }
  },
  {
    id: "shanta",
    title: "Project Bafal, Nagarjun",
    category: "Residential Homes",
    client: "Homeowner",
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
    }
  },
  {
    id: "ganesh",
    title: "Project Khasibazar Kalanki, KMC",
    category: "Residential Homes",
    client: "Homeowner",
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
    name: "Executive Construction Package",
    tagline: "Complete engineering excellence and certified high-quality materials for standard luxury residential homes.",
    highlighted: false,
    rateLabel: "Quoted upon Detailed BOQ Calculation",
    materials: {
      steel: "Fe 500D High-Ductility (Ambe, Jagadamba, or Laxmi)",
      cement: "Shivam or Jagadamba OPC (53 Grade for structural, PPC for finishing)",
      bricks: "Machine-made red clay bricks (First Class)",
      sandAggr: "Washed river sand and crushed blue metal aggregate (20mm)"
    },
    finishes: {
      flooring: "Double charged vitrified tile in bedrooms; local granite on stairs",
      doorsWindows: "Sal wood door frames with flush shutters; UPVC window profiles",
      plumbing: "CPVC water pipes (Astral); sanitaryware from Cera or Hindware",
      electrical: "Fire-retardant copper wiring (Havells); modular switches",
      painting: "Asian Paints Apex Weatherproof exterior; Acrylic emulsion interior"
    },
    engineeringAssurance: [
      "Complete 3D Architectural walkthrough and 2D spatial layouts",
      "Full NBC-105 compliant structural drawings signed by certified Er.",
      "e-BPS municipal file processing and permit clearance liaison",
      "On-site concrete slump testing and cylinder test lab reports",
      "Weekly photolog progress delivery for owners residing abroad"
    ]
  },
  {
    id: "premium",
    name: "Premium Luxury Specification",
    tagline: "Superlative structural materials, bespoke architectural detailings, and ultra-premium imported finishes.",
    highlighted: true,
    rateLabel: "Quoted upon Detailed BOQ Calculation",
    materials: {
      steel: "Fe 500D Premium High-Ductility Corrosion-Resistant",
      cement: "Shivam Premium OPC (53 Grade throughout all RCC casting)",
      bricks: "High-compressive factory-baked bricks or interlocking concrete blocks",
      sandAggr: "Triple-screened fine sand and premium double-crushed basalt aggregates"
    },
    finishes: {
      flooring: "Premium Italian marble in living rooms; engineered wood in master bedrooms",
      doorsWindows: "Solid teak wood premium doors; high-grade soundproof double-glazed UPVC/Alum",
      plumbing: "Concealed flushing systems (Geberit); premium sanitaryware (Kohler/Jaquar)",
      electrical: "Smart automation ready, flame-retardant multi-strand copper wires, premium indicators",
      painting: "Asian Paints Royale luxury emulsion; advanced silicone exterior shield"
    },
    engineeringAssurance: [
      "Continuous site supervision by a senior civil engineer with 10+ years experience",
      "Dynamic earthquake response structural modeling on specialized software",
      "Full mechanical, electrical, plumbing (MEP) integrated engineering drawings",
      "Independent testing of structural steel and soil bearing capacity",
      "Advanced seepage-proofing tanking membrane in basement and wet areas",
      "3-year comprehensive structural warranty card backed by Prakash Nirman Sewa"
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
