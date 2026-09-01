import React from 'react';
import { SITE_CONFIG } from '../../config/siteConfig';
import { FileSpreadsheet, MessageSquare } from 'lucide-react';

export default function BulkCta({ onOpenQuoteModal }) {
  const handleWhatsApp = () => {
    const text = `Hello Royal Crown Healthcare Ventures, We are looking for bulk medical supplies for our hospital/facility. Please share your product catalogue and bulk quotation.`;
    const url = `https://wa.me/${SITE_CONFIG.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="section-padding-sm" style={{ backgroundColor: 'var(--color-bg-page)' }}>
      <div className="container">
        <div className="bulk-procurement-banner">
          <div>
            <h2 className="bulk-title">Looking for Healthcare Supplies in Bulk?</h2>
            <p className="bulk-desc">
              Share your requirement with us and our team will help you with product availability, pricing and bulk supply requirements for hospitals, clinics, diagnostic centers, and healthcare institutions.
            </p>
          </div>

          <div className="bulk-actions">
            <button
              className="btn btn-quote btn-lg"
              onClick={() => onOpenQuoteModal()}
            >
              <FileSpreadsheet size={18} />
              <span>Request a Quote</span>
            </button>

            <button
              className="btn btn-whatsapp btn-lg"
              onClick={handleWhatsApp}
            >
              <MessageSquare size={18} />
              <span>WhatsApp Us</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
