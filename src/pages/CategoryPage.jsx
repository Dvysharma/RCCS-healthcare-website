import React, { useState, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';
import ProductCard from '../components/common/ProductCard';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import { ArrowRight, PackageSearch, Layers } from 'lucide-react';

export default function CategoryPage({ slug, onNavigate, onOpenQuoteModal }) {
  const { products, categories } = useCMS();
  const [selectedSub, setSelectedSub] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const category = categories.find((c) => c.slug === slug) || categories[0];

  const categoryProducts = useMemo(() => {
    let list = products.filter((p) => p.category === category.slug);

    if (selectedSub !== 'all') {
      list = list.filter((p) => p.subcategory === selectedSub);
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => (a.price || 99999) - (b.price || 99999));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [products, category.slug, selectedSub, sortBy]);

  const relatedCategories = categories.filter((c) => c.slug !== category.slug).slice(0, 3);

  return (
    <div className="category-page">
      <Breadcrumbs
        items={[
          { label: 'Products', path: '/products' },
          { label: category.name }
        ]}
        onNavigate={onNavigate}
      />

      <div className="container section-padding-sm">
        {/* Category Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginBottom: '2.5rem', backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: 'clamp(1.5rem, 3vw, 2rem)' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: 'var(--color-teal-700)', fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
              <Layers size={14} />
              <span>Medical Supplies Category</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 800, color: 'var(--color-primary-900)', marginBottom: '0.75rem' }}>
              {category.name}
            </h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: '1.6', maxWidth: '800px', margin: 0 }}>
              {category.description}
            </p>
          </div>

          {/* Subcategory Pills Navigation */}
          {category.subcategories.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border-light)' }}>
              <button
                className={`btn btn-sm ${selectedSub === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedSub('all')}
              >
                All in {category.shortName || 'Category'} ({products.filter((p) => p.category === category.slug).length})
              </button>
              {category.subcategories.map((sub) => {
                const isSelected = selectedSub === sub.slug;
                const subCount = products.filter((p) => p.category === category.slug && p.subcategory === sub.slug).length;
                return (
                  <button
                    key={sub.id}
                    className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setSelectedSub(sub.slug)}
                  >
                    <span>{sub.name}</span>
                    {subCount > 0 && <span style={{ opacity: 0.8, fontSize: '0.75rem' }}>({subCount})</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Toolbar */}
        <div className="catalogue-toolbar">
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
            Showing <strong>{categoryProducts.length}</strong> items in <strong>{category.name}</strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem' }}>
            <label htmlFor="cat-sort" style={{ color: 'var(--color-text-muted)' }}>Sort by:</label>
            <select
              id="cat-sort"
              className="form-control"
              style={{ padding: '0.375rem 0.625rem', fontSize: '0.8125rem', width: 'auto' }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured First</option>
              <option value="name-asc">Product Name (A-Z)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {categoryProducts.length > 0 ? (
          <div className="product-grid-4" style={{ marginBottom: '3.5rem' }}>
            {categoryProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onNavigate={onNavigate}
                onOpenQuoteModal={onOpenQuoteModal}
              />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3.5rem 1rem', background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', marginBottom: '3.5rem' }}>
            <PackageSearch size={44} color="var(--color-text-light)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.125rem', color: 'var(--color-primary-900)', marginBottom: '0.5rem' }}>
              No Specific Products Listed in this Subcategory
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
              Our procurement desk stocks custom specifications for this category. Contact us to request current availability.
            </p>
            <button className="btn btn-primary btn-sm" onClick={() => onOpenQuoteModal()}>
              Request Custom Quote
            </button>
          </div>
        )}

        {/* Related Medical Categories */}
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '2.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary-900)', marginBottom: '0.25rem' }}>
              Related Medical Categories
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              Explore other essential consumables frequently procured alongside {category.shortName || category.name}.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {relatedCategories.map((relCat) => (
              <div
                key={relCat.id}
                className="why-card"
                onClick={() => onNavigate(`/category/${relCat.slug}`)}
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--color-primary-900)', marginBottom: '0.25rem' }}>
                    {relCat.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    {relCat.subcategories.length} subcategories
                  </div>
                </div>
                <ArrowRight size={16} color="var(--color-teal-700)" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
