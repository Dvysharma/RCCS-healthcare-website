/**
 * Comprehensive Medical Supplies Product Catalogue
 * ROYAL CROWN HEALTHCARE VENTURES
 */

export const PRODUCTS = [
  // 1. CSSD / Sterilization Products
  {
    id: "rc-cssd-001",
    name: "Self-Sealing Sterilization Pouches (200 Pcs/Box)",
    slug: "self-sealing-sterilization-pouches",
    sku: "RC-CSSD-POUCH-01",
    category: "cssd-sterilization",
    subcategory: "sterilization-pouches",
    shortDescription: "Triple-sealed medical grade paper and transparent film pouches with chemical indicators for steam and EO sterilization.",
    description: "Engineered with medical grade 60gsm paper and heavy-duty transparent laminated film. Features dual external steam and Ethylene Oxide (EO) process indicators that change color upon sterilization cycle completion. Strong self-adhesive fold-and-press seal eliminates the need for heat-sealing equipment.",
    images: [
      "https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583947581924-860bda6a26df?auto=format&fit=crop&w=800&q=80"
    ],
    price: 680,
    compareAtPrice: 850,
    priceDisplay: "₹680 / Box",
    isPriceOnRequest: false,
    moq: "1 Box (200 Pcs)",
    stock: "In Stock",
    availability: "Available for Immediate Dispatch",
    specifications: {
      "Dimensions": "90mm x 260mm (Available up to 300mm x 450mm)",
      "Paper Grade": "Medical Grade 60 GSM Paper",
      "Film Material": "52µm Multi-layer Laminated Poly/PET Film",
      "Sterilization Compatibility": "Steam (Autoclave) & EO Gas",
      "Indicators": "Dual Steam (Blue to Black) & EO (Pink to Yellow)",
      "Standard Compliance": "EN 868-5 / ISO 11607 Standards"
    },
    features: [
      "Chevron top seal for easy, fiber-free aseptic opening",
      "Wide triple-sealed edges resist bursting during pressure cycles",
      "Clear transparent film allows quick instrument identification",
      "Pre-printed directional fold guide for uniform airtight closure"
    ],
    packaging: "200 Pouches per Box | Master Carton: 10 Boxes (2,000 Pouches)",
    brand: "Standard Healthcare Series",
    featured: true,
    status: "active",
    seoTitle: "Sterilization Pouches (Self Sealing) | Royal Crown Healthcare",
    seoDescription: "Buy medical grade self-sealing sterilization pouches with dual steam/EO indicators in Dehradun. Bulk hospital supply."
  },
  {
    id: "rc-cssd-002",
    name: "Autoclave Chemical Indicator Strips (Type 4)",
    slug: "autoclave-chemical-indicator-strips-type-4",
    sku: "RC-CSSD-IND-04",
    category: "cssd-sterilization",
    subcategory: "sterilization-indicators",
    shortDescription: "Multi-parameter internal steam sterilization monitoring strips for CSSD autoclave packs.",
    description: "Type 4 multi-variable chemical indicator strips verify that steam sterilization parameters (time, temperature, and saturated steam) have been achieved inside packs, trays, and pouches. Clear, irreversible color transition from purple to solid green.",
    images: [
      "https://images.unsplash.com/photo-1583947581924-860bda6a26df?auto=format&fit=crop&w=800&q=80"
    ],
    price: 490,
    compareAtPrice: 620,
    priceDisplay: "₹490 / Pack",
    isPriceOnRequest: false,
    moq: "1 Pack (250 Strips)",
    stock: "In Stock",
    availability: "Available",
    specifications: {
      "Classification": "ISO 11140-1 Type 4 Multi-variable",
      "Operating Temperatures": "121°C (15 min) / 134°C (3.5 min)",
      "Pack Size": "250 Strips per Box",
      "Color Transition": "Purple to Solid Green",
      "Substrate": "Lead-Free Non-Toxic Coated Card"
    },
    features: [
      "Distinct color change prevents false positive interpretation",
      "Can be divided in half for smaller sterilization packages",
      "Perforated design with space for date, autoclave #, and operator ID"
    ],
    packaging: "250 Strips / Box | 40 Boxes / Master Case",
    brand: "Standard Healthcare Series",
    featured: false,
    status: "active"
  },

  // 2. Surgical Gloves & PPE
  {
    id: "rc-ppe-001",
    name: "Sterile Latex Surgical Gloves (Powder-Free)",
    slug: "sterile-latex-surgical-gloves-powder-free",
    sku: "RC-GLV-LAT-01",
    category: "surgical-gloves-ppe",
    subcategory: "surgical-gloves",
    shortDescription: "Anatomically curved sterile surgical gloves with micro-textured grip and reinforced beaded cuff.",
    description: "Manufactured from high-grade natural rubber latex. Anatomical hand-specific design reduces finger fatigue during extended operations. Powder-free with low protein content to minimize sensitization and allergic risks. Micro-roughened palm and fingers deliver superior instrument tactile sensitivity in wet and dry conditions.",
    images: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80"
    ],
    price: 1350,
    compareAtPrice: 1600,
    priceDisplay: "₹1,350 / Box (50 Pairs)",
    isPriceOnRequest: false,
    moq: "1 Box (50 Pairs)",
    stock: "In Stock",
    availability: "Immediate Supply",
    specifications: {
      "Sizes Available": "6.0, 6.5, 7.0, 7.5, 8.0, 8.5",
      "Material": "Natural Rubber Latex",
      "Surface Finish": "Micro-textured Palm & Finger Grip",
      "Sterilization": "Gamma Irradiation (Sterile R)",
      "AQL Standard": "AQL 0.65 / 1.5 Surgical Grade",
      "Length": "280 mm minimum with beaded cuff"
    },
    features: [
      "Curved finger anatomy prevents fatigue during long surgical procedures",
      "Low protein content helps prevent Type I latex allergies",
      "Sterile peel-open wallet with inner sterile wrap"
    ],
    packaging: "50 Sterile Pairs / Dispenser Box | 8 Boxes (400 Pairs) / Master Carton",
    brand: "Hospital Pro Series",
    featured: true,
    status: "active",
    seoTitle: "Sterile Powder-Free Latex Surgical Gloves | Royal Crown Healthcare",
    seoDescription: "Sterile latex surgical gloves (powder-free) for OT and hospital use in Dehradun, Uttarakhand."
  },
  {
    id: "rc-ppe-002",
    name: "Nitrile Examination Gloves (Powder-Free, Box of 100)",
    slug: "nitrile-examination-gloves-powder-free",
    sku: "RC-GLV-NIT-02",
    category: "surgical-gloves-ppe",
    subcategory: "examination-gloves",
    shortDescription: "Non-sterile ambidextrous nitrile gloves with high puncture resistance and chemical barrier.",
    description: "100% synthetic nitrile construction, completely free from latex proteins and powder. Excellent tensile strength and tear resistance. Textured fingertips ensure confident grip on clinical glassware and instruments.",
    images: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80"
    ],
    price: 340,
    compareAtPrice: 420,
    priceDisplay: "₹340 / Box (100 Pcs)",
    isPriceOnRequest: false,
    moq: "2 Boxes (200 Pcs)",
    stock: "In Stock",
    availability: "Available for Bulk Procurement",
    specifications: {
      "Sizes Available": "S, M, L, XL",
      "Material": "100% Synthetic Nitrile",
      "Color": "Medical Blue / Cobalt Blue",
      "Thickness": "3.5 mil / 4.0 mil",
      "Elongation": "500% minimum",
      "Standard": "ASTM D6319 / EN 455"
    },
    features: [
      "Latex-free eliminates Type I allergy risks for staff and patients",
      "Superior puncture resistance compared to vinyl and latex",
      "Beaded cuff for easy donning and anti-roll down protection"
    ],
    packaging: "100 Pcs / Dispenser Box | 10 Boxes (1,000 Pcs) / Outer Case",
    brand: "Standard Healthcare Series",
    featured: true,
    status: "active"
  },
  {
    id: "rc-ppe-003",
    name: "Surgical 3-Ply Face Masks with Meltblown Filter",
    slug: "surgical-3-ply-face-masks-meltblown",
    sku: "RC-PPE-MSK-03",
    category: "surgical-gloves-ppe",
    subcategory: "face-masks",
    shortDescription: "High-filtration 3-ply non-woven face masks with ultrasonic welding and soft elastic earloops.",
    description: "Constructed with an outer fluid-repellent non-woven layer, a middle high-efficiency meltblown filter providing >98% Bacterial Filtration Efficiency (BFE), and an inner skin-friendly absorbent non-woven layer. Equipped with an embedded malleable nose clip.",
    images: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80"
    ],
    price: 120,
    compareAtPrice: 180,
    priceDisplay: "₹120 / Box (50 Pcs)",
    isPriceOnRequest: false,
    moq: "5 Boxes (250 Pcs)",
    stock: "In Stock",
    availability: "Bulk Quantity In Stock",
    specifications: {
      "Layers": "3 Layers (Non-Woven + Meltblown + Non-Woven)",
      "BFE": "≥ 98% (Bacterial Filtration Efficiency)",
      "PFE": "≥ 95% (Particulate Filtration Efficiency @ 0.1 micron)",
      "Nose Clip": "Concealed Plastic Coated Aluminum Strip",
      "Fastening": "Ultrasonically Bonded Round Soft Elastic"
    },
    features: [
      "Breathable and hypoallergenic inner lining",
      "Low breathing resistance prevents heat buildup",
      "Fluid repellent outer layer prevents droplet transmission"
    ],
    packaging: "50 Masks per Box | 40 Boxes (2,000 Masks) per Carton",
    brand: "Standard Healthcare Series",
    featured: false,
    status: "active"
  },

  // 3. Syringes & Needles
  {
    id: "rc-syr-001",
    name: "Disposable Syringes with Mounted Needles (2ml / 5ml / 10ml)",
    slug: "disposable-syringes-with-needles",
    sku: "RC-SYR-DISP-01",
    category: "syringes-needles",
    subcategory: "disposable-syringes",
    shortDescription: "Sterile, non-toxic, non-pyrogenic 3-part syringes with ultra-sharp siliconized needles.",
    description: "High-transparency polypropylene barrel with indelible graduated scale markings. Inert elastomer plunger tip ensures smooth gliding motion and leak-proof seal. Equipped with precision-honed, siliconized stainless steel needle for gentle tissue penetration.",
    images: [
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80"
    ],
    price: 280,
    compareAtPrice: 350,
    priceDisplay: "₹280 / Box (100 Pcs)",
    isPriceOnRequest: false,
    moq: "2 Boxes (200 Units)",
    stock: "In Stock",
    availability: "Immediate Supply",
    specifications: {
      "Capacities": "2 ml (24G needle) / 5 ml (23G needle) / 10 ml (21G needle)",
      "Components": "Barrel, Plunger, Elastomer Gasket, Needle",
      "Sterilization": "Ethylene Oxide (EO)",
      "Barrel Material": "Medical Grade Clarified Polypropylene",
      "Needle Material": "AISI 304 Stainless Steel with Silicone Coating"
    },
    features: [
      "Clear crystal barrel for exact volume measurement and bubble detection",
      "Definite plunger stop prevents accidental pull-out",
      "Individual ribbon blister packaging preserves sterility"
    ],
    packaging: "100 Pcs / Dispenser Box | 10 Boxes / Master Case",
    brand: "Hospital Pro Series",
    featured: true,
    status: "active",
    seoTitle: "Disposable Syringes with Needles | Royal Crown Healthcare",
    seoDescription: "Medical disposable syringes 2ml, 5ml, 10ml with sterile hypodermic needles. Dehradun supply."
  },
  {
    id: "rc-syr-002",
    name: "Insulin Syringes with Fixed Needle (U-40 / U-100)",
    slug: "insulin-syringes-u40-u100",
    sku: "RC-SYR-INS-02",
    category: "syringes-needles",
    subcategory: "insulin-syringes",
    shortDescription: "Ultra-fine short needle insulin administration syringes for minimal patient discomfort.",
    description: "Single-use sterile insulin syringes with integrated 31G micro-fine needle that minimizes dead space and eliminates medication waste. Bold, clearly calibrated markings ensure precise dosing accuracy.",
    images: [
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80"
    ],
    price: 450,
    compareAtPrice: 550,
    priceDisplay: "₹450 / Box (100 Pcs)",
    isPriceOnRequest: false,
    moq: "1 Box (100 Pcs)",
    stock: "In Stock",
    availability: "Available",
    specifications: {
      "Calibration": "U-40 (Red Cap, 1ml/40 Units) & U-100 (Orange Cap, 1ml/100 Units)",
      "Needle Gauge": "30G / 31G Ultra-Fine x 8mm",
      "Dead Space": "Zero Dead Space Integrated Needle",
      "Sterility": "Sterile EO Single Use"
    },
    features: [
      "Micro-bonded needle tip for comfortable subcutaneous injection",
      "Zero dead volume design prevents insulin waste",
      "Color-coded protective caps for instant unit recognition"
    ],
    packaging: "10 Pcs per Sterile Pouch | 10 Pouches (100 Pcs) per Box",
    brand: "Standard Healthcare Series",
    featured: false,
    status: "active"
  },

  // 4. IV Therapy Products
  {
    id: "rc-iv-001",
    name: "IV Cannula with Injection Port & Wings",
    slug: "iv-cannula-with-injection-port-and-wings",
    sku: "RC-IV-CAN-01",
    category: "iv-therapy",
    subcategory: "iv-cannulas",
    shortDescription: "FEP radiopaque catheter with back-cut bevel needle and color-coded port valve.",
    description: "Designed for continuous intravenous fluid infusion and intermittent medication injection. Features a smooth, kink-resistant FEP catheter with tapered tip and back-cut needle for gentle venipuncture with minimal trauma. Hydrophobic filter plug prevents blood leakage during insertion.",
    images: [
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
    ],
    price: 650,
    compareAtPrice: 800,
    priceDisplay: "₹650 / Box (50 Pcs)",
    isPriceOnRequest: false,
    moq: "1 Box (50 Pcs)",
    stock: "In Stock",
    availability: "Immediate Supply",
    specifications: {
      "Gauges Available": "18G (Green), 20G (Pink), 22G (Blue), 24G (Yellow)",
      "Catheter Material": "FEP / PTFE Radiopaque Catheter",
      "Needle": "Siliconized Stainless Steel with Japanese Bevel",
      "Injection Port": "Color-coded one-way silicone duckbill valve",
      "Sterility": "Sterile EO individual blister pack"
    },
    features: [
      "Flexible side wings allow stable fixation to patient skin",
      "Integrated port allows needle-free bolus medication delivery",
      "High flow rates with ultra-thin wall catheter profile"
    ],
    packaging: "50 Units / Box | 10 Boxes (500 Units) / Master Case",
    brand: "Hospital Pro Series",
    featured: true,
    status: "active",
    seoTitle: "IV Cannula with Port (18G, 20G, 22G, 24G) | Royal Crown Healthcare",
    seoDescription: "Sterile IV cannulas with injection port and wings. Reliable hospital supplies in Uttarakhand."
  },
  {
    id: "rc-iv-002",
    name: "Vented IV Infusion Set with Air Vent & 15 Micron Filter",
    slug: "vented-iv-infusion-set",
    sku: "RC-IV-SET-02",
    category: "iv-therapy",
    subcategory: "iv-sets",
    shortDescription: "Gravity infusion administration set with sharp piercing spike, cylindrical drip chamber, and precision roller clamp.",
    description: "Clear, kink-resistant non-toxic PVC tubing. Cylindrical drop chamber with integrated 15-micron fluid filter prevents particulate entry. Features built-in air vent with hydrophobic bacterial barrier filter for rigid and flexible IV fluid containers.",
    images: [
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
    ],
    price: 380,
    compareAtPrice: 480,
    priceDisplay: "₹380 / Pack (25 Sets)",
    isPriceOnRequest: false,
    moq: "2 Packs (50 Sets)",
    stock: "In Stock",
    availability: "Available for Immediate Dispatch",
    specifications: {
      "Drip Rate": "20 Drops / ml",
      "Tubing Length": "150 cm soft kink-resistant PVC",
      "Filter Size": "15 Micron Disc Fluid Filter",
      "Luer Lock": "Male Luer Slip / Lock fitting with rotating collar",
      "Air Vent": "Antibacterial hydrophobic membrane filter"
    },
    features: [
      "Sharp bevel spike penetrates standard glass bottles and soft plastic IV bags easily",
      "Smooth roller clamp provides precise infusion flow rate regulation",
      "Latex-free Y-injection injection site for secondary drug administration"
    ],
    packaging: "25 Sets / Pack | 20 Packs (500 Sets) / Carton",
    brand: "Standard Healthcare Series",
    featured: false,
    status: "active"
  },
  {
    id: "rc-iv-003",
    name: "Three-Way Stopcock with Luer Lock (Lipid Resistant)",
    slug: "three-way-stopcock-luer-lock",
    sku: "RC-IV-3WAY-03",
    category: "iv-therapy",
    subcategory: "three-way-stopcocks",
    shortDescription: "Lipid-resistant 3-way stopcock with 360-degree rotation handle for multi-line infusion management.",
    description: "Manufactured from medical-grade polycarbonate. Withstands infusion pressures up to 4.5 bar (65 psi). 360-degree rotation handle with arrow flow indicators allows uninterrupted multiple line drug delivery and pressure monitoring.",
    images: [
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
    ],
    price: 750,
    compareAtPrice: 900,
    priceDisplay: "₹750 / Box (50 Pcs)",
    isPriceOnRequest: false,
    moq: "1 Box (50 Pcs)",
    stock: "In Stock",
    availability: "Available",
    specifications: {
      "Material": "Lipid Resistant Clear Polycarbonate",
      "Ports": "2 Female Luer Ports + 1 Male Luer Lock with Rotator",
      "Pressure Rating": "4.5 Bar (65 PSI)",
      "Sterilization": "EO Gas Sterile"
    },
    features: [
      "Lipid-resistant construction safe for TPN and blood transfusions",
      "Minimal residual priming volume",
      "Smooth, tactile rotation with clear flow path indicator arrows"
    ],
    packaging: "50 Pcs / Box | 10 Boxes (500 Pcs) / Master Case",
    brand: "Hospital Pro Series",
    featured: false,
    status: "active"
  },

  // 5. Catheters & Urology
  {
    id: "rc-uro-001",
    name: "2-Way Siliconized Foley Balloon Catheter",
    slug: "2-way-siliconized-foley-catheter",
    sku: "RC-URO-FOL-01",
    category: "catheters-urology",
    subcategory: "foley-catheters",
    shortDescription: "Sterile indwelling urinary drainage catheter with symmetrical balloon and smooth distal eyes.",
    description: "Made from medical-grade natural latex with uniform silicone elastomer coating. Non-traumatic rounded closed tip with two large, burr-free drainage eyes ensures smooth insertion and efficient bladder drainage. Color-coded inflation valve with universal luer taper.",
    images: [
      "https://images.unsplash.com/photo-1583947581924-860bda6a26df?auto=format&fit=crop&w=800&q=80"
    ],
    price: 680,
    compareAtPrice: 850,
    priceDisplay: "₹680 / Box (10 Pcs)",
    isPriceOnRequest: false,
    moq: "1 Box (10 Pcs)",
    stock: "In Stock",
    availability: "Available",
    specifications: {
      "Sizes Available": "FG 12, 14, 16, 18, 20, 22, 24",
      "Balloon Capacity": "30 ml (Adult) / 5-10 ml (Paediatric)",
      "Length": "400 mm (Adult)",
      "Sterility": "Sterile EO Peel Pouch",
      "Valve Type": "Color-coded plastic non-return valve for luer syringe"
    },
    features: [
      "Smooth silicone surface reduces urethral irritation and encrustation",
      "Symmetrical inflation balloon seats firmly against bladder neck",
      "Color-coded valve for quick size identification"
    ],
    packaging: "10 Pcs / Box | 10 Boxes (100 Pcs) / Master Carton",
    brand: "Standard Healthcare Series",
    featured: true,
    status: "active"
  },
  {
    id: "rc-uro-002",
    name: "Urine Drainage Bag with Top Outlet & Non-Return Valve (2000ml)",
    slug: "urine-drainage-bag-2000ml",
    sku: "RC-URO-BAG-02",
    category: "catheters-urology",
    subcategory: "urine-bags",
    shortDescription: "Graduated clinical drainage bag with anti-reflux flutter valve and reinforced hanging eyelets.",
    description: "Manufactured from clinical-grade PVC. 2000 ml capacity with clearly readable graduated scale. Features an integrated anti-reflux valve that prevents backflow of urine, significantly lowering catheter-associated urinary tract infection (CAUTI) risk.",
    images: [
      "https://images.unsplash.com/photo-1583947581924-860bda6a26df?auto=format&fit=crop&w=800&q=80"
    ],
    price: 320,
    compareAtPrice: 400,
    priceDisplay: "₹320 / Pack (10 Bags)",
    isPriceOnRequest: false,
    moq: "2 Packs (20 Bags)",
    stock: "In Stock",
    availability: "Immediate Supply",
    specifications: {
      "Capacity": "2000 ml Graduated",
      "Tubing Length": "90 cm kink-resistant inlet tube",
      "Safety Valve": "Anti-reflux flutter valve",
      "Drainage Port": "Push-pull bottom drain / T-tap drainage option",
      "Packaging": "Sterile individual ribbon pack"
    },
    features: [
      "Wide bore kink-free tubing ensures rapid uninterrupted drainage",
      "Reinforced top eyelets for bed hanger attachment",
      "Graduation marks allow accurate urine output charting"
    ],
    packaging: "10 Pcs / Pack | 20 Packs (200 Pcs) / Case",
    brand: "Standard Healthcare Series",
    featured: false,
    status: "active"
  },

  // 6. Dressing & Wound Care
  {
    id: "rc-drg-001",
    name: "Sterile Absorbent Gauze Swabs (100% Pure Cotton)",
    slug: "sterile-absorbent-gauze-swabs",
    sku: "RC-DRG-GAUZ-01",
    category: "dressing-wound-care",
    subcategory: "gauze",
    shortDescription: "High-absorbency 8-ply & 12-ply cotton gauze swabs with folded tucked-in edges.",
    description: "Manufactured from 100% bleached woven cotton gauze (Type 17/20 threads). Completely chlorine-free and optical brightener-free. Tucked edges prevent loose yarn fraying during clinical wound cleansing and surgical packing.",
    images: [
      "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=800&q=80"
    ],
    price: 420,
    compareAtPrice: 520,
    priceDisplay: "₹420 / Box (100 Pcs)",
    isPriceOnRequest: false,
    moq: "2 Boxes (200 Pcs)",
    stock: "In Stock",
    availability: "In Stock",
    specifications: {
      "Sizes Available": "5cm x 5cm (8 Ply) / 7.5cm x 7.5cm (12 Ply) / 10cm x 10cm (12 Ply)",
      "Material": "100% Pure Natural Cotton USP",
      "Sterility": "Available in Sterile (Packs of 2/5) & Non-Sterile Bulk",
      "Absorbency Rate": "Under 5 seconds water sinking time"
    },
    features: [
      "Folded edges ensure zero loose threads in wound beds",
      "High absorbency capacity for blood and exudates",
      "Soft and non-abrasive to delicate granulating tissue"
    ],
    packaging: "100 Swabs / Box | 20 Boxes (2,000 Swabs) / Carton",
    brand: "Hospital Pro Series",
    featured: true,
    status: "active"
  },
  {
    id: "rc-drg-002",
    name: "Microporous Surgical Paper Tape (Hypoallergenic)",
    slug: "microporous-surgical-paper-tape",
    sku: "RC-DRG-TAPE-02",
    category: "dressing-wound-care",
    subcategory: "adhesive-dressings",
    shortDescription: "Gentle, breathable non-woven paper adhesive tape for dressing and cannula fixation.",
    description: "Breathable surgical tape coated with hypoallergenic medical polyacrylate adhesive. Adheres securely to damp skin while allowing moisture vapor to escape. Leaves minimal adhesive residue upon removal.",
    images: [
      "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=800&q=80"
    ],
    price: 360,
    compareAtPrice: 450,
    priceDisplay: "₹360 / Box (12 Rolls)",
    isPriceOnRequest: false,
    moq: "1 Box (12 Rolls)",
    stock: "In Stock",
    availability: "Available",
    specifications: {
      "Widths Available": "1 Inch (2.5cm) / 2 Inch (5cm) / 3 Inch (7.5cm)",
      "Length": "9.1 Meters per Spool",
      "Backing": "Porous Non-Woven Rayon Paper",
      "Adhesive": "Hypoallergenic Acrylic Pressure-Sensitive Adhesive"
    },
    features: [
      "Easy bi-directional tearing without scissors",
      "Gentle on sensitive and elderly fragile skin",
      "Radiolucent for X-ray procedures"
    ],
    packaging: "12 Rolls / Box | 20 Boxes (240 Rolls) / Carton",
    brand: "Standard Healthcare Series",
    featured: false,
    status: "active"
  },

  // 7. Surgical & OT Consumables
  {
    id: "rc-ot-001",
    name: "Universal Disposable OT Surgical Drape Kit",
    slug: "universal-disposable-ot-surgical-drape-kit",
    sku: "RC-OT-DRP-01",
    category: "surgical-ot-consumables",
    subcategory: "ot-drapes",
    shortDescription: "Sterile SMS/SMMS fluid-impervious surgical drape set with adhesive incise area and tube holders.",
    description: "Comprehensive barrier drape system manufactured from medical SMS/SMMS non-woven laminate. Provides complete microbial and fluid protection around the operative site. Includes integrated hook-and-loop cable holders and absorbent reinforcement patch.",
    images: [
      "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80"
    ],
    price: null,
    priceDisplay: "Price on Request",
    isPriceOnRequest: true,
    moq: "10 Kits",
    stock: "Bulk Order Available",
    availability: "Institutional & Bulk Procurement",
    specifications: {
      "Kit Contents": "1x Laparotomy/Universal Drape, 4x Utility Drapes with Tape, 2x Mayo Stand Covers, 1x Trolley Cover, 4x Hand Towels",
      "Fabric Type": "SMMS 55 GSM Anti-static Fluid Impervious",
      "Sterilization": "EO Gas with Double Sterile Wrap",
      "Standard": "EN 13795 High Performance Standard"
    },
    features: [
      "Reliable microbial barrier prevents strike-through infections",
      "Low-linting material reduces surgical wound contamination",
      "Strong medical adhesive holds drape firmly in place during procedure"
    ],
    packaging: "Individually sterile packed | 10 Kits / Case",
    brand: "Hospital Pro Series",
    featured: true,
    status: "active",
    seoTitle: "Universal OT Surgical Drape Kits | Royal Crown Healthcare",
    seoDescription: "Sterile disposable surgical drape kits for operation theatres in Dehradun hospitals."
  },

  // 8. Surgical Instruments
  {
    id: "rc-ins-001",
    name: "Surgical Dissection Forceps & Scissors Set (AISI 420 Stainless Steel)",
    slug: "surgical-forceps-scissors-set",
    sku: "RC-INS-SET-01",
    category: "surgical-instruments",
    subcategory: "forceps",
    shortDescription: "High-precision satin-finish stainless steel surgical instruments set for general surgery.",
    description: "Forged from premium grade AISI 420 Japanese/German spec surgical stainless steel. Autoclavable, corrosion resistant, and crafted with balanced ergonomics. Includes Adson tissue forceps (1x2 teeth), Mayo dissection scissors (straight & curved), and Kelly hemostatic forceps.",
    images: [
      "https://images.unsplash.com/photo-1583912267550-d44d95bf691d?auto=format&fit=crop&w=800&q=80"
    ],
    price: null,
    priceDisplay: "Price on Request",
    isPriceOnRequest: true,
    moq: "1 Set / Custom Assortment",
    stock: "Available on Order",
    availability: "Available for Hospital Procurement",
    specifications: {
      "Steel Grade": "Medical Grade AISI 420 Stainless Steel",
      "Finish": "Anti-Glare Satin Matte Finish",
      "Hardness": "HRC 48-52 on Rockwell Scale",
      "Passivation": "Chemical Passivation & Ultrasonic Cleaned",
      "Autoclave": "Compatible with steam sterilization up to 134°C"
    },
    features: [
      "Precision-aligned jaws and micro-serrations ensure firm tissue grasp",
      "Non-reflective matte surface prevents glare under theatre lighting",
      "Laser-etched lot numbers and traceability"
    ],
    packaging: "Individual protective sleeve or complete stainless steel sterilization tray",
    brand: "Precision Surgical Line",
    featured: true,
    status: "active"
  },
  {
    id: "rc-ins-002",
    name: "Mayo Straight & Curved Dissection Scissors (14cm - 17cm)",
    slug: "mayo-dissection-scissors",
    sku: "RC-INS-SCI-02",
    category: "surgical-instruments",
    subcategory: "scissors",
    shortDescription: "Heavy-duty surgical cutting scissors with beveled blades for cutting fascia and dense tissues.",
    description: "Precision-ground cutting edges provide effortless, clean cuts through tough anatomical structures. Satin finish eliminates glare under surgical overhead luminaires.",
    images: [
      "https://images.unsplash.com/photo-1583912267550-d44d95bf691d?auto=format&fit=crop&w=800&q=80"
    ],
    price: 380,
    compareAtPrice: 480,
    priceDisplay: "₹380 / Piece",
    isPriceOnRequest: false,
    moq: "2 Pieces",
    stock: "In Stock",
    availability: "In Stock",
    specifications: {
      "Lengths": "14 cm / 16 cm / 17 cm",
      "Profiles": "Straight (Surface cutting) & Curved (Deep dissection)",
      "Material": "Martensitic Stainless Steel",
      "Screw Joint": "Precision-machined adjustable rivet joint"
    },
    features: [
      "Beveled edge retains sharpness over repeated autoclave cycles",
      "Balanced finger rings allow comfortable grip for various hand sizes"
    ],
    packaging: "1 Pc / Protective Pouch | 10 Pcs / Box",
    brand: "Precision Surgical Line",
    featured: false,
    status: "active"
  },

  // 9. Laboratory Consumables
  {
    id: "rc-lab-001",
    name: "Vacuum Blood Collection Tubes (EDTA K2/K3, Clot Activator, Sodium Citrate)",
    slug: "vacuum-blood-collection-tubes",
    sku: "RC-LAB-VAC-01",
    category: "laboratory-consumables",
    subcategory: "tubes",
    shortDescription: "Color-coded sterile PET vacuum tubes for clinical diagnostic blood sampling and pathology.",
    description: "Manufactured from shatter-resistant PET with precisely measured vacuum draw volumes. Coated with spray-dried anticoagulant additives for instant, uniform blood mixing without clot micro-fragments.",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
    ],
    price: 480,
    compareAtPrice: 600,
    priceDisplay: "₹480 / Rack (100 Tubes)",
    isPriceOnRequest: false,
    moq: "2 Racks (200 Tubes)",
    stock: "In Stock",
    availability: "Available for Immediate Dispatch",
    specifications: {
      "Types Available": "EDTA K2/K3 (Lavender), Clot Activator / Serum (Red), Sodium Citrate (Light Blue), Fluoride Oxalate (Grey)",
      "Draw Volumes": "2.0 ml, 3.0 ml, 4.0 ml, 6.0 ml",
      "Tube Material": "Optically Clear PET Plastic",
      "Cap Design": "Safety Hemogard Rubber Stopper",
      "Centrifugation": "Up to 3000g for 10 minutes"
    },
    features: [
      "Consistent precise vacuum draw guarantees exact blood-to-additive ratio",
      "Shatterproof PET ensures safety during centrifugation and handling",
      "Color-coded stoppers compliant with ISO 6710 standards"
    ],
    packaging: "100 Tubes per Foam Rack | 12 Racks (1,200 Tubes) per Case",
    brand: "Standard Healthcare Series",
    featured: true,
    status: "active"
  },
  {
    id: "rc-lab-002",
    name: "Sterile Urine / Stool Specimen Containers (50ml / 100ml)",
    slug: "sterile-specimen-collection-containers",
    sku: "RC-LAB-CON-02",
    category: "laboratory-consumables",
    subcategory: "sample-collection",
    shortDescription: "Leak-proof screw-cap graduated diagnostic sample collection containers with patient ID labels.",
    description: "Clear polypropylene containers with leak-tight HDPE screw cap. Features clear milliliter graduations and matte write-on label for patient details, collection time, and sample type.",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
    ],
    price: 320,
    compareAtPrice: 400,
    priceDisplay: "₹320 / Pack (50 Pcs)",
    isPriceOnRequest: false,
    moq: "2 Packs (100 Pcs)",
    stock: "In Stock",
    availability: "In Stock",
    specifications: {
      "Volume Options": "50 ml & 100 ml",
      "Cap Type": "Leak-Proof Threaded Screw Cap (Red / Yellow)",
      "Material": "Medical Grade Polypropylene (PP)",
      "Label": "Pre-affixed matte write-on ID label"
    },
    features: [
      "Leak-proof seal prevents sample spill during transit to pathology lab",
      "Transparent barrel allows visual assessment of sample clarity"
    ],
    packaging: "50 Pcs / Pack | 10 Packs (500 Pcs) / Master Bag",
    brand: "Standard Healthcare Series",
    featured: false,
    status: "active"
  },

  // 10. Housekeeping & Infection Control
  {
    id: "rc-inf-001",
    name: "Hospital-Grade Surface Disinfectant Concentrate (Quaternary / Alcohol Based)",
    slug: "hospital-grade-surface-disinfectant-concentrate",
    sku: "RC-INF-DIS-01",
    category: "housekeeping-infection-control",
    subcategory: "disinfectants",
    shortDescription: "Broad-spectrum bactericidal, virucidal, and fungicidal hospital surface disinfectant.",
    description: "Formulated for high-level disinfection of critical hospital surfaces, OT tables, patient beds, and clinic countertops. Fast contact time with non-corrosive properties on metal and acrylic medical equipment.",
    images: [
      "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80"
    ],
    price: 890,
    compareAtPrice: 1100,
    priceDisplay: "₹890 / 5 Litre Can",
    isPriceOnRequest: false,
    moq: "2 Cans (10 Litres)",
    stock: "In Stock",
    availability: "Available for Facility Supply",
    specifications: {
      "Volume": "5 Litre HDPE Jerry Can",
      "Active Formulation": "5th Generation Dual Quaternary Ammonium Compounds",
      "Efficacy": "Bactericidal, Virucidal, Fungicidal & Tuberculocidal",
      "Dilution Ratio": "1:100 for routine surface sanitization / 1:50 for OT disinfection",
      "Fragrance": "Neutral Clinical / Mild Pine"
    },
    features: [
      "Rapid microbial kill time (under 5 minutes contact time)",
      "Non-corrosive to stainless steel, PVC, and diagnostic machines",
      "Biodegradable active ingredients"
    ],
    packaging: "5 Litre HDPE Can | 4 Cans (20 Litres) per Box",
    brand: "Hospital Pro Series",
    featured: true,
    status: "active"
  },
  {
    id: "rc-inf-002",
    name: "Biomedical Waste Collection Bags (Color-Coded: Yellow, Red, Blue, Black)",
    slug: "biomedical-waste-collection-bags",
    sku: "RC-INF-BMW-02",
    category: "housekeeping-infection-control",
    subcategory: "waste-management",
    shortDescription: "Non-chlorinated heavy-duty biohazard waste disposal bags compliant with BMW rules.",
    description: "Manufactured in full compliance with Central Pollution Control Board (CPCB) Bio-Medical Waste Management guidelines. Clearly printed with international biohazard symbols. Non-chlorinated plastic permits safe incineration without toxic dioxin emission.",
    images: [
      "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80"
    ],
    price: 520,
    compareAtPrice: 650,
    priceDisplay: "₹520 / 5 kg Pack",
    isPriceOnRequest: false,
    moq: "1 Pack (5 kg Assorted or Single Color)",
    stock: "In Stock",
    availability: "Immediate Supply",
    specifications: {
      "Colors Available": "Yellow (Infectious/Anatomical), Red (Contaminated Recyclable), Blue (Glassware), Black (General)",
      "Thickness": "50+ Microns High Density Non-Chlorinated Polyethylene",
      "Sizes": "24\" x 30\", 30\" x 36\", 36\" x 42\"",
      "Compliance": "BMW Management Rules & CPCB Standards"
    },
    features: [
      "Leak-proof bottom star seal prevents fluid leakage",
      "Puncture-resistant high-density construction",
      "Standard biohazard logo and compliance text printed on each bag"
    ],
    packaging: "5 kg Pack | 30 kg Master Bale",
    brand: "Standard Healthcare Series",
    featured: false,
    status: "active"
  }
];

export default PRODUCTS;
