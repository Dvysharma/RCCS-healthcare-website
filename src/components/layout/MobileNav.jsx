import React, { useState } from 'react';
import { SITE_CONFIG } from '../../config/siteConfig';
import { X, ChevronDown, ChevronRight, Phone, Mail, MapPin, FileText } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function MobileNav({ isOpen, onClose, onNavigate }) {
  const { categories } = useCMS();
  const [expandedCategory, setExpandedCategory] = useState(null);

  if (!isOpen) return null;

  const toggleCategory = (catId) => {
    setExpandedCategory(expandedCategory === catId ? null : catId);
  };

  const handleLinkClick = (path) => {
    onNavigate(path);
    onClose();
  };

  return (
    <div className="mobile-nav-backdrop" onClick={onClose}>
      <div className="mobile-nav-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="mobile-nav-header">
          <div className="brand-logo" onClick={() => handleLinkClick('/')}>
            <img
              src={encodeURI('/RCCS healthcare.jpeg')}
              alt="Royal Crown Healthcare Ventures"
              style={{ height: '44px', objectFit: 'contain' }}
            />
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="mobile-nav-links">
          <button
            className="mobile-nav-item"
            onClick={() => handleLinkClick('/')}
          >
            <span>Home</span>
          </button>

          <button
            className="mobile-nav-item"
            onClick={() => handleLinkClick('/products')}
          >
            <span>All Products</span>
          </button>

          {/* Categories Accordion */}
          <div style={{ margin: '0.25rem 0' }}>
            <div
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--color-teal-700)',
                padding: '0.5rem 0.875rem'
              }}
            >
              Medical Categories
            </div>
            {categories.map((cat) => {
              const isExpanded = expandedCategory === cat.id;
              return (
                <div key={cat.id}>
                  <div
                    className="mobile-nav-item"
                    onClick={() => toggleCategory(cat.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <span>{cat.shortName || cat.name}</span>
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  {isExpanded && (
                    <div className="mobile-sub-accordion">
                      <button
                        className="mobile-sub-item"
                        onClick={() => handleLinkClick(`/category/${cat.slug}`)}
                        style={{ fontWeight: 600, color: 'var(--color-teal-700)' }}
                      >
                        View All in {cat.name}
                      </button>
                      {cat.subcategories.map((sub) => (
                        <button
                          key={sub.id}
                          className="mobile-sub-item"
                          onClick={() => handleLinkClick(`/products?category=${cat.slug}&sub=${sub.slug}`)}
                        >
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <button
            className="mobile-nav-item"
            onClick={() => handleLinkClick('/about')}
          >
            <span>About Us</span>
          </button>

          <button
            className="mobile-nav-item"
            onClick={() => handleLinkClick('/blog')}
          >
            <span>Healthcare Insights</span>
          </button>

          <button
            className="mobile-nav-item"
            onClick={() => handleLinkClick('/contact')}
          >
            <span>Contact & Location</span>
          </button>

          <button
            className="mobile-nav-item"
            onClick={() => handleLinkClick('/admin')}
            style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}
          >
            <span>Admin / CMS</span>
          </button>
        </div>

        {/* Quick Contact Drawer Footer */}
        <div style={{ marginTop: 'auto', padding: '1.25rem 1rem', borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-page)' }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={14} color="var(--color-teal-700)" />
              <a href={`tel:${SITE_CONFIG.primaryPhoneClean}`}>{SITE_CONFIG.primaryPhone}</a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={14} color="var(--color-teal-700)" />
              <a href={`mailto:${SITE_CONFIG.primaryEmail}`}>{SITE_CONFIG.primaryEmail}</a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={14} color="var(--color-teal-700)" />
              <span>Dehradun, Uttarakhand</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
