export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  feedback: string;
  avatarLetter: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  location: string;
  status: "Completed" | "Structure Stage" | "Finishing Stage";
  builtUpArea: string;
  landArea: string;
  engineeringFocus: string;
  features: string[];
  specs: {
    cement: string;
    steel: string;
    concreteGrade: string;
  };
  testimonial?: {
    text: string;
    author: string;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string; // lucide icon identifier
  badge?: string;
  tagline: string;
}

export interface ConstructionPackage {
  id: string;
  name: string;
  tagline: string;
  highlighted: boolean;
  rateLabel: string;
  materials: {
    steel: string;
    cement: string;
    bricks: string;
    sandAggr: string;
  };
  finishes: {
    flooring: string;
    doorsWindows: string;
    plumbing: string;
    electrical: string;
    painting: string;
  };
  engineeringAssurance: string[];
}
