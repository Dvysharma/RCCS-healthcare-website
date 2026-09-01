import React from 'react';
import { useCMS } from '../../context/CMSContext';
import ProductCard from '../common/ProductCard';
import { ArrowRight } from 'lucide-react';

export default function FeaturedGrid({ onNavigate, onOpenQuoteModal }) {
  const { products } = useCMS();
  const featured = products.filter((p) => p.featured).slice(0, 8);

  return (
    <section className="section-padding" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid var(--color-border)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="section-eyebrow">Medical Inventory</span>
            <h2 className="section-title">Featured Products</h2>
            <p className="section-description" style={{ maxWidth: '600px' }}>
              Explore essential healthcare products selected for hospitals, clinics and everyday medical requirements.
            </p>
          </div>

          <button
            className="btn btn-outline"
            onClick={() => onNavigate('/products')}
          >
            <span>View Full Catalogue</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="product-grid-4">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigate={onNavigate}
              onOpenQuoteModal={onOpenQuoteModal}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
