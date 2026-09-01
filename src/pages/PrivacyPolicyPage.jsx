import React from 'react';
import { PRIVACY_POLICY } from '../data/legalContent';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicyPage({ onNavigate }) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="privacy-policy-page">
      <Breadcrumbs
        items={[{ label: 'Privacy Policy' }]}
        onNavigate={onNavigate}
      />

      <div className="container section-padding-sm">
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: 'var(--color-teal-700)', fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            <ShieldCheck size={16} />
            <span>Compliance & Data Protection</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.85rem, 3vw, 2.5rem)', fontWeight: 800, color: 'var(--color-primary-900)', marginBottom: '0.5rem' }}>
            {PRIVACY_POLICY.title}
          </h1>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', display: 'flex', gap: '1rem' }}>
            <span>Effective Date: <strong>{PRIVACY_POLICY.effectiveDate}</strong></span>
            <span>•</span>
            <span>Entity: <strong>{PRIVACY_POLICY.companyName}</strong></span>
          </div>
        </div>

        {/* Legal Two-Column Layout */}
        <div className="legal-layout">
          {/* Sticky Desktop Side Nav */}
          <aside className="legal-nav-sticky">
            <div className="legal-nav-title">Policy Sections (18)</div>
            <ul className="legal-nav-list">
              {PRIVACY_POLICY.sections.map((sec) => (
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
              <strong>Privacy Commitment:</strong> Royal Crown Healthcare Ventures is dedicated to protecting customer, clinical facility, and institutional procurement privacy. We do not sell or trade your data.
            </div>

            {PRIVACY_POLICY.sections.map((sec) => (
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
