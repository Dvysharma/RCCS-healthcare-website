import React, { useState, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';
import ProductCard from '../components/common/ProductCard';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import { Search, PackageSearch } from 'lucide-react';

export default function SearchPage({ initialQuery = '', onNavigate, onOpenQuoteModal }) {
  const { products } = useCMS();
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  const results = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        (p.shortDescription && p.shortDescription.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q) ||
        (p.subcategory && p.subcategory.toLowerCase().includes(q))
    );
  }, [products, searchTerm]);

  return (
    <div className="search-page">
      <Breadcrumbs
        items={[{ label: 'Search Results' }]}
        onNavigate={onNavigate}
      />

      <div className="container section-padding-sm">
        <div style={{ maxWidth: '600px', marginBottom: '2.5rem' }}>
          <span className="section-eyebrow">Catalogue Search</span>
          <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 800, color: 'var(--color-primary-900)', marginBottom: '1rem' }}>
            Search Products & SKUs
          </h1>
          <div className="search-input-box" style={{ padding: '0.375rem 0.875rem' }}>
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search by product name, SKU, category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem', fontSize: '0.9375rem', color: 'var(--color-text-secondary)' }}>
          {searchTerm.trim() ? (
            <span>Found <strong>{results.length}</strong> matching supplies for "<strong>{searchTerm}</strong>"</span>
          ) : (
            <span>Showing all <strong>{results.length}</strong> medical supplies in catalogue</span>
          )}
        </div>

        {results.length > 0 ? (
          <div className="product-grid-4">
            {results.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onNavigate={onNavigate}
                onOpenQuoteModal={onOpenQuoteModal}
              />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
            <PackageSearch size={52} color="var(--color-text-light)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary-900)', marginBottom: '0.5rem' }}>
              No Exact Matches Found
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
              Could not find products matching "{searchTerm}". Please check spelling or contact our Dehradun procurement desk for custom sourcing.
            </p>
            <button className="btn btn-primary btn-sm" onClick={() => setSearchTerm('')}>
              View All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
