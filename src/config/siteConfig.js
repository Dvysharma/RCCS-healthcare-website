/**
 * Centralized Site Configuration
 * ROYAL CROWN HEALTHCARE VENTURES
 * 
 * IMPORTANT: All contact details, addresses, tax IDs, and legal dates
 * are managed here as the single source of truth across the entire platform.
 */

export const SITE_CONFIG = {
  companyName: "Royal Crown Healthcare Ventures",
  shortName: "Royal Crown",
  tagline: "Your Health, Our Priority",
  websiteUrl: "https://www.rchealthcareventures.com",
  displayUrl: "www.rchealthcareventures.com",
  gstin: "05AFSFS5983D1ZG",
  
  // Primary Website Contact (as specified in main brief)
  primaryPhone: "+91 7060187780",
  primaryPhoneClean: "+917060187780",
  primaryEmail: "info@rchealthcareventures.com",
  
  // Alternate contact present in privacy policy (flagged for client verification prior to production)
  secondaryPhone: "+91 9410103766",
  secondaryPhoneClean: "+919410103766",
  phoneVerificationNote: "Note: +91 7060187780 is the primary contact. +91 9410103766 was noted in legal docs and is retained for client verification.",
  
  // WhatsApp Integration
  whatsappNumber: "+917060187780",
  whatsappDisplay: "+91 7060187780",
  
  // Location & Physical Facility
  address: {
    landmark: "Near Decathlon Showroom",
    street: "Haridwar Bypass Road",
    city: "Dehradun",
    state: "Uttarakhand",
    country: "India",
    pincode: "248001",
    formatted: "Haridwar Bypass Road, Near Decathlon Showroom, Dehradun, Uttarakhand, India"
  },
  
  // Operating Hours
  operatingHours: "Monday - Saturday: 9:00 AM - 7:30 PM | Sunday: Support for Emergency Orders",
  
  // Legal Details
  legal: {
    effectiveDate: "23 August 2026",
    copyrightYear: "2026",
    copyrightText: "© 2026 Royal Crown Healthcare Ventures. All Rights Reserved."
  },

  // Trust pillars without fabricated statistics
  pillars: [
    {
      title: "Reliable Product Supply",
      description: "Consistent availability of essential clinical consumables for uninterrupted daily operations."
    },
    {
      title: "Comprehensive Range",
      description: "Single-source procurement across 10 specialized medical and hospital product categories."
    },
    {
      title: "Bulk & Institutional Supply",
      description: "Dedicated quotations, volume pricing, and institutional fulfillment for hospitals & clinics."
    },
    {
      title: "Responsive Support",
      description: "Direct assistance for availability checks, product specifications, and dispatch tracking."
    }
  ]
};

export default SITE_CONFIG;
