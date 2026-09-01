/**
 * 10 Core Medical Categories & Information Architecture
 * ROYAL CROWN HEALTHCARE VENTURES
 */

export const CATEGORIES = [
  {
    id: "cssd-sterilization",
    slug: "cssd-sterilization",
    name: "CSSD / Sterilization Products",
    shortName: "Sterilization & CSSD",
    description: "Sterilization packaging, monitoring indicators, and routine CSSD consumables for clinical infection control.",
    icon: "ShieldCheck",
    image: "https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      { id: "sterilization-pouches", name: "Sterilization Pouches", slug: "sterilization-pouches" },
      { id: "autoclave-accessories", name: "Autoclave Accessories", slug: "autoclave-accessories" },
      { id: "sterilization-indicators", name: "Sterilization Indicators", slug: "sterilization-indicators" },
      { id: "cssd-consumables", name: "CSSD Consumables", slug: "cssd-consumables" }
    ]
  },
  {
    id: "surgical-gloves-ppe",
    slug: "surgical-gloves-ppe",
    name: "Surgical Gloves & PPE",
    shortName: "Gloves & PPE",
    description: "High-barrier surgical and examination gloves, surgical gowns, 3-ply/N95 masks, caps, and protective apparel.",
    icon: "HandMetal",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      { id: "examination-gloves", name: "Examination Gloves", slug: "examination-gloves" },
      { id: "surgical-gloves", name: "Surgical Gloves", slug: "surgical-gloves" },
      { id: "face-masks", name: "Face Masks", slug: "face-masks" },
      { id: "gowns", name: "Gowns", slug: "gowns" },
      { id: "caps", name: "Caps", slug: "caps" },
      { id: "shoe-covers", name: "Shoe Covers", slug: "shoe-covers" }
    ]
  },
  {
    id: "syringes-needles",
    slug: "syringes-needles",
    name: "Syringes & Needles",
    shortName: "Syringes & Needles",
    description: "Precision disposable syringes with needles, insulin administration syringes, and specialty hypodermic needles.",
    icon: "Syringe",
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      { id: "disposable-syringes", name: "Disposable Syringes", slug: "disposable-syringes" },
      { id: "insulin-syringes", name: "Insulin Syringes", slug: "insulin-syringes" },
      { id: "hypodermic-needles", name: "Hypodermic Needles", slug: "hypodermic-needles" },
      { id: "specialty-needles", name: "Specialty Needles", slug: "specialty-needles" }
    ]
  },
  {
    id: "iv-therapy",
    slug: "iv-therapy",
    name: "IV Therapy Products",
    shortName: "IV Therapy",
    description: "Intravenous infusion sets, winged IV cannulas with injection valves, 3-way stopcocks, and extension lines.",
    icon: "Activity",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      { id: "iv-sets", name: "IV Sets", slug: "iv-sets" },
      { id: "iv-cannulas", name: "IV Cannulas", slug: "iv-cannulas" },
      { id: "infusion-sets", name: "Infusion Sets", slug: "infusion-sets" },
      { id: "extension-lines", name: "Extension Lines", slug: "extension-lines" },
      { id: "three-way-stopcocks", name: "Three-Way Stopcocks", slug: "three-way-stopcocks" }
    ]
  },
  {
    id: "catheters-urology",
    slug: "catheters-urology",
    name: "Catheters & Urology",
    shortName: "Catheters & Urology",
    description: "Foley balloon catheters, Nelaton drainage tubes, graduated urine collection bags, and urological consumables.",
    icon: "Layers",
    image: "https://images.unsplash.com/photo-1583947581924-860bda6a26df?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      { id: "foley-catheters", name: "Foley Catheters", slug: "foley-catheters" },
      { id: "nelaton-catheters", name: "Nelaton Catheters", slug: "nelaton-catheters" },
      { id: "urine-bags", name: "Urine Bags", slug: "urine-bags" },
      { id: "urology-consumables", name: "Urology Consumables", slug: "urology-consumables" }
    ]
  },
  {
    id: "dressing-wound-care",
    slug: "dressing-wound-care",
    name: "Dressing & Wound Care",
    shortName: "Wound Care & Dressing",
    description: "Absorbent surgical cotton, sterile gauze swabs, roller bandages, microporous tapes, and advanced wound dressings.",
    icon: "HeartHandshake",
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      { id: "gauze", name: "Gauze", slug: "gauze" },
      { id: "cotton", name: "Cotton", slug: "cotton" },
      { id: "bandages", name: "Bandages", slug: "bandages" },
      { id: "adhesive-dressings", name: "Adhesive Dressings", slug: "adhesive-dressings" },
      { id: "wound-care-products", name: "Wound Care Products", slug: "wound-care-products" }
    ]
  },
  {
    id: "surgical-ot-consumables",
    slug: "surgical-ot-consumables",
    name: "Surgical & OT Consumables",
    shortName: "OT Consumables",
    description: "Sterile surgical drapes, operation theatre packs, electrosurgical accessories, and disposable OT consumables.",
    icon: "Scissors",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      { id: "ot-drapes", name: "OT Drapes", slug: "ot-drapes" },
      { id: "surgical-consumables", name: "Surgical Consumables", slug: "surgical-consumables" },
      { id: "disposable-ot-products", name: "Disposable OT Products", slug: "disposable-ot-products" }
    ]
  },
  {
    id: "surgical-instruments",
    slug: "surgical-instruments",
    name: "Surgical Instruments",
    shortName: "Surgical Instruments",
    description: "Medical-grade stainless steel forceps, dissection scissors, tissue retractors, hemostatic clamps, and surgical sets.",
    icon: "Crosshair",
    image: "https://images.unsplash.com/photo-1583912267550-d44d95bf691d?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      { id: "forceps", name: "Forceps", slug: "forceps" },
      { id: "scissors", name: "Scissors", slug: "scissors" },
      { id: "retractors", name: "Retractors", slug: "retractors" },
      { id: "clamps", name: "Clamps", slug: "clamps" },
      { id: "other-surgical-instruments", name: "Other Surgical Instruments", slug: "other-surgical-instruments" }
    ]
  },
  {
    id: "laboratory-consumables",
    slug: "laboratory-consumables",
    name: "Laboratory Consumables",
    shortName: "Lab Consumables",
    description: "Blood collection vacuum tubes, sample containers, pipette tips, petri dishes, and clinical diagnostic disposables.",
    icon: "FlaskConical",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      { id: "sample-collection", name: "Sample Collection", slug: "sample-collection" },
      { id: "tubes", name: "Tubes", slug: "tubes" },
      { id: "lab-disposables", name: "Lab Disposables", slug: "lab-disposables" },
      { id: "general-lab-consumables", name: "General Lab Consumables", slug: "general-lab-consumables" }
    ]
  },
  {
    id: "housekeeping-infection-control",
    slug: "housekeeping-infection-control",
    name: "Housekeeping & Infection Control",
    shortName: "Infection Control",
    description: "Hospital-grade surface disinfectants, biomedical waste collection bags, hand sanitizers, and clinical sanitization aids.",
    icon: "Sparkles",
    image: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      { id: "cleaning-products", name: "Cleaning Products", slug: "cleaning-products" },
      { id: "disinfectants", name: "Disinfectants", slug: "disinfectants" },
      { id: "waste-management", name: "Waste Management", slug: "waste-management" },
      { id: "infection-control-products", name: "Infection Control Products", slug: "infection-control-products" }
    ]
  }
];

export default CATEGORIES;
