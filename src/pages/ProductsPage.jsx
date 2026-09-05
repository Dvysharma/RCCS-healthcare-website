import React, { useState, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';
import ProductCard from '../components/common/ProductCard';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import { Search, Filter, SlidersHorizontal, RotateCcw, PackageSearch, LayoutGrid, List } from 'lucide-react';

export default function ProductsPage({ onNavigate, onOpenQuoteModal, initialCategory = '', initialSubcategory = '' }) {
  const { products, categories } = useCMS();

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'all');
  const [selectedSubcategory, setSelectedSubcategory] = useState(initialSubcategory || 'all');
  const [selectedStock, setSelectedStock] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Available subcategories for selected category
  const activeSubcategories = useMemo(() => {
    if (selectedCategory === 'all') return [];
    const cat = categories.find((c) => c.slug === selectedCategory);
    return cat ? cat.subcategories : [];
  }, [categories, selectedCategory]);

  // Reset Subcategory if Category changes
  const handleCategoryChange = (catSlug) => {
    setSelectedCategory(catSlug);
    setSelectedSubcategory('all');
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedSubcategory('all');
    setSelectedStock('all');
    setSortBy('featured');
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          (p.shortDescription && p.shortDescription.toLowerCase().includes(q))
      );
    }

    // Category
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Subcategory
    if (selectedSubcategory !== 'all') {
      list = list.filter((p) => p.subcategory === selectedSubcategory);
    }

    // Stock/Availability
    if (selectedStock === 'in-stock') {
      list = list.filter((p) => p.stock && p.stock.toLowerCase().includes('in stock'));
    } else if (selectedStock === 'price-on-request') {
      list = list.filter((p) => p.isPriceOnRequest || !p.price);
    }

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => (a.price || 99999) - (b.price || 99999));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'sku') {
      list.sort((a, b) => a.sku.localeCompare(b.sku));
    } else {
      // featured default
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [products, searchQuery, selectedCategory, selectedSubcategory, selectedStock, sortBy]);

  const activeCategoryObj = categories.find((c) => c.slug === selectedCategory);

  return (
    <div className="products-page">
      <Breadcrumbs
        items={[
          { label: 'Products', path: '/products' },
          ...(activeCategoryObj ? [{ label: activeCategoryObj.name, path: `/category/${activeCategoryObj.slug}` }] : [])
        ]}
        onNavigate={onNavigate}
      />

      <div className="container section-padding-sm">
        {/* Page Header */}
        <div style={{ marginBottom: '2rem' }}>
          <span className="section-eyebrow">Medical Procurement Catalogue</span>
          <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 800, color: 'var(--color-primary-900)', marginBottom: '0.5rem' }}>
            {activeCategoryObj ? activeCategoryObj.name : 'Medical & Healthcare Products'}
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', maxWidth: '780px', margin: 0 }}>
            {activeCategoryObj
              ? activeCategoryObj.description
              : 'Browse our complete range of hospital consumables, surgical instruments, IV therapy products, CSSD sterilization packaging, and infection control supplies.'}
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }} className="mobile-filter-bar">
          <button
            className="btn btn-secondary btn-block"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            style={{ display: 'flex', lg: 'none' }}
          >
            <Filter size={16} />
            <span>Filter & Categories ({filteredProducts.length} Items)</span>
          </button>
        </div>

        {/* Catalogue Layout: Sidebar + Main Grid */}
        <div className="catalogue-layout">
          {/* Filter Sidebar */}
          <aside className={`filter-sidebar ${mobileFilterOpen ? 'mobile-open' : ''}`}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.9375rem', color: 'var(--color-primary-900)' }}>
                <SlidersHorizontal size={16} color="var(--color-teal-700)" />
                <span>Filters</span>
              </div>
              <button
                onClick={handleResetFilters}
                style={{ fontSize: '0.75rem', color: 'var(--color-teal-700)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                title="Reset all filters"
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            </div>

            {/* Category Filter */}
            <div className="filter-group">
              <div className="filter-group-title">Category</div>
              <ul className="filter-options-list">
                <li
                  className="filter-option-item"
                  onClick={() => handleCategoryChange('all')}
                  style={{ fontWeight: selectedCategory === 'all' ? 700 : 400, color: selectedCategory === 'all' ? 'var(--color-teal-700)' : undefined }}
                >
                  <span>All Categories</span>
                  <span>({products.length})</span>
                </li>
                {categories.map((cat) => {
                  const count = products.filter((p) => p.category === cat.slug).length;
                  const isSelected = selectedCategory === cat.slug;
                  return (
                    <li
                      key={cat.id}
                      className="filter-option-item"
                      onClick={() => handleCategoryChange(cat.slug)}
                      style={{ fontWeight: isSelected ? 700 : 400, color: isSelected ? 'var(--color-teal-700)' : undefined }}
                    >
                      <span>{cat.shortName || cat.name}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>({count})</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Subcategory Filter if Category is Active */}
            {activeSubcategories.length > 0 && (
              <div className="filter-group">
                <div className="filter-group-title">Subcategory</div>
                <ul className="filter-options-list">
                  <li
                    className="filter-option-item"
                    onClick={() => setSelectedSubcategory('all')}
                    style={{ fontWeight: selectedSubcategory === 'all' ? 700 : 400, color: selectedSubcategory === 'all' ? 'var(--color-teal-700)' : undefined }}
                  >
                    <span>All Subcategories</span>
                  </li>
                  {activeSubcategories.map((sub) => {
                    const isSelected = selectedSubcategory === sub.slug;
                    return (
                      <li
                        key={sub.id}
                        className="filter-option-item"
                        onClick={() => setSelectedSubcategory(sub.slug)}
                        style={{ fontWeight: isSelected ? 700 : 400, color: isSelected ? 'var(--color-teal-700)' : undefined }}
                      >
                        <span>{sub.name}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Availability Filter */}
            <div className="filter-group">
              <div className="filter-group-title">Availability / Pricing</div>
              <ul className="filter-options-list">
                <li
                  className="filter-option-item"
                  onClick={() => setSelectedStock('all')}
                  style={{ fontWeight: selectedStock === 'all' ? 700 : 400 }}
                >
                  <span>All Items</span>
                </li>
                <li
                  className="filter-option-item"
                  onClick={() => setSelectedStock('in-stock')}
                  style={{ fontWeight: selectedStock === 'in-stock' ? 700 : 400 }}
                >
                  <span>Ready Stock Only</span>
                </li>
                <li
                  className="filter-option-item"
                  onClick={() => setSelectedStock('price-on-request')}
                  style={{ fontWeight: selectedStock === 'price-on-request' ? 700 : 400 }}
                >
                  <span>Price on Request (Bulk)</span>
                </li>
              </ul>
            </div>
          </aside>

          {/* Main Product Section */}
          <div>
            {/* Toolbar */}
            <div className="catalogue-toolbar">
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                Showing <strong>{filteredProducts.length}</strong> medical products
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem' }}>
                  <label htmlFor="sort-select" style={{ color: 'var(--color-text-muted)' }}>Sort by:</label>
                  <select
                    id="sort-select"
                    className="form-control"
                    style={{ padding: '0.375rem 0.625rem', fontSize: '0.8125rem', width: 'auto' }}
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="featured">Featured First</option>
                    <option value="name-asc">Product Name (A-Z)</option>
                    <option value="sku">SKU Code</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="product-grid-4">
                {filteredProducts.map((prod) => (
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
                <PackageSearch size={48} color="var(--color-text-light)" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary-900)', marginBottom: '0.5rem' }}>
                  No Products Found
                </h3>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
                  No items matched your current filter criteria. Try adjusting your search query or reset the filters.
                </p>
                <button className="btn btn-primary btn-sm" onClick={handleResetFilters}>
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
