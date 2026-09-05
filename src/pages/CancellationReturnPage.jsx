import React from 'react';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import { RotateCcw } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

const sections = [
  {
    title: 'Eligible Returns and Replacements',
    content: 'Healthcare consumables, sterile products, PPE, and opened packages cannot be returned for hygiene and safety reasons. We accept return or replacement requests for incorrect items, manufacturing defects, or verified transit damage.'
  },
  {
    title: 'Report an Issue Within 48 Hours',
    content: 'Please contact us within 48 hours of delivery with your order number, photographs of the package and product, batch details, and a description of the issue. Requests received after this period may not be eligible for review.'
  },
  {
    title: 'Approval and Collection',
    content: 'Our team will review the request and confirm whether the item should be returned. Do not dispatch products without written approval. Approved items must be kept unused, in their original packaging, with labels and batch information intact.'
  },
  {
    title: 'Refunds',
    content: 'Where a refund is approved, it will be issued to the original payment method after the returned item has been inspected. Shipping charges are refundable only when the issue is attributable to an incorrect or damaged shipment.'
  },
  {
    title: 'Contact the Supply Desk',
    content: `For cancellation, return, or replacement support, call ${SITE_CONFIG.primaryPhone} or email ${SITE_CONFIG.primaryEmail}. Include your order number in the subject or message so that we can respond quickly.`
  }
];

export default function CancellationReturnPage({ onNavigate }) {
  return (
    <div className="cancellation-return-page">
      <Breadcrumbs items={[{ label: 'Cancellation & Returns' }]} onNavigate={onNavigate} />
      <div className="container section-padding-sm">
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: 'var(--color-teal-700)', fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            <RotateCcw size={16} />
            <span>Customer Support</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.85rem, 3vw, 2.5rem)', fontWeight: 800, color: 'var(--color-primary-900)', marginBottom: '0.5rem' }}>
            Cancellation & Returns Policy
          </h1>
          <p className="section-description">Clear guidance for cancellations, damaged shipments, replacements, and refunds.</p>
        </div>

        <div className="legal-layout">
          <aside className="legal-nav-sticky">
            <div className="legal-nav-title">Policy Sections</div>
            <ul className="legal-nav-list">
              {sections.map((section, index) => (
                <li key={section.title}>
                  <a href={`#return-section-${index + 1}`} className="legal-nav-link">
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
          <div className="legal-content-body">
            <div style={{ padding: '1rem', backgroundColor: 'var(--color-bg-page)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xs)', marginBottom: '2rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
              Because many products are sterile or intended for clinical use, return eligibility is assessed carefully to protect patient and facility safety.
            </div>
            {sections.map((section, index) => (
              <section key={section.title} id={`return-section-${index + 1}`} className="legal-section-block">
                <h2 className="legal-section-title">{section.title}</h2>
                <p className="legal-section-p">{section.content}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
