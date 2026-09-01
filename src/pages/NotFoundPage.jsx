import React from 'react';
import { CATEGORIES } from '../data/categories';
import { HelpCircle, ArrowRight, Home, Search } from 'lucide-react';

export default function NotFoundPage({ onNavigate }) {
  return (
    <div className="container section-padding" style={{ textAlign: 'center' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto', background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '3.5rem 2rem' }}>
        <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--color-primary-900)', fontFamily: 'var(--font-heading)', lineHeight: 1, marginBottom: '0.75rem' }}>
          404
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary-900)', marginBottom: '0.75rem' }}>
          Catalogue Page Not Found
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', lineHeight: '1.6', marginBottom: '2rem' }}>
          The healthcare product or category page you are attempting to access does not exist or may have been moved.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          <button className="btn btn-primary" onClick={() => onNavigate('/')}>
            <Home size={16} />
            <span>Return to Homepage</span>
          </button>

          <button className="btn btn-secondary" onClick={() => onNavigate('/products')}>
            <Search size={16} />
            <span>Browse Medical Products</span>
          </button>
        </div>

        {/* Quick Category Recovery */}
        <div style={{ borderTop: '1px solid var(--color-border-light)', paddingTop: '1.5rem', textAlign: 'left' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-teal-700)', marginBottom: '0.75rem' }}>
            Popular Healthcare Categories
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {CATEGORIES.slice(0, 5).map((cat) => (
              <button
                key={cat.id}
                className="category-sub-pill"
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', cursor: 'pointer' }}
                onClick={() => onNavigate(`/category/${cat.slug}`)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
