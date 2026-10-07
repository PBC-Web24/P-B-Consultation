export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  feedback: string;
  avatarLetter: string;
}

export interface StageDetail {
  id: "design" | "during" | "after";
  title: string;
  description: string;
  badge: string;
  images: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  client?: string;
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
  stages?: {
    design: StageDetail;
    during: StageDetail;
    after: StageDetail;
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
  nameNe: string;
  badge: string;
  badgeNe: string;
  tagline: string;
  taglineNe: string;
  highlighted: boolean;
  rateLabel: string;
  rateLabelNe: string;
  rateSubtext: string;
  rateSubtextNe: string;
  highlights: string[];
  highlightsNe: string[];
}
