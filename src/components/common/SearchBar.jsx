import React, { useState, useRef, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Search, X, ChevronRight } from 'lucide-react';

export default function SearchBar({ onNavigate, autoFocus = false, onClose }) {
  const { products, categories } = useCMS();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const trimmed = query.trim().toLowerCase();
  
  // Filter products by name, SKU, category, or subcategory
  const matchingProducts = trimmed
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.sku.toLowerCase().includes(trimmed) ||
          (p.shortDescription && p.shortDescription.toLowerCase().includes(trimmed)) ||
          p.category.toLowerCase().includes(trimmed)
      ).slice(0, 6)
    : [];

  const handleSelectProduct = (slug) => {
    setIsOpen(false);
    setQuery('');
    if (onClose) onClose();
    onNavigate(`/product/${slug}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      setIsOpen(false);
      if (onClose) onClose();
      onNavigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="search-bar-wrap" ref={wrapperRef}>
      <div className="search-input-box">
        <Search size={16} className="search-icon" />
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Search products, SKUs, catheters, PPE..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
        {query && (
          <button
            className="search-clear-btn"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && query.trim().length > 1 && (
        <div className="search-dropdown-results">
          {matchingProducts.length > 0 ? (
            <div>
              <div style={{ padding: '0.5rem 0.875rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-teal-700)', backgroundColor: 'var(--color-bg-page)' }}>
                Products ({matchingProducts.length})
              </div>
              {matchingProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="search-result-item"
                  onClick={() => handleSelectProduct(prod.slug)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="search-result-img"
                  />
                  <div className="search-result-info">
                    <span className="search-result-name">{prod.name}</span>
                    <span className="search-result-meta">
                      <span>SKU: {prod.sku}</span>
                      <span>•</span>
                      <span>{prod.priceDisplay || (prod.price ? `₹${prod.price}` : 'Price on Request')}</span>
                    </span>
                  </div>
                  <ChevronRight size={14} color="var(--color-text-light)" />
                </div>
              ))}
              
              <div style={{ padding: '0.625rem 0.875rem', borderTop: '1px solid var(--color-border-light)', textAlign: 'center', backgroundColor: 'var(--color-bg-page)' }}>
                <button
                  style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-teal-700)' }}
                  onClick={() => {
                    setIsOpen(false);
                    if (onClose) onClose();
                    onNavigate(`/search?q=${encodeURIComponent(query.trim())}`);
                  }}
                >
                  View All Search Results for "{query}" →
                </button>
              </div>
            </div>
          ) : (
            <div style={{ padding: '1.25rem', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
              No products found matching "<strong>{query}</strong>"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
