import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CategoryCard({ category, onNavigate }) {
  return (
    <div
      className="category-card"
      onClick={() => onNavigate(`/category/${category.slug}`)}
      style={{ cursor: 'pointer' }}
    >
      <div className="category-card-media">
        <img
          src={category.image}
          alt={category.name}
          className="category-card-img"
          loading="lazy"
        />
      </div>

      <div className="category-card-body">
        <h3 className="category-card-title">{category.name}</h3>
        <p className="category-card-desc">{category.description}</p>

        <div className="category-card-pills" onClick={(e) => e.stopPropagation()}>
          {category.subcategories.slice(0, 3).map((sub) => (
            <span
              key={sub.id}
              className="category-sub-pill"
              onClick={() => onNavigate(`/products?category=${category.slug}&sub=${sub.slug}`)}
              style={{ cursor: 'pointer' }}
            >
              {sub.name}
            </span>
          ))}
          {category.subcategories.length > 3 && (
            <span className="category-sub-pill" style={{ color: 'var(--color-teal-700)', fontWeight: 600 }}>
              +{category.subcategories.length - 3} more
            </span>
          )}
        </div>

        <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-teal-700)' }}>
          <span>Explore Products</span>
          <ArrowRight size={14} />
        </div>
      </div>
    </div>
  );
}
