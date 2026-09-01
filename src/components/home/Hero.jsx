import React from 'react';
import { SITE_CONFIG } from '../../config/siteConfig';
import { ArrowRight, FileSpreadsheet, ShieldCheck, MapPin, PackageCheck } from 'lucide-react';

export default function Hero({ onNavigate, onOpenQuoteModal }) {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Hero Content */}
          <div>
            <div className="hero-badge">
              <ShieldCheck size={16} />
              <span>Hospital Consumables & Medical Supplies</span>
            </div>

            <h1 className="hero-title">
              Reliable Healthcare Supplies, <br />
              <span>When Your Facility Needs Them.</span>
            </h1>

            <p className="hero-subtitle">
              Supplying hospitals, clinics, healthcare professionals and institutions with dependable medical consumables, surgical products and essential healthcare supplies across Dehradun and Uttarakhand.
            </p>

            <div className="hero-actions">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => onNavigate('/products')}
              >
                <span>Browse Products</span>
                <ArrowRight size={16} />
              </button>

              <button
                className="btn btn-secondary btn-lg"
                onClick={() => onOpenQuoteModal()}
              >
                <FileSpreadsheet size={16} color="var(--color-teal-700)" />
                <span>Request a Quote</span>
              </button>
            </div>

            {/* Practical Supply Highlights */}
            <div className="hero-highlights">
              <div className="hero-highlight-item">
                <span className="hero-highlight-label">Central Facility</span>
                <span className="hero-highlight-val">Dehradun Depot</span>
              </div>
              <div className="hero-highlight-item">
                <span className="hero-highlight-label">Product Breadth</span>
                <span className="hero-highlight-val">10 Categories</span>
              </div>
              <div className="hero-highlight-item">
                <span className="hero-highlight-label">Fulfillment</span>
                <span className="hero-highlight-val">B2B & Institutional</span>
              </div>
            </div>
          </div>

          {/* Right Hero Product Composition */}
          <div>
            <div className="hero-media-card">
              <img
                src="https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=1000&q=80"
                alt="Medical Supplies and Sterilization Packaging"
                className="hero-main-img"
              />
              
              {/* Floating Verified Supplier Pill */}
              <div className="hero-floating-card">
                <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-xs)', backgroundColor: 'var(--color-teal-50)', color: 'var(--color-teal-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <PackageCheck size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-primary-900)' }}>
                    Bulk Supply Available
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    GST Invoicing & Institutional Rates
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
