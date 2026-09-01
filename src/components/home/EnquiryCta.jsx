import React from 'react';
import { HelpCircle, Send } from 'lucide-react';

export default function EnquiryCta({ onOpenEnquiryModal }) {
  return (
    <section className="section-padding-sm" style={{ backgroundColor: 'var(--color-primary-950)', color: '#FFFFFF' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ maxWidth: '680px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#5EEAD4', fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.375rem' }}>
              <HelpCircle size={16} />
              <span>Custom Sourcing & Special Orders</span>
            </div>
            <h3 style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.375rem' }}>
              Can't Find What You're Looking For?
            </h3>
            <p style={{ color: '#CBD5E1', fontSize: '0.9375rem', margin: 0 }}>
              Tell us what you need. Our team can help with specific product availability, custom packaging, specialized sizes, pricing, and bulk hospital requirements.
            </p>
          </div>

          <button
            className="btn btn-primary btn-lg"
            onClick={() => onOpenEnquiryModal()}
          >
            <Send size={16} />
            <span>Send an Enquiry</span>
          </button>
        </div>
      </div>
    </section>
  );
}
