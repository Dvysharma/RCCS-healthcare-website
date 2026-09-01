import React from 'react';
import { SITE_CONFIG } from '../../config/siteConfig';
import { CATEGORIES } from '../../data/categories';
import { Phone, Mail, MapPin, Building2, ShieldCheck } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand & Business Overview */}
          <div>
            <div className="brand-logo" style={{ marginBottom: '1rem', cursor: 'pointer' }} onClick={() => onNavigate('/')}>
              <img
                src={encodeURI('/RCCS healthcare.jpeg')}
                alt="Royal Crown Healthcare Ventures"
                style={{ height: '44px', objectFit: 'contain' }}
              />
            </div>
            <p style={{ color: '#94A3B8', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              Essential daily hospital consumables, surgical products, sterilization supplies, and medical equipment for healthcare facilities, institutions, and clinical practitioners.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.06)', padding: '0.375rem 0.75rem', borderRadius: 'var(--radius-xs)', fontSize: '0.75rem', color: '#CBD5E1' }}>
              <ShieldCheck size={14} color="#5EEAD4" />
              <span>Registered GSTIN: <strong>{SITE_CONFIG.gstin}</strong></span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <div className="footer-col-title">Navigation</div>
            <ul className="footer-links">
              <li>
                <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('/'); }}>Home</a>
              </li>
              <li>
                <a href="/products" onClick={(e) => { e.preventDefault(); onNavigate('/products'); }}>Product Catalogue</a>
              </li>
              <li>
                <a href="/about" onClick={(e) => { e.preventDefault(); onNavigate('/about'); }}>About Royal Crown</a>
              </li>
              <li>
                <a href="/blog" onClick={(e) => { e.preventDefault(); onNavigate('/blog'); }}>Healthcare Insights</a>
              </li>
              <li>
                <a href="/contact" onClick={(e) => { e.preventDefault(); onNavigate('/contact'); }}>Contact & Inquiries</a>
              </li>
              <li>
                <a href="/admin" onClick={(e) => { e.preventDefault(); onNavigate('/admin'); }} style={{ color: '#64748B' }}>Admin Dashboard</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Medical Product Categories */}
          <div>
            <div className="footer-col-title">Categories</div>
            <ul className="footer-links">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <a
                    href={`#category-${cat.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/category/${cat.slug}`);
                    }}
                  >
                    {cat.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/products"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/products');
                  }}
                  style={{ color: '#5EEAD4', fontWeight: 600 }}
                >
                  View All 10 Categories →
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Centralized Contact Details */}
          <div>
            <div className="footer-col-title">Contact Supply Desk</div>
            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <MapPin size={18} color="#5EEAD4" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{SITE_CONFIG.address.formatted}</span>
              </li>
              <li className="footer-contact-item">
                <Phone size={18} color="#5EEAD4" style={{ flexShrink: 0 }} />
                <div>
                  <a href={`tel:${SITE_CONFIG.primaryPhoneClean}`} style={{ color: '#FFFFFF', fontWeight: 600 }}>
                    {SITE_CONFIG.primaryPhone}
                  </a>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '2px' }}>
                    Primary Supply Desk
                  </div>
                </div>
              </li>
              <li className="footer-contact-item">
                <Mail size={18} color="#5EEAD4" style={{ flexShrink: 0 }} />
                <a href={`mailto:${SITE_CONFIG.primaryEmail}`} style={{ color: '#FFFFFF' }}>
                  {SITE_CONFIG.primaryEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <div>
            {SITE_CONFIG.legal.copyrightText}
          </div>
          <div className="footer-bottom-links">
            <a
              href="/privacy-policy"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/privacy-policy');
              }}
            >
              Privacy Policy
            </a>
            <span>•</span>
            <a
              href="/terms-and-conditions"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/terms-and-conditions');
              }}
            >
              Terms & Conditions
            </a>
            <span>•</span>
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/contact');
              }}
            >
              Bulk Procurement
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
