import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AboutPreview({ onNavigate }) {
  return (
    <section className="section-padding" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid var(--color-border)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', alignItems: 'center' }}>
          <div style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center' }}>
            <span className="section-eyebrow">Our Mission & Purpose</span>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '1.25rem' }}>
              Supporting Healthcare, One Supply at a Time.
            </h2>
            <p style={{ fontSize: '1.0625rem', lineHeight: '1.7', color: 'var(--color-text-secondary)', marginBottom: '1.75rem' }}>
              Royal Crown Healthcare Ventures is based in Dehradun, Uttarakhand, dedicated to supplying hospitals, clinics, nursing homes, and diagnostic laboratories with essential medical consumables, surgical products, sterilization supplies, and healthcare devices. We prioritize dependable inventory availability, straightforward pricing, and dedicated customer assistance for everyday medical operations.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem', fontSize: '0.9375rem', color: 'var(--color-text-primary)', fontWeight: 600 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={18} color="var(--color-teal-700)" />
                <span>Central Supply Depot in Dehradun</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={18} color="var(--color-teal-700)" />
                <span>GST Tax Compliant Invoicing</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={18} color="var(--color-teal-700)" />
                <span>Direct Hospital Procurement Support</span>
              </div>
            </div>

            <button
              className="btn btn-navy"
              onClick={() => onNavigate('/about')}
            >
              <span>Learn More About Royal Crown</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
