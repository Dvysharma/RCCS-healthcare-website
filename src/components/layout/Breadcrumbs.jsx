import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items, onNavigate }) {
  if (!items || items.length === 0) return null;

  return (
    <nav className="breadcrumbs-wrap" aria-label="Breadcrumb">
      <div className="container">
        <ol className="breadcrumbs-list">
          <li className="breadcrumb-item">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
            >
              <Home size={14} />
              <span>Home</span>
            </a>
          </li>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className={`breadcrumb-item ${isLast ? 'active' : ''}`}>
                <ChevronRight size={13} style={{ color: 'var(--color-text-light)' }} />
                {isLast || !item.path ? (
                  <span aria-current={isLast ? 'page' : undefined}>{item.label}</span>
                ) : (
                  <a
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.path);
                    }}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
