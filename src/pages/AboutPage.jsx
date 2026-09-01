import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { CATEGORIES } from '../data/categories';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import { ShieldCheck, Building2, Truck, CheckCircle2, Package, ArrowRight } from 'lucide-react';

export default function AboutPage({ onNavigate, onOpenQuoteModal }) {
  return (
    <div className="about-page">
      <Breadcrumbs
        items={[{ label: 'About Us' }]}
        onNavigate={onNavigate}
      />

      {/* Hero Banner */}
      <section className="hero-section" style={{ padding: 'clamp(2.5rem, 4vw, 4rem) 0' }}>
        <div className="container">
          <div style={{ maxWidth: '800px' }}>
            <span className="hero-badge">About Royal Crown</span>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)' }}>
              Committed to Supporting Better Healthcare.
            </h1>
            <p className="hero-subtitle">
              Supplying essential hospital consumables, surgical instruments, and medical products with an unyielding commitment to dependable availability and responsive regional fulfillment.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="container section-padding">
        {/* Who We Are */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', marginBottom: '4rem' }}>
          <div style={{ maxWidth: '860px' }}>
            <span className="section-eyebrow">Company Profile</span>
            <h2 className="section-title">Who We Are</h2>
            <p style={{ fontSize: '1.0625rem', lineHeight: '1.7', color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
              <strong>Royal Crown Healthcare Ventures</strong> is an established healthcare and medical supply business based on Haridwar Bypass Road (near Decathlon Showroom) in Dehradun, Uttarakhand, India (GSTIN: {SITE_CONFIG.gstin}).
            </p>
            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
              Our organization was formed with a singular objective: to provide hospitals, clinics, nursing homes, clinical diagnostic centers, and healthcare professionals with immediate and dependable access to critical daily consumables and surgical equipment. We understand that clinical environments cannot afford supply stockouts or delays when patient health is at stake.
            </p>
          </div>
        </div>

        {/* What We Supply */}
        <div style={{ marginBottom: '4rem', padding: '2rem', background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
          <span className="section-eyebrow">Our Inventory Breadth</span>
          <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>What We Supply</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
            We stock and distribute across ten comprehensive medical and healthcare categories:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.75rem', background: 'var(--color-bg-page)', border: '1px solid var(--color-border-light)', borderRadius: 'var(--radius-xs)', cursor: 'pointer' }}
                onClick={() => onNavigate(`/category/${cat.slug}`)}
              >
                <Package size={16} color="var(--color-teal-700)" />
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-primary-900)' }}>
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Our Approach & Sourcing Standards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '4rem' }} className="form-row-2">
          <div style={{ padding: '2rem', background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ width: '40px', height: '40px', background: 'var(--color-teal-50)', color: 'var(--color-teal-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-xs)', marginBottom: '1rem' }}>
              <ShieldCheck size={22} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary-900)', marginBottom: '0.75rem' }}>
              Our Quality Approach
            </h3>
            <p style={{ fontSize: '0.9375rem', lineHeight: '1.65', color: 'var(--color-text-secondary)' }}>
              Medical supplies demand strict hygiene, physical integrity, and reliable performance. We evaluate all products against practical clinical requirements—from packaging puncture resistance and needle siliconization to surgical steel hardness and sterilizer barrier efficacy.
            </p>
          </div>

          <div style={{ padding: '2rem', background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ width: '40px', height: '40px', background: 'var(--color-teal-50)', color: 'var(--color-teal-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-xs)', marginBottom: '1rem' }}>
              <Truck size={22} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary-900)', marginBottom: '0.75rem' }}>
              Institutional Procurement Support
            </h3>
            <p style={{ fontSize: '0.9375rem', lineHeight: '1.65', color: 'var(--color-text-secondary)' }}>
              We partner directly with hospital procurement officers and clinic administrators to provide scheduled monthly deliveries, GST proforma invoicing, lot-traceable documentation, and emergency priority dispatches.
            </p>
          </div>
        </div>

        {/* Our Commitment & Contact Strip */}
        <div style={{ background: 'var(--color-primary-900)', color: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: 'clamp(2rem, 4vw, 3rem)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF' }}>
            Ready to Streamline Your Facility's Medical Procurement?
          </h3>
          <p style={{ color: '#CBD5E1', maxWidth: '640px', fontSize: '1rem', lineHeight: '1.6' }}>
            Get in touch with our Dehradun supply team to request volume pricing, check item availability, or open an institutional supply account.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="btn btn-primary btn-lg" onClick={() => onOpenQuoteModal()}>
              Request a Bulk Quote
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => onNavigate('/contact')}>
              Contact Supply Desk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
