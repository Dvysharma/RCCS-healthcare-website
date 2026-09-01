import React from 'react';
import { TERMS_AND_CONDITIONS } from '../data/legalContent';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import { FileText, ShieldAlert } from 'lucide-react';

export default function TermsPage({ onNavigate }) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="terms-page">
      <Breadcrumbs
        items={[{ label: 'Terms & Conditions' }]}
        onNavigate={onNavigate}
      />

      <div className="container section-padding-sm">
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: 'var(--color-teal-700)', fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            <FileText size={16} />
            <span>Legal Documentation</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.85rem, 3vw, 2.5rem)', fontWeight: 800, color: 'var(--color-primary-900)', marginBottom: '0.5rem' }}>
            {TERMS_AND_CONDITIONS.title}
          </h1>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', display: 'flex', gap: '1rem' }}>
            <span>Effective Date: <strong>{TERMS_AND_CONDITIONS.effectiveDate}</strong></span>
            <span>•</span>
            <span>Entity: <strong>{TERMS_AND_CONDITIONS.companyName}</strong></span>
          </div>
        </div>

        {/* Legal Two-Column Layout */}
        <div className="legal-layout">
          {/* Sticky Desktop Side Nav */}
          <aside className="legal-nav-sticky">
            <div className="legal-nav-title">Document Sections (20)</div>
            <ul className="legal-nav-list">
              {TERMS_AND_CONDITIONS.sections.map((sec) => (
                <li key={sec.id}>
                  <a
                    href={`#${sec.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(sec.id);
                    }}
                    className="legal-nav-link"
                  >
                    {sec.title}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* Legal Body Content */}
          <div className="legal-content-body">
            <div style={{ padding: '1rem', backgroundColor: 'var(--color-bg-page)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xs)', marginBottom: '2rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
              <strong>Important Notice for Institutional & Medical Purchasers:</strong> These Terms and Conditions govern all catalogue inquiries, quotations, bulk procurements, and online orders through Royal Crown Healthcare Ventures. Please read carefully before purchasing supplies.
            </div>

            {TERMS_AND_CONDITIONS.sections.map((sec) => (
              <div key={sec.id} id={sec.id} className="legal-section-block">
                <h2 className="legal-section-title">{sec.title}</h2>
                {sec.content.map((p, pIdx) => (
                  <p key={pIdx} className="legal-section-p">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
