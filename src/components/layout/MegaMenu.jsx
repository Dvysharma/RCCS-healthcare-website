import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function MegaMenu({ onNavigate, isOpen }) {
  const { categories } = useCMS();

  return (
    <div className={`mega-dropdown-menu ${isOpen ? 'is-open' : ''}`} role="menu" aria-label="Medical Product Categories">
      {categories.map((category) => (
        <div key={category.id} className="mega-category-group">
          <a
            href={`#category-${category.slug}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(`/category/${category.slug}`);
            }}
            className="mega-category-title"
          >
            <span>{category.name}</span>
            <ChevronRight size={14} />
          </a>
          <ul className="mega-sub-list">
            {category.subcategories.slice(0, 4).map((sub) => (
              <li key={sub.id}>
                <a
                  href={`#subcategory-${sub.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/products?category=${category.slug}&sub=${sub.slug}`);
                  }}
                  className="mega-sub-link"
                >
                  {sub.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
