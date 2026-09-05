import React from 'react';
import CategoryCard from '../common/CategoryCard';
import { useCMS } from '../../context/CMSContext';

export default function CategoryGrid({ onNavigate }) {
  const { categories } = useCMS();

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-page)' }}>
      <div className="container">
        <div className="section-header text-center">
          <span className="section-eyebrow">Product Discovery</span>
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-description">
            Essential medical and hospital supplies for everyday healthcare operations, sterile environments, and clinical care.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
