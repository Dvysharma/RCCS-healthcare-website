import React from 'react';
import { CATEGORIES } from '../../data/categories';
import { ChevronRight } from 'lucide-react';

export default function MegaMenu({ onNavigate }) {
  return (
    <div className="mega-dropdown-menu" role="menu" aria-label="Medical Product Categories">
      {CATEGORIES.map((category) => (
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
