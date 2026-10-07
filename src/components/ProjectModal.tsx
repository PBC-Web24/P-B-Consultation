import React, { useState, useEffect } from "react";
import { Project, StageDetail } from "../types";
import { X, MapPin, Layers, Ruler, ShieldCheck, CheckCircle2, ChevronRight, Maximize2, Sparkles, Building, Hammer, CheckCircle, Upload, ExternalLink, Plus, Trash2, Folder, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

// Import user's authentic local image assets
import kavresthaliExt3d from "../assets/images/kavresthali_ext_3d_1785048964141.jpg";
import kavresthaliBedroom3d from "../assets/images/kavresthali_bedroom_3d_1785048984497.jpg";
import kavresthaliLiving3d from "../assets/images/kavresthali_living_3d_1785049004226.jpg";
import kavresthaliKitchen3d from "../assets/images/kavresthali_kitchen_3d_1785049098507.jpg";
import kavresthaliCadKitchen from "../assets/images/kavresthali_cad_kitchen_1785049259393.jpg";
import kavresthaliCadStairbar from "../assets/images/kavresthali_cad_stairbar_1785049283641.jpg";

const assetImageMap: Record<string, string> = {
  balaram: kavresthaliLiving3d,
  shanta: kavresthaliBedroom3d,
  ganesh: kavresthaliKitchen3d,
  kavresthali: kavresthaliExt3d,
  "kavresthali_ext_3d_1785048964141.jpg": kavresthaliExt3d,
  "kavresthali_bedroom_3d_1785048984497.jpg": kavresthaliBedroom3d,
  "kavresthali_living_3d_1785049004226.jpg": kavresthaliLiving3d,
  "kavresthali_kitchen_3d_1785049098507.jpg": kavresthaliKitchen3d,
  "kavresthali_cad_kitchen_1785049259393.jpg": kavresthaliCadKitchen,
  "kavresthali_cad_stairbar_1785049283641.jpg": kavresthaliCadStairbar
};

function resolveImage(pathOrFilename: string): string {
  if (assetImageMap[pathOrFilename]) return assetImageMap[pathOrFilename];
  if (pathOrFilename.startsWith("http") || pathOrFilename.startsWith("data:") || pathOrFilename.startsWith("/")) {
    return pathOrFilename;
  }
  return kavresthaliExt3d;
}

function getImageLabel(imgName: string, lang: string = "en"): string {
  if (imgName.includes("cad_kitchen")) return lang === "ne" ? "२D CAD भान्छा र दराजको नाप नक्सा" : "2D CAD Kitchen & Cabinet Measurement Plan";
  if (imgName.includes("cad_stairbar")) return lang === "ne" ? "२D CAD भर्याङ मुनिको बार डिजाइन" : "2D CAD Under-Stair Mini-Bar Layout";
  if (imgName.includes("ext_3d")) return lang === "ne" ? "३D घरको बाहिरी डिजाइन भिजुअलाइजेसन" : "3D Architectural Exterior Elevation";
  if (imgName.includes("bedroom_3d")) return lang === "ne" ? "३D मुख्य सुत्ने कोठा (Master Bedroom)" : "3D Master Bedroom Interior Design";
  if (imgName.includes("living_3d")) return lang === "ne" ? "३D लिभिङ हल र सिलिङ डिजाइन" : "3D Living Hall & Ceiling Render";
  if (imgName.includes("kitchen_3d")) return lang === "ne" ? "३D आधुनिक भान्छा र डाइनिङ" : "3D Modern Kitchen & Dining Render";
  return lang === "ne" ? "आयोजना तस्बिर" : "Project Photo Archive";
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

// Helper function to compress images before storing to avoid localStorage QuotaExceededError
function compressImage(file: File, maxWidth = 1000, maxQuality = 0.7): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", maxQuality));
        } else {
          resolve(e.target?.result as string);
        }
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.onerror = () => resolve("");
    reader.readAsDataURL(file);
  });
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t, language } = useLanguage();
  const [activeStage, setActiveStage] = useState<"all" | "design" | "during" | "after">("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Method 3: Custom Upload & Google Drive Link State
  const [customPhotos, setCustomPhotos] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [showManager, setShowManager] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);

  useEffect(() => {
    if (project) {
      try {
        const saved = localStorage.getItem(`custom_photos_${project.id}`);
        if (saved) {
          setCustomPhotos(JSON.parse(saved));
        } else {
          setCustomPhotos([]);
        }
      } catch (err) {
        console.error("Failed to load saved photos", err);
      }
    }
  }, [project]);

  const saveCustomPhotos = (photos: string[]) => {
    setCustomPhotos(photos);
    setStorageError(null);
    if (project) {
      try {
        localStorage.setItem(`custom_photos_${project.id}`, JSON.stringify(photos));
      } catch (err) {
        console.warn("Storage quota exceeded in localStorage", err);
        setStorageError(
          language === "ne"
            ? "ब्राउजरको लोकल स्टोरेज क्षमता पूरा भयो। तस्बिरहरू यो सेसनभर देखिनेछन्।"
            : "Browser local storage quota limit reached. Photos will remain visible in your current active session."
        );
      }
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setStorageError(null);
    try {
      const compressedPromises = Array.from(files).map((file: File) => compressImage(file, 1000, 0.7));
      const compressedResults = await Promise.all(compressedPromises);
      const validResults = compressedResults.filter((res) => Boolean(res));
      saveCustomPhotos([...customPhotos, ...validResults]);
    } catch (err) {
      console.error("Error compressing/uploading files", err);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    saveCustomPhotos([...customPhotos, urlInput.trim()]);
    setUrlInput("");
  };

  const handleRemoveCustomPhoto = (index: number) => {
    const updated = customPhotos.filter((_, i) => i !== index);
    saveCustomPhotos(updated);
  };

  if (!project) return null;

  const translatedTitle = t(`project.${project.id}.title`) || project.title;
  const translatedLocation = t(`project.${project.id}.location`) || project.location;
  const translatedStatus = t(`project.${project.id}.status`) || project.status;
  const translatedBuiltArea = t(`project.${project.id}.builtUpArea`) || project.builtUpArea;
  const translatedLandArea = t(`project.${project.id}.landArea`) || project.landArea;
  const translatedFocus = t(`project.${project.id}.focus`) || project.engineeringFocus;

  const defaultStages = {
    design: {
      id: "design" as const,
      title: language === "ne" ? "१. आर्किटेक्चरल र स्ट्रक्चरल डिजाइन चरण" : "1. Architectural & Structural Design Stage",
      description: language === "ne" 
        ? "२D नक्सा, ३D भिजुअलाइजेसन, NBC-105 अनुरुप भूकम्पिय गणना र नगरपालिका e-BPS स्वीकृतिको आधिकारिक फाइलहरू।"
        : "Complete 2D floor plans, 3D photorealistic walkthrough, NBC-105 seismic structural modeling, and e-BPS municipal clearance files.",
      badge: language === "ne" ? "डिजाइन फाइलहरू" : "Approved Blueprint",
      images: [kavresthaliExt3d]
    },
    during: {
      id: "during" as const,
      title: language === "ne" ? "२. निर्माण भइरहँदाको चरण (Physical Progress)" : "2. During Construction (Structural Progress)",
      description: language === "ne"
        ? "गहिरो जग खन्ने, टाई-बीम निर्माण, डन्डी (Fe 500D) बाँध्ने कार्य र M25 कंक्रिट ढलानको प्रत्यक्ष इन्जिनियर सुपरीवेक्षण।"
        : "Foundation excavation, tie-beam reinforcement, Fe 500D steel rebar tying, and M25 grade concrete pour supervised by licensed engineers.",
      badge: language === "ne" ? "साइट निर्माण" : "On-Site Framing",
      images: [kavresthaliCadKitchen]
    },
    after: {
      id: "after" as const,
      title: language === "ne" ? "३. निर्माण पश्चातको चरण (Final Completion)" : "3. After Construction (Finished Handover)",
      description: language === "ne"
        ? "बाहिरी मौसमी पेन्ट, डबल ग्लेज्ड झ्याल, प्रिमियम इन्टेरियर फर्निचर सजावट र ३-वर्षे वारेन्टी कार्ड हस्तान्तरण।"
        : "Weatherproof exterior coating, soundproof UPVC windows, luxury interior finishes, and final architectural handover with structural warranty.",
      badge: language === "ne" ? "सम्पन्न निर्माण" : "Final Handover",
      images: [kavresthaliLiving3d]
    }
  };

  const stages = project.stages || defaultStages;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* Lightbox Overlay */}
      {selectedImage && (
        <div className="fixed inset-0 z-60 bg-black/95 flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-brand-gold bg-neutral-900/80 p-2.5 rounded-full cursor-pointer transition-all z-10"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-4xl max-h-[85vh] flex flex-col items-center">
            <img
              src={resolveImage(selectedImage)}
              alt="Full size view"
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl border border-neutral-800"
            />
            <div className="mt-3 text-center text-white bg-neutral-900/90 border border-neutral-700/60 px-4 py-2 rounded-lg text-xs font-mono font-medium">
              {getImageLabel(selectedImage, language)}
            </div>
          </div>
        </div>
      )}

      {/* Main Modal Card */}
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-neutral-200 flex flex-col relative my-auto">
        
        {/* Header Bar */}
        <div className="sticky top-0 z-20 bg-neutral-900 text-white p-5 sm:p-6 flex items-center justify-between border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="bg-brand-gold text-neutral-950 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded">
                {project.category}
              </span>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded">
                {translatedStatus}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-white">
              {translatedTitle}
            </h2>
            <p className="text-xs text-neutral-400 font-mono flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-brand-pink shrink-0" />
              {translatedLocation}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-700 p-2.5 rounded-full cursor-pointer transition-colors"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 space-y-8">
          
          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs">
            <div>
              <span className="text-[10px] font-mono text-neutral-400 font-semibold uppercase block">{t("projects.built_area")}</span>
              <span className="font-bold text-neutral-800 mt-0.5 block">{translatedBuiltArea}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-neutral-400 font-semibold uppercase block">{t("projects.land_area")}</span>
              <span className="font-bold text-neutral-800 mt-0.5 block">{translatedLandArea}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-neutral-400 font-semibold uppercase block">{t("projects.steel")}</span>
              <span className="font-bold text-neutral-800 mt-0.5 block">{project.specs.steel}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-neutral-400 font-semibold uppercase block">{t("projects.cement")}</span>
              <span className="font-bold text-neutral-800 mt-0.5 block">{project.specs.cement}</span>
            </div>
          </div>

          {/* Project Overview Box */}
          <div className="p-5 bg-brand-gold/5 rounded-xl border border-brand-gold/20 space-y-2">
            <span className="text-xs font-mono font-bold text-brand-gold uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              {t("projects.engineering_title")}
            </span>
            <p className="text-xs sm:text-sm text-neutral-700 font-light leading-relaxed">
              {translatedFocus}
            </p>
          </div>

          {/* METHOD 3: GOOGLE DRIVE & DIRECT PHOTO UPLOAD SYSTEM */}
          <div className="bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 text-white rounded-xl p-5 border border-neutral-800 shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-neutral-800">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-brand-pink/20 text-brand-pink rounded-lg shrink-0 mt-0.5">
                  <Folder className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-brand-pink text-white text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded">
                      Google Drive Folder
                    </span>
                    <span className="text-xs font-mono text-neutral-400">
                      {project.id === "kavresthali" ? "Project Kavresthali, Tarakeshwor" : project.title}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-display font-bold mt-1 text-white">
                    {language === "ne" ? "वास्तविक आयोजना फोटो र गुगल ड्राइभ लिङ्क" : "Real Site Photos & Google Drive Integration"}
                  </h3>
                  <p className="text-xs text-neutral-400 font-light mt-0.5">
                    {language === "ne"
                      ? "गुगल ड्राइभ फोल्डर सिधै हेर्नुहोस् वा आफ्नै यन्त्रबाट नयाँ फोटोहरू अपलोड गर्नुहोस्।"
                      : "Access the official Google Drive folder or upload real site photos directly into this project gallery."}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={project.id === "kavresthali" 
                    ? "https://drive.google.com/drive/folders/1cri0emlYgYqZ8sldKt1V0K1UP77zebnG?usp=drive_link" 
                    : "https://drive.google.com"}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-brand-gold hover:bg-brand-gold/90 text-neutral-950 text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {language === "ne" ? "गूगल ड्राइभ खोल्नुहोस्" : "Open Drive Folder"}
                </a>

                <button
                  onClick={() => setShowManager(!showManager)}
                  className="bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors border border-neutral-700"
                >
                  <Upload className="w-3.5 h-3.5 text-brand-pink" />
                  {showManager ? (language === "ne" ? "अपलोड लुकाउनुहोस्" : "Hide Uploader") : (language === "ne" ? "+ फोटो थप्नुहोस्" : "+ Upload Photos")}
                </button>
              </div>
            </div>

            {/* Storage Warning Notification if present */}
            {storageError && (
              <div className="bg-amber-950/80 border border-amber-700/60 text-amber-200 text-xs px-3.5 py-2 rounded-lg flex items-center justify-between">
                <span>{storageError}</span>
                <button
                  onClick={() => setStorageError(null)}
                  className="text-amber-400 hover:text-amber-100 text-xs font-bold ml-2 underline"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Uploader Drawer */}
            {showManager && (
              <div className="bg-neutral-900/90 rounded-lg p-4 border border-neutral-800 space-y-4 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* File Upload Box */}
                  <div className="bg-neutral-950 p-4 rounded-lg border border-dashed border-neutral-700 flex flex-col items-center justify-center text-center">
                    <Upload className="w-6 h-6 text-brand-gold mb-2" />
                    <span className="text-xs font-bold text-white mb-1">
                      {language === "ne" ? "तस्बिर छान्नुहोस् (File Picker)" : "Upload Real Site Photos"}
                    </span>
                    <span className="text-[10px] text-neutral-400 mb-3">
                      {language === "ne" ? "मोबाइल वा कम्प्युटरबाट सिधै फोटो राख्नुहोस्" : "Select images from device (JPG, PNG, WEBP)"}
                    </span>
                    <label className="bg-brand-pink hover:bg-brand-pink/90 text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer transition-colors flex items-center gap-2">
                      <ImageIcon className="w-3.5 h-3.5" />
                      {isUploading ? (language === "ne" ? "अपलोड भइरहेछ..." : "Uploading...") : (language === "ne" ? "तस्बिर चयन गर्नुहोस्" : "Choose Files")}
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* URL / Drive Link Box */}
                  <form onSubmit={handleAddUrl} className="bg-neutral-950 p-4 rounded-lg border border-neutral-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-white mb-1">
                        <LinkIcon className="w-3.5 h-3.5 text-brand-pink" />
                        {language === "ne" ? "फोटो URL वा ड्राइभ लिङ्क पेस्ट गर्नुहोस्" : "Paste Image or Drive URL"}
                      </div>
                      <p className="text-[10px] text-neutral-400 mb-3">
                        {language === "ne" ? "कुनै पनि अनलाइन वेब फोटो वा डायरेक्ट लिङ्क थप्नुहोस्" : "Add direct image URL to display immediately"}
                      </p>
                      <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        placeholder="https://example.com/real-photo.jpg"
                        className="w-full bg-neutral-900 border border-neutral-700 text-white text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-brand-gold"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!urlInput.trim()}
                      className="mt-3 w-full bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50 text-white text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      {language === "ne" ? "ग्यालेरीमा थप्नुहोस्" : "Add to Gallery"}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Custom Uploaded Photos Grid */}
            {customPhotos.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    {language === "ne" ? `थपिएका वास्तविक तस्बिरहरू (${customPhotos.length})` : `Custom Uploaded Site Photos (${customPhotos.length})`}
                  </span>
                  <button
                    onClick={() => saveCustomPhotos([])}
                    className="text-[10px] text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    {language === "ne" ? "सबै हटाउनुहोस्" : "Clear All Uploads"}
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                  {customPhotos.map((photo, idx) => (
                    <div
                      key={idx}
                      className="group relative h-28 rounded-lg overflow-hidden border border-neutral-700/80 bg-neutral-900 cursor-pointer flex flex-col justify-between"
                    >
                      <img
                        src={photo}
                        alt={`Custom photo ${idx + 1}`}
                        onClick={() => setSelectedImage(photo)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveCustomPhoto(idx);
                        }}
                        className="absolute top-1.5 right-1.5 bg-black/70 hover:bg-red-600 text-white p-1 rounded-full transition-colors z-10 cursor-pointer"
                        title="Remove Photo"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                      <div className="absolute bottom-0 inset-x-0 bg-neutral-950/80 text-[9px] text-neutral-300 font-mono px-2 py-0.5 truncate">
                        Real Photo #{idx + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3 STAGES TAB BAR */}
          <div>
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3 flex-wrap gap-3">
              <div>
                <h3 className="text-lg font-display font-bold text-neutral-900">
                  {language === "ne" ? "निर्माणको ३ चरणको आर्काइभ" : "3-Stage Construction Archives"}
                </h3>
                <p className="text-xs text-neutral-500 font-light mt-0.5">
                  {language === "ne" ? "डिजाइन, निर्माण भइरहँदा र निर्माण पश्चातका तस्बिरहरू" : "Explore photos & engineering details across Design, Construction, and Final Handover stages."}
                </p>
              </div>

              {/* Stage Filter Buttons */}
              <div className="flex items-center gap-1.5 bg-neutral-100 p-1 rounded-lg border border-neutral-200">
                <button
                  onClick={() => setActiveStage("all")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    activeStage === "all" ? "bg-brand-pink text-white shadow-sm" : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  {t("projects.stage_all")}
                </button>
                <button
                  onClick={() => setActiveStage("design")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    activeStage === "design" ? "bg-brand-pink text-white shadow-sm" : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  {t("projects.stage_design")}
                </button>
                <button
                  onClick={() => setActiveStage("during")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    activeStage === "during" ? "bg-brand-pink text-white shadow-sm" : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  {t("projects.stage_during")}
                </button>
                <button
                  onClick={() => setActiveStage("after")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    activeStage === "after" ? "bg-brand-pink text-white shadow-sm" : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  {t("projects.stage_after")}
                </button>
              </div>
            </div>

            {/* STAGE SECTIONS LIST */}
            <div className="space-y-8 mt-6">
              
              {/* STAGE 1: DESIGN */}
              {(activeStage === "all" || activeStage === "design") && (
                <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200 space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-neutral-900">
                          {stages.design.title}
                        </h4>
                        <span className="text-[10px] font-mono text-neutral-400">
                          {language === "ne" ? "२D नक्सा, ३D वाकथ्रु र e-BPS पास" : "2D Blueprint, 3D Render & Municipal File"}
                        </span>
                      </div>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-[10px] font-mono font-bold px-2.5 py-1 rounded">
                      {stages.design.badge}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    {stages.design.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {stages.design.images.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className="group relative h-44 rounded-lg overflow-hidden border border-neutral-200 cursor-pointer shadow-sm hover:shadow-md transition-all flex flex-col justify-end"
                      >
                        <img
                          src={resolveImage(img)}
                          alt={getImageLabel(img, language)}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                          <span className="text-white text-xs font-semibold flex items-center gap-1 bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-xs">
                            <Maximize2 className="w-3.5 h-3.5" /> {language === "ne" ? "ठूलो तस्बिर" : "Zoom Photo"}
                          </span>
                        </div>
                        <div className="relative z-1 bg-neutral-900/80 backdrop-blur-xs p-2 text-[10px] font-mono text-white text-center truncate border-t border-white/10">
                          {getImageLabel(img, language)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STAGE 2: DURING CONSTRUCTION */}
              {(activeStage === "all" || activeStage === "during") && (
                <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200 space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                        <Hammer className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-neutral-900">
                          {stages.during.title}
                        </h4>
                        <span className="text-[10px] font-mono text-neutral-400">
                          {language === "ne" ? "साइटमा जग, पिल्लर र ढलानको प्रगति" : "On-Site Excavation, Rebar & Concrete Pour"}
                        </span>
                      </div>
                    </div>
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-mono font-bold px-2.5 py-1 rounded">
                      {stages.during.badge}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    {stages.during.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {stages.during.images.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className="group relative h-44 rounded-lg overflow-hidden border border-neutral-200 cursor-pointer shadow-sm hover:shadow-md transition-all flex flex-col justify-end"
                      >
                        <img
                          src={resolveImage(img)}
                          alt={getImageLabel(img, language)}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                          <span className="text-white text-xs font-semibold flex items-center gap-1 bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-xs">
                            <Maximize2 className="w-3.5 h-3.5" /> {language === "ne" ? "ठूलो तस्बिर" : "Zoom Photo"}
                          </span>
                        </div>
                        <div className="relative z-1 bg-neutral-900/80 backdrop-blur-xs p-2 text-[10px] font-mono text-white text-center truncate border-t border-white/10">
                          {getImageLabel(img, language)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STAGE 3: AFTER CONSTRUCTION */}
              {(activeStage === "all" || activeStage === "after") && (
                <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200 space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-neutral-900">
                          {stages.after.title}
                        </h4>
                        <span className="text-[10px] font-mono text-neutral-400">
                          {language === "ne" ? "सम्पन्न बाहिरी फिनिसिङ र इन्टेरियर" : "Finished Facade, Interior & Warranty Card"}
                        </span>
                      </div>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold px-2.5 py-1 rounded">
                      {stages.after.badge}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    {stages.after.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {stages.after.images.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className="group relative h-44 rounded-lg overflow-hidden border border-neutral-200 cursor-pointer shadow-sm hover:shadow-md transition-all flex flex-col justify-end"
                      >
                        <img
                          src={resolveImage(img)}
                          alt={getImageLabel(img, language)}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                          <span className="text-white text-xs font-semibold flex items-center gap-1 bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-xs">
                            <Maximize2 className="w-3.5 h-3.5" /> {language === "ne" ? "ठूलो तस्बिर" : "Zoom Photo"}
                          </span>
                        </div>
                        <div className="relative z-1 bg-neutral-900/80 backdrop-blur-xs p-2 text-[10px] font-mono text-white text-center truncate border-t border-white/10">
                          {getImageLabel(img, language)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-neutral-100 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500 rounded-b-2xl flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>P.B. Consultation Pvt. Ltd. — NBC-105 Compliant Engineering Archives</span>
          </div>

          <button
            onClick={onClose}
            className="bg-neutral-900 hover:bg-neutral-800 text-white font-semibold px-5 py-2 rounded-lg cursor-pointer transition-colors"
          >
            {language === "ne" ? "बन्द गर्नुहोस्" : "Close Archives"}
          </button>
        </div>

      </div>
    </div>
  );
}
